'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowLeft,
    faUser,
    faEnvelope,
    faCalendar,
    faGem,
    faImage,
    faEdit,
    faCamera,
    faShield,
    faCrown
} from '@fortawesome/free-solid-svg-icons'

// Mock user data
const MOCK_USER = {
    name: 'Tuấn Đạt',
    email: 'dat@example.com',
    avatar: null,
    joinedAt: '2026-01-01',
    credits: 15,
    totalImages: 24,
    plan: 'free' // 'free' | 'premium'
}

export default function ProfilePage() {
    const [user] = useState(MOCK_USER)
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(user.name)

    const handleSave = () => {
        // TODO: Call API to save
        setIsEditing(false)
    }

    return (
        <div className="min-h-screen pb-12">
            {/* Header */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors text-sm"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="w-3.5 h-3.5" />
                    <span>Về trang chủ</span>
                </Link>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                {/* Profile Header */}
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 sm:p-8 mb-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">
                                {user.avatar ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
                                ) : (
                                    user.name.charAt(0).toUpperCase()
                                )}
                            </div>
                            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center hover:bg-purple-400 transition-colors">
                                <FontAwesomeIcon icon={faCamera} className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center sm:text-left">
                            {isEditing ? (
                                <div className="flex items-center gap-3 mb-2">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="text-2xl font-bold bg-white/[0.05] border border-white/[0.1] rounded-lg px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                                    />
                                    <button onClick={handleSave} className="px-4 py-1.5 rounded-lg bg-purple-500 text-white text-sm font-medium">
                                        Lưu
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                                    <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                                    <button onClick={() => setIsEditing(true)} className="text-white/40 hover:text-white/80">
                                        <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                            <p className="text-white/60 flex items-center justify-center sm:justify-start gap-2">
                                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                                {user.email}
                            </p>
                            <p className="text-white/40 text-sm flex items-center justify-center sm:justify-start gap-2 mt-1">
                                <FontAwesomeIcon icon={faCalendar} className="w-3.5 h-3.5" />
                                Tham gia từ {new Date(user.joinedAt).toLocaleDateString('vi-VN')}
                            </p>
                        </div>

                        {/* Plan Badge */}
                        <div className={`px-4 py-2 rounded-full ${user.plan === 'premium' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-white/[0.05] border border-white/[0.1]'}`}>
                            <span className={`font-medium text-sm flex items-center gap-2 ${user.plan === 'premium' ? 'text-white' : 'text-white/70'}`}>
                                <FontAwesomeIcon icon={faCrown} className="w-4 h-4" />
                                {user.plan === 'premium' ? 'Premium' : 'Miễn phí'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-2">
                            <FontAwesomeIcon icon={faGem} className="w-5 h-5 text-cyan-400" />
                            <span className="text-white/60 text-sm">Số dư</span>
                        </div>
                        <p className="text-3xl font-bold text-white">{user.credits} <span className="text-lg text-purple-400">Xu</span></p>
                        <Link href="/topup" className="text-purple-400 text-sm hover:underline mt-2 inline-block">
                            + Nạp thêm
                        </Link>
                    </div>
                    <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-2">
                            <FontAwesomeIcon icon={faImage} className="w-5 h-5 text-pink-400" />
                            <span className="text-white/60 text-sm">Ảnh đã tạo</span>
                        </div>
                        <p className="text-3xl font-bold text-white">{user.totalImages}</p>
                        <Link href="/history" className="text-purple-400 text-sm hover:underline mt-2 inline-block">
                            Xem lịch sử
                        </Link>
                    </div>
                </div>

                {/* Account Actions */}
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl divide-y divide-white/[0.05]">
                    <Link href="/settings" className="flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-center gap-3">
                            <FontAwesomeIcon icon={faShield} className="w-5 h-5 text-purple-400" />
                            <div>
                                <p className="text-white font-medium">Bảo mật</p>
                                <p className="text-white/50 text-sm">Đổi mật khẩu, xác thực 2 lớp</p>
                            </div>
                        </div>
                        <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 text-white/30 rotate-180" />
                    </Link>

                    {user.plan === 'free' && (
                        <div className="p-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={faCrown} className="w-5 h-5 text-yellow-400" />
                                    <div>
                                        <p className="text-white font-medium">Nâng cấp Premium</p>
                                        <p className="text-white/50 text-sm">Không giới hạn, ưu tiên xử lý</p>
                                    </div>
                                </div>
                                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium text-sm">
                                    Nâng cấp
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
