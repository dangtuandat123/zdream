'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowLeft,
    faHistory,
    faDownload,
    faTrash,
    faImage,
    faCalendar,
    faFilter,
    faSearch,
    faTimes
} from '@fortawesome/free-solid-svg-icons'

// Mock data - sẽ fetch từ API
const MOCK_HISTORY = [
    { id: '1', styleId: '1', styleName: 'Anime Style', createdAt: '2026-01-22T10:30:00', resultUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', status: 'completed' },
    { id: '2', styleId: '3', styleName: 'Oil Painting', createdAt: '2026-01-21T15:45:00', resultUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', status: 'completed' },
    { id: '3', styleId: '5', styleName: 'Cyberpunk', createdAt: '2026-01-20T09:15:00', resultUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400', status: 'completed' },
    { id: '4', styleId: '2', styleName: 'Watercolor', createdAt: '2026-01-19T14:00:00', resultUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400', status: 'completed' },
]

function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

export default function HistoryPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [history] = useState(MOCK_HISTORY)

    const filteredHistory = history.filter(item =>
        item.styleName.toLowerCase().includes(searchQuery.toLowerCase())
    )

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
                    <FontAwesomeIcon icon={faHistory} className="w-6 h-6 text-purple-400" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">Lịch sử tạo ảnh</h1>
                </div>
                <p className="text-white/60">Xem lại và tải về các ảnh bạn đã tạo</p>
            </div>

            {/* Search & Filter */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
                <div className="flex gap-3">
                    <div className="relative flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder="Tìm theo tên style..."
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
                    <button className="h-11 px-4 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white/70 hover:bg-white/[0.1] transition-colors inline-flex items-center gap-2">
                        <FontAwesomeIcon icon={faFilter} className="w-4 h-4" />
                        <span className="hidden sm:inline">Lọc</span>
                    </button>
                </div>
            </div>

            {/* History Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {filteredHistory.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredHistory.map((item) => (
                            <div
                                key={item.id}
                                className="group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="relative aspect-square">
                                    <Image
                                        src={item.resultUrl}
                                        alt={item.styleName}
                                        fill
                                        className="object-cover"
                                    />

                                    {/* Hover Actions */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <a
                                            href={item.resultUrl}
                                            download
                                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                        >
                                            <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
                                        </a>
                                        <button className="w-10 h-10 rounded-full bg-red-500/20 backdrop-blur-sm flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors">
                                            <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-3">
                                    <h3 className="font-medium text-white text-sm line-clamp-1">{item.styleName}</h3>
                                    <div className="flex items-center gap-1.5 text-white/40 text-xs mt-1">
                                        <FontAwesomeIcon icon={faCalendar} className="w-3 h-3" />
                                        {formatDate(item.createdAt)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <FontAwesomeIcon icon={faImage} className="w-16 h-16 text-white/20 mb-4" />
                        <h3 className="text-xl font-semibold text-white/80 mb-2">Chưa có ảnh nào</h3>
                        <p className="text-white/50 mb-6">Bạn chưa tạo ảnh nào. Hãy thử tạo ảnh đầu tiên!</p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium"
                        >
                            Tạo ảnh ngay
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
