'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faFileContract } from '@fortawesome/free-solid-svg-icons'

export default function TermsPage() {
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
                    <FontAwesomeIcon icon={faFileContract} className="w-8 h-8 text-purple-400" />
                    <h1 className="text-3xl font-bold text-white">Điều khoản sử dụng</h1>
                </div>

                <div className="prose prose-invert max-w-none bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8">
                    <h3>1. Giới thiệu</h3>
                    <p>Chào mừng bạn đến với ZDream. Khi sử dụng dịch vụ của chúng tôi, bạn đồng ý với các điều khoản dưới đây.</p>

                    <h3>2. Dịch vụ AI</h3>
                    <p>ZDream cung cấp công cụ tạo ảnh bằng AI. Bạn chịu trách nhiệm về nội dung ảnh bạn tải lên và tạo ra.</p>

                    <h3>3. Quyền sở hữu</h3>
                    <p>Bạn giữ bản quyền đối với các ảnh bạn tạo ra. ZDream có quyền sử dụng ảnh đó để cải thiện dịch vụ (trừ khi bạn chọn chế độ riêng tư).</p>

                    <h3>4. Thanh toán</h3>
                    <p>Đơn vị tiền tệ là "Xu". Xu không có giá trị quy đổi ra tiền mặt và không được hoàn lại.</p>

                    <h3>5. Cấm sử dụng</h3>
                    <p>Nghiêm cấm tạo ảnh đồi trụy, bạo lực, hoặc vi phạm pháp luật Việt Nam.</p>
                </div>
            </div>
        </div>
    )
}
