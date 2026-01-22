// Mock style data - will be fetched from API later
export interface StyleData {
    id: string
    name: string
    thumbnailUrl: string
    priceCredits: number
    description: string
}

export const MOCK_STYLES: Record<string, StyleData> = {
    '1': {
        id: '1',
        name: 'Tết 2026 🧧',
        thumbnailUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&h=800&fit=crop',
        priceCredits: 2,
        description: 'Diện áo dài, đón Tết sang với nền mai vàng rực rỡ',
    },
    '2': {
        id: '2',
        name: 'Doanh Nhân 💼',
        thumbnailUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop',
        priceCredits: 3,
        description: 'Phong cách CEO, chuyên nghiệp và đẳng cấp',
    },
    '3': {
        id: '3',
        name: 'Anime ✨',
        thumbnailUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&h=800&fit=crop',
        priceCredits: 2,
        description: 'Biến thành nhân vật anime với style Nhật Bản',
    },
    '4': {
        id: '4',
        name: 'Nàng Thơ 🌸',
        thumbnailUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop',
        priceCredits: 3,
        description: 'Phong cách thơ mộng, dịu dàng như tranh vẽ',
    },
    '5': {
        id: '5',
        name: 'Cyberpunk 🤖',
        thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=800&fit=crop',
        priceCredits: 3,
        description: 'Tương lai đô thị neon, phong cách sci-fi',
    },
    '6': {
        id: '6',
        name: 'Vintage 📷',
        thumbnailUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop',
        priceCredits: 2,
        description: 'Hoài cổ với tông màu film cũ thập niên 90',
    },
    '7': {
        id: '7',
        name: 'K-Pop Star ⭐',
        thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop',
        priceCredits: 4,
        description: 'Biến thành idol K-Pop với makeup lung linh',
    },
    '8': {
        id: '8',
        name: 'Fantasy 🧙',
        thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=800&fit=crop',
        priceCredits: 3,
        description: 'Thế giới phép thuật với yếu tố thần tiên',
    },
}
