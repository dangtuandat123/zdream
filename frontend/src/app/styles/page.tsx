'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowLeft,
    faPalette,
    faSearch,
    faTimes,
    faFire,
    faBolt,
    faWandMagicSparkles,
    faFilter
} from '@fortawesome/free-solid-svg-icons'
import { StyleCard } from '@/components/StyleCard'
import { MOCK_STYLES } from '@/lib/styles-data'

const CATEGORIES = [
    { id: 'all', label: 'Tất cả', icon: faWandMagicSparkles },
    { id: 'trending', label: 'Hot', icon: faFire },
    { id: 'new', label: 'Mới', icon: faBolt },
    { id: 'classic', label: 'Cổ điển', icon: faPalette },
]

const STYLE_CATEGORIES: Record<string, string[]> = {
    '1': ['trending', 'new'],
    '2': ['classic'],
    '3': ['trending'],
    '4': ['new'],
    '5': ['trending', 'new'],
    '6': ['classic'],
    '7': ['trending'],
    '8': ['classic'],
}

export default function StylesPage() {
    const [activeCategory, setActiveCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    const allStyles = Object.values(MOCK_STYLES)

    const filteredStyles = useMemo(() => {
        return allStyles.filter(style => {
            if (activeCategory !== 'all') {
                const categories = STYLE_CATEGORIES[style.id] || []
                if (!categories.includes(activeCategory)) return false
            }

            if (searchQuery) {
                const query = searchQuery.toLowerCase()
                return (
                    style.name.toLowerCase().includes(query) ||
                    style.description.toLowerCase().includes(query)
                )
            }

            return true
        })
    }, [allStyles, activeCategory, searchQuery])

    return (
        <div className="min-h-screen pb-12">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors text-sm"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="w-3.5 h-3.5" />
                    <span>Về trang chủ</span>
                </Link>
            </div>

            {/* Page Title */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <FontAwesomeIcon icon={faPalette} className="w-6 h-6 text-purple-400" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">Tất cả Styles</h1>
                </div>
                <p className="text-white/60">Khám phá {allStyles.length} style AI độc đáo</p>
            </div>

            {/* Search & Filter */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder="Tìm kiếm style..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-11 pl-10 pr-10 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white/90 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                        />
                        <FontAwesomeIcon icon={faSearch} className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80">
                                <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Categories */}
                    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-4 py-2.5 rounded-xl text-sm font-medium inline-flex items-center gap-2 whitespace-nowrap flex-shrink-0 transition-all ${activeCategory === cat.id
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                                        : 'bg-white/[0.05] text-white/70 hover:bg-white/[0.1] border border-white/[0.08]'
                                    }`}
                            >
                                <FontAwesomeIcon icon={cat.icon} className="w-3.5 h-3.5" />
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4">
                <div className="flex items-center justify-between">
                    <p className="text-white/60 text-sm">
                        Tìm thấy <span className="text-white font-medium">{filteredStyles.length}</span> style
                    </p>
                </div>
            </div>

            {/* Styles Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {filteredStyles.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                        {filteredStyles.map((style) => (
                            <StyleCard key={style.id} {...style} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <FontAwesomeIcon icon={faSearch} className="w-16 h-16 text-white/20 mb-4" />
                        <h3 className="text-xl font-semibold text-white/80 mb-2">Không tìm thấy style</h3>
                        <p className="text-white/50 mb-6">Thử từ khóa khác hoặc chọn danh mục khác</p>
                        <button
                            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                            className="px-6 py-3 rounded-xl bg-white/[0.05] text-white/70 hover:bg-white/[0.1] border border-white/[0.08]"
                        >
                            Xem tất cả
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
