<?php

namespace Database\Seeders;

use App\Models\Style;
use Illuminate\Database\Seeder;

class StyleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $styles = [
            [
                'name' => 'Tết 2026 🧧',
                'description' => 'Diện áo dài, đón Tết sang với nền mai vàng rực rỡ',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&h=800&fit=crop',
                'price_credits' => 2,
                'secret_prompt' => 'Transform this person into a Vietnamese Lunar New Year (Tet) portrait. They should be wearing a traditional ao dai dress with peach blossom or apricot blossom (mai) flowers in the background. The setting should be festive with red and gold decorations. Keep the person recognizable but enhance their features for a celebratory New Year look.',
                'openrouter_model_id' => 'google/gemini-2.0-flash-exp:free',
                'sort_order' => 1,
            ],
            [
                'name' => 'Doanh Nhân 💼',
                'description' => 'Phong cách CEO, chuyên nghiệp và đẳng cấp',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop',
                'price_credits' => 3,
                'secret_prompt' => 'Transform this person into a professional executive portrait. They should be wearing a high-end business suit in a modern office setting. The lighting should be studio quality with a clean, corporate background. Make them look confident, successful and polished while keeping their face recognizable.',
                'openrouter_model_id' => 'google/gemini-2.0-flash-exp:free',
                'sort_order' => 2,
            ],
            [
                'name' => 'Anime ✨',
                'description' => 'Biến thành nhân vật anime với style Nhật Bản',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&h=800&fit=crop',
                'price_credits' => 2,
                'secret_prompt' => 'Transform this person into an anime character in Japanese anime art style. Large expressive eyes, smooth skin, and vibrant colors. The style should be similar to popular anime like Makoto Shinkai films. Keep the essential facial features recognizable but stylized in anime format.',
                'openrouter_model_id' => 'google/gemini-2.0-flash-exp:free',
                'sort_order' => 3,
            ],
            [
                'name' => 'Nàng Thơ 🌸',
                'description' => 'Phong cách thơ mộng, dịu dàng như tranh vẽ',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop',
                'price_credits' => 3,
                'secret_prompt' => 'Transform this person into a dreamy, romantic portrait with soft pastel colors and ethereal lighting. Add elements like flower petals, soft bokeh, and a gentle glow. The style should be reminiscent of fashion editorials with a poetic, feminine touch. Keep features recognizable but enhanced.',
                'openrouter_model_id' => 'google/gemini-2.0-flash-exp:free',
                'sort_order' => 4,
            ],
            [
                'name' => 'Cyberpunk 🤖',
                'description' => 'Tương lai đô thị neon, phong cách sci-fi',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=800&fit=crop',
                'price_credits' => 3,
                'secret_prompt' => 'Transform this person into a cyberpunk character. Add neon lighting in pink, blue and purple. Include futuristic elements like holographic HUD, cyber implants or tech accessories. The background should be a rainy night cityscape with neon signs. Keep the person recognizable but give them a futuristic edge.',
                'openrouter_model_id' => 'google/gemini-2.0-flash-exp:free',
                'sort_order' => 5,
            ],
            [
                'name' => 'Vintage 📷',
                'description' => 'Hoài cổ với tông màu film cũ thập niên 90',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop',
                'price_credits' => 2,
                'secret_prompt' => 'Transform this photo into a vintage 90s film photography style. Add film grain, slightly faded colors with warm orange and teal tones. The lighting should be soft and nostalgic like Kodak Portra 400 film. Keep the person recognizable but give the image a retro aesthetic.',
                'openrouter_model_id' => 'google/gemini-2.0-flash-exp:free',
                'sort_order' => 6,
            ],
            [
                'name' => 'K-Pop Star ⭐',
                'description' => 'Biến thành idol K-Pop với makeup lung linh',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop',
                'price_credits' => 4,
                'secret_prompt' => 'Transform this person into a K-Pop idol style portrait. Perfect flawless skin, subtle makeup with dewy glow, styled hair. The lighting should be professional studio quality like album cover photos. Add subtle sparkle effects. Keep features recognizable but enhanced to K-Pop star level.',
                'openrouter_model_id' => 'google/gemini-2.0-flash-exp:free',
                'sort_order' => 7,
            ],
            [
                'name' => 'Fantasy 🧙',
                'description' => 'Thế giới phép thuật với yếu tố thần tiên',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=800&fit=crop',
                'price_credits' => 3,
                'secret_prompt' => 'Transform this person into a fantasy character. Add magical elements like glowing particles, mystical lighting, and an enchanted forest or castle background. They could have subtle elf ears or ethereal features. Style should be like a fantasy book cover. Keep the person recognizable.',
                'openrouter_model_id' => 'google/gemini-2.0-flash-exp:free',
                'sort_order' => 8,
            ],
        ];

        foreach ($styles as $style) {
            Style::create($style);
        }
    }
}
