'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faShieldAlt } from '@fortawesome/free-solid-svg-icons'

export default function PrivacyPage() {
    return (
        <div className="min-h-screen pb-12">
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
                <div className="flex items-center gap-3 mb-8">
                    <FontAwesomeIcon icon={faShieldAlt} className="w-8 h-8 text-purple-400" />
                    <h1 className="text-3xl font-bold text-white">Chính sách bảo mật</h1>
                </div>

                <div className="prose prose-invert max-w-none bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8">
                    <h3>1. Thu thập dữ liệu</h3>
                    <p>Chúng tôi thu thập email, tên hiển thị và ảnh bạn tải lên để cung cấp dịch vụ.</p>

                    <h3>2. Sử dụng dữ liệu</h3>
                    <p>Dữ liệu của bạn được dùng để:</p>
                    <ul>
                        <li>Cung cấp tính năng tạo ảnh AI</li>
                        <li>Quản lý tài khoản và lịch sử</li>
                        <li>Cải thiện trải nghiệm người dùng</li>
                    </ul>

                    <h3>3. Bảo mật</h3>
                    <p>Chúng tôi cam kết bảo mật thông tin cá nhân của bạn và không chia sẻ cho bên thứ ba.</p>

                    <h3>4. Cookie</h3>
                    <p>Website sử dụng cookie để lưu trạng thái đăng nhập và cài đặt của bạn.</p>
                </div>
            </div>
        </div>
    )
}
