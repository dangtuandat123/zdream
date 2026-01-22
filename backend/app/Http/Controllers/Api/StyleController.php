<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Style;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StyleController extends Controller
{
    /**
     * Lấy danh sách styles (không trả về secret_prompt)
     */
    public function index(): JsonResponse
    {
        $styles = Style::active()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $styles,
        ]);
    }

    /**
     * Lấy chi tiết một style
     */
    public function show(Style $style): JsonResponse
    {
        if (!$style->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Style không tồn tại hoặc đã bị vô hiệu hóa',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $style,
        ]);
    }
}
