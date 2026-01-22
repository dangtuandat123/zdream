<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenRouterService
{
    private string $apiKey;
    private string $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.openrouter.api_key');
        $this->baseUrl = config('services.openrouter.base_url', 'https://openrouter.ai/api/v1');
    }

    /**
     * Tạo ảnh từ prompt và ảnh mẫu
     * 
     * @param string $prompt Secret prompt từ style
     * @param string $imageBase64 Ảnh gốc của user (base64)
     * @param string $modelId Model ID từ OpenRouter
     * @return array|null
     */
    public function generateImage(string $prompt, string $imageBase64, string $modelId = 'google/gemini-2.0-flash-exp:free'): ?array
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$this->apiKey}",
                'Content-Type' => 'application/json',
                'HTTP-Referer' => config('app.url'),
                'X-Title' => 'ZDream AI',
            ])->timeout(120)->post("{$this->baseUrl}/chat/completions", [
                'model' => $modelId,
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => [
                            [
                                'type' => 'text',
                                'text' => $prompt,
                            ],
                            [
                                'type' => 'image_url',
                                'image_url' => [
                                    'url' => "data:image/jpeg;base64,{$imageBase64}",
                                ],
                            ],
                        ],
                    ],
                ],
                'max_tokens' => 4096,
            ]);

            if ($response->successful()) {
                $data = $response->json();
                return [
                    'success' => true,
                    'data' => $data,
                ];
            }

            Log::error('OpenRouter API error', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return [
                'success' => false,
                'error' => 'API request failed: ' . $response->status(),
            ];
        } catch (\Exception $e) {
            Log::error('OpenRouter exception', [
                'message' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Tạo ảnh với model hỗ trợ image generation
     */
    public function generateImageWithDedicatedModel(string $prompt, string $modelId = 'stabilityai/stable-diffusion-xl-base-1.0'): ?array
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$this->apiKey}",
                'Content-Type' => 'application/json',
            ])->timeout(120)->post("{$this->baseUrl}/images/generations", [
                'model' => $modelId,
                'prompt' => $prompt,
                'n' => 1,
                'size' => '1024x1024',
            ]);

            if ($response->successful()) {
                return [
                    'success' => true,
                    'data' => $response->json(),
                ];
            }

            return [
                'success' => false,
                'error' => 'Image generation failed: ' . $response->status(),
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage(),
            ];
        }
    }
}
