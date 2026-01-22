'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowLeft,
    faCog,
    faBell,
    faLock,
    faPalette,
    faGlobe,
    faTrash,
    faChevronRight,
    faToggleOn,
    faToggleOff
} from '@fortawesome/free-solid-svg-icons'

export default function SettingsPage() {
    const [notifications, setNotifications] = useState(true)
    const [emailUpdates, setEmailUpdates] = useState(false)
    const [darkMode] = useState(true)

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

            {/* Page Title */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <FontAwesomeIcon icon={faCog} className="w-6 h-6 text-purple-400" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">Cài đặt</h1>
                </div>
                <p className="text-white/60">Quản lý tài khoản và tùy chọn của bạn</p>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
                {/* Notifications */}
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-white/[0.05]">
                        <h2 className="text-white font-semibold flex items-center gap-2">
                            <FontAwesomeIcon icon={faBell} className="w-4 h-4 text-purple-400" />
                            Thông báo
                        </h2>
                    </div>
                    <div className="divide-y divide-white/[0.05]">
                        <div className="flex items-center justify-between p-5">
                            <div>
                                <p className="text-white">Thông báo đẩy</p>
                                <p className="text-white/50 text-sm">Nhận thông báo khi ảnh hoàn thành</p>
                            </div>
                            <button onClick={() => setNotifications(!notifications)}>
                                <FontAwesomeIcon
                                    icon={notifications ? faToggleOn : faToggleOff}
                                    className={`w-8 h-8 ${notifications ? 'text-purple-500' : 'text-white/30'}`}
                                />
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-5">
                            <div>
                                <p className="text-white">Email cập nhật</p>
                                <p className="text-white/50 text-sm">Nhận tin tức và khuyến mãi qua email</p>
                            </div>
                            <button onClick={() => setEmailUpdates(!emailUpdates)}>
                                <FontAwesomeIcon
                                    icon={emailUpdates ? faToggleOn : faToggleOff}
                                    className={`w-8 h-8 ${emailUpdates ? 'text-purple-500' : 'text-white/30'}`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-white/[0.05]">
                        <h2 className="text-white font-semibold flex items-center gap-2">
                            <FontAwesomeIcon icon={faLock} className="w-4 h-4 text-purple-400" />
                            Bảo mật
                        </h2>
                    </div>
                    <div className="divide-y divide-white/[0.05]">
                        <button className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors text-left">
                            <div>
                                <p className="text-white">Đổi mật khẩu</p>
                                <p className="text-white/50 text-sm">Cập nhật mật khẩu đăng nhập</p>
                            </div>
                            <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-white/30" />
                        </button>
                        <button className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors text-left">
                            <div>
                                <p className="text-white">Xác thực 2 lớp</p>
                                <p className="text-white/50 text-sm">Bảo vệ tài khoản bằng OTP</p>
                            </div>
                            <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-white/30" />
                        </button>
                    </div>
                </div>

                {/* Appearance */}
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-white/[0.05]">
                        <h2 className="text-white font-semibold flex items-center gap-2">
                            <FontAwesomeIcon icon={faPalette} className="w-4 h-4 text-purple-400" />
                            Giao diện
                        </h2>
                    </div>
                    <div className="divide-y divide-white/[0.05]">
                        <div className="flex items-center justify-between p-5">
                            <div>
                                <p className="text-white">Chế độ tối</p>
                                <p className="text-white/50 text-sm">Luôn bật</p>
                            </div>
                            <FontAwesomeIcon
                                icon={faToggleOn}
                                className="w-8 h-8 text-purple-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Language */}
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-white/[0.05]">
                        <h2 className="text-white font-semibold flex items-center gap-2">
                            <FontAwesomeIcon icon={faGlobe} className="w-4 h-4 text-purple-400" />
                            Ngôn ngữ
                        </h2>
                    </div>
                    <button className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors">
                        <div>
                            <p className="text-white">Tiếng Việt</p>
                            <p className="text-white/50 text-sm">Ngôn ngữ hiển thị</p>
                        </div>
                        <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-white/30" />
                    </button>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-red-500/10">
                        <h2 className="text-red-400 font-semibold flex items-center gap-2">
                            <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                            Vùng nguy hiểm
                        </h2>
                    </div>
                    <button className="w-full flex items-center justify-between p-5 hover:bg-red-500/5 transition-colors text-left">
                        <div>
                            <p className="text-red-400">Xóa tài khoản</p>
                            <p className="text-red-400/60 text-sm">Xóa vĩnh viễn tài khoản và dữ liệu</p>
                        </div>
                        <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-red-400/30" />
                    </button>
                </div>
            </div>
        </div>
    )
}
