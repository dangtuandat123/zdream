<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Generation;
use App\Models\Style;
use App\Models\Transaction;
use App\Services\MinioService;
use App\Services\OpenRouterService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class GenerationController extends Controller
{
    public function __construct(
        private MinioService $minioService,
        private OpenRouterService $openRouterService
    ) {}

    /**
     * Tạo ảnh AI từ style và ảnh upload
     */
    public function generate(Request $request): JsonResponse
    {
        $request->validate([
            'style_id' => 'required|exists:styles,id',
            'image' => 'required|image|mimes:jpeg,png,webp|max:10240', // 10MB max
        ]);

        $user = $request->user();
        $style = Style::findOrFail($request->style_id);

        // Kiểm tra style có active không
        if (!$style->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Style này hiện không khả dụng',
            ], 400);
        }

        // Kiểm tra user có đủ xu không
        if ($user->credits < $style->price_credits) {
            return response()->json([
                'success' => false,
                'message' => 'Bạn không đủ xu. Vui lòng nạp thêm!',
                'required_credits' => $style->price_credits,
                'current_credits' => $user->credits,
            ], 402);
        }

        try {
            DB::beginTransaction();

            // 1. Upload ảnh gốc lên MinIO
            $originalUrl = $this->minioService->uploadFile($request->file('image'), 'originals');

            // 2. Trừ xu và tạo transaction
            $user->credits -= $style->price_credits;
            $user->save();

            Transaction::create([
                'user_id' => $user->id,
                'type' => 'usage',
                'amount' => 0,
                'credits' => -$style->price_credits,
                'description' => "Tạo ảnh với style: {$style->name}",
            ]);

            // 3. Tạo generation record
            $generation = Generation::create([
                'user_id' => $user->id,
                'style_id' => $style->id,
                'original_image_url' => $originalUrl,
                'credits_used' => $style->price_credits,
                'status' => 'processing',
            ]);

            DB::commit();

            // 4. Gọi OpenRouter API (async trong thực tế nên dùng Queue)
            $imageBase64 = base64_encode(file_get_contents($request->file('image')));
            $result = $this->openRouterService->generateImage(
                $style->secret_prompt,
                $imageBase64,
                $style->openrouter_model_id
            );

            if ($result && $result['success']) {
                // TODO: Parse result và upload ảnh kết quả lên MinIO
                // Tạm thời mock result
                $generation->update([
                    'status' => 'completed',
                    'result_image_url' => $originalUrl, // Mock - thay bằng ảnh thực
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Tạo ảnh thành công!',
                    'data' => $generation->fresh(),
                ]);
            }

            // Nếu thất bại, hoàn xu và cập nhật status
            $generation->update([
                'status' => 'failed',
                'error_message' => $result['error'] ?? 'Unknown error',
            ]);

            // Hoàn xu
            $user->credits += $style->price_credits;
            $user->save();

            Transaction::create([
                'user_id' => $user->id,
                'type' => 'refund',
                'amount' => 0,
                'credits' => $style->price_credits,
                'description' => "Hoàn xu do lỗi tạo ảnh: {$style->name}",
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra khi tạo ảnh. Xu đã được hoàn lại.',
                'data' => $generation->fresh(),
            ], 500);

        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('Generation error', [
                'user_id' => $user->id,
                'style_id' => $style->id,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra. Vui lòng thử lại sau.',
            ], 500);
        }
    }

    /**
     * Lấy chi tiết generation
     */
    public function show(Request $request, Generation $generation): JsonResponse
    {
        // Chỉ cho phép user xem generation của mình
        if ($generation->user_id !== $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'Không có quyền truy cập',
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $generation->load('style'),
        ]);
    }

    /**
     * Lấy lịch sử generation của user
     */
    public function history(Request $request): JsonResponse
    {
        $generations = Generation::where('user_id', $request->user()->id)
            ->with('style')
            ->orderByDesc('created_at')
            ->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $generations,
        ]);
    }
}
