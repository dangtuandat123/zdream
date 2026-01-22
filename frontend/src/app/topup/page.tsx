'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faGem,
    faQrcode,
    faCheck,
    faCoins,
    faArrowLeft,
    faShieldAlt,
    faBolt,
    faHistory,
    faCopy,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons'

const TOPUP_PACKAGES = [
    { id: 1, credits: 10, price: 20000, popular: false, bonus: 0 },
    { id: 2, credits: 30, price: 50000, popular: true, bonus: 5 },
    { id: 3, credits: 60, price: 90000, popular: false, bonus: 10 },
    { id: 4, credits: 150, price: 200000, popular: false, bonus: 30 },
]

const BANK_CONFIG = {
    bankId: 'MB',
    accountNo: '0123456789',
    accountName: 'NGUYEN VAN A',
    template: 'compact2',
}

function formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

export default function TopupPage() {
    const [selectedPackage, setSelectedPackage] = useState(TOPUP_PACKAGES[1])
    const [copied, setCopied] = useState(false)
    const currentCredits = 0 // TODO: Fetch from API

    const transferContent = `NAP${selectedPackage.credits}XU`
    const qrUrl = `https://img.vietqr.io/image/${BANK_CONFIG.bankId}-${BANK_CONFIG.accountNo}-${BANK_CONFIG.template}.png?amount=${selectedPackage.price}&addInfo=${transferContent}&accountName=${encodeURIComponent(BANK_CONFIG.accountName)}`

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
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

            {/* Page Title */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-4">
                    <FontAwesomeIcon icon={faGem} className="w-8 h-8 text-cyan-400" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Nạp Xu</h1>
                <p className="text-white/60">Chọn gói xu phù hợp và thanh toán qua chuyển khoản</p>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Left: Package Selection */}
                    <div className="space-y-6">
                        {/* Current Balance */}
                        <div className="bg-white/[0.03] backdrop-blur-[12px] border border-white/[0.08] rounded-2xl p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/50 text-sm flex items-center gap-2">
                                        <FontAwesomeIcon icon={faCoins} className="w-4 h-4" />
                                        Số dư hiện tại
                                    </p>
                                    <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mt-1">
                                        {currentCredits} Xu
                                    </p>
                                </div>
                                <Link
                                    href="#history"
                                    className="text-white/40 hover:text-white/80 transition-colors text-sm flex items-center gap-1"
                                >
                                    <FontAwesomeIcon icon={faHistory} className="w-3.5 h-3.5" />
                                    Lịch sử
                                </Link>
                            </div>
                        </div>

                        {/* Package Selection */}
                        <div>
                            <h2 className="text-lg font-semibold text-white/90 mb-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faGem} className="w-4 h-4 text-purple-400" />
                                Chọn gói xu
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {TOPUP_PACKAGES.map((pkg) => (
                                    <button
                                        key={pkg.id}
                                        onClick={() => setSelectedPackage(pkg)}
                                        className={`
                      relative p-4 rounded-xl text-left transition-all duration-200
                      ${selectedPackage.id === pkg.id
                                                ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 scale-[1.02]'
                                                : 'bg-white/[0.03] border border-white/[0.08] text-white/80 hover:bg-white/[0.06] hover:border-white/[0.12]'
                                            }
                    `}
                                    >
                                        {pkg.popular && (
                                            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-lg">
                                                PHỔ BIẾN
                                            </span>
                                        )}
                                        {selectedPackage.id === pkg.id && (
                                            <FontAwesomeIcon icon={faCheckCircle} className="absolute top-3 right-3 w-4 h-4 text-white" />
                                        )}
                                        <p className="text-2xl font-bold">{pkg.credits}</p>
                                        <p className="text-sm opacity-70">Xu</p>
                                        {pkg.bonus > 0 && (
                                            <p className="text-xs text-green-400 mt-1">+{pkg.bonus} bonus</p>
                                        )}
                                        <p className="text-sm font-semibold mt-2 pt-2 border-t border-white/10">
                                            {formatPrice(pkg.price)}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/[0.02] rounded-xl p-4 flex items-start gap-3">
                                <FontAwesomeIcon icon={faBolt} className="w-4 h-4 text-yellow-400 mt-0.5" />
                                <div>
                                    <p className="text-white/90 text-sm font-medium">Tự động cộng</p>
                                    <p className="text-white/40 text-xs">Trong 1-5 phút</p>
                                </div>
                            </div>
                            <div className="bg-white/[0.02] rounded-xl p-4 flex items-start gap-3">
                                <FontAwesomeIcon icon={faShieldAlt} className="w-4 h-4 text-green-400 mt-0.5" />
                                <div>
                                    <p className="text-white/90 text-sm font-medium">An toàn</p>
                                    <p className="text-white/40 text-xs">Bảo mật 100%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Payment QR */}
                    <div className="bg-white/[0.03] backdrop-blur-[12px] border border-white/[0.08] rounded-2xl p-5 sm:p-6">
                        <h2 className="text-lg font-semibold text-white/90 mb-4 flex items-center gap-2">
                            <FontAwesomeIcon icon={faQrcode} className="w-4 h-4 text-purple-400" />
                            Thanh toán
                        </h2>

                        {/* Selected Package Summary */}
                        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4 mb-5">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-white/60 text-sm">Gói đã chọn</p>
                                    <p className="text-xl font-bold text-white">
                                        {selectedPackage.credits} Xu
                                        {selectedPackage.bonus > 0 && (
                                            <span className="text-green-400 text-sm ml-2">+{selectedPackage.bonus}</span>
                                        )}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-white/60 text-sm">Số tiền</p>
                                    <p className="text-xl font-bold text-white">{formatPrice(selectedPackage.price)}</p>
                                </div>
                            </div>
                        </div>

                        {/* QR Code */}
                        <div className="text-center mb-5">
                            <div className="bg-white rounded-xl p-3 inline-block shadow-lg">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={qrUrl}
                                    alt="VietQR Payment"
                                    width={200}
                                    height={200}
                                    className="mx-auto"
                                />
                            </div>
                            <p className="text-white/40 text-xs mt-3">Quét mã QR bằng app ngân hàng</p>
                        </div>

                        {/* Transfer Info */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-white/[0.05]">
                                <span className="text-white/50 text-sm">Ngân hàng</span>
                                <span className="text-white font-medium">MB Bank</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/[0.05]">
                                <span className="text-white/50 text-sm">Số tài khoản</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-white font-mono">{BANK_CONFIG.accountNo}</span>
                                    <button
                                        onClick={() => copyToClipboard(BANK_CONFIG.accountNo)}
                                        className="text-white/40 hover:text-white/80"
                                    >
                                        <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/[0.05]">
                                <span className="text-white/50 text-sm">Chủ tài khoản</span>
                                <span className="text-white">{BANK_CONFIG.accountName}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/[0.05]">
                                <span className="text-white/50 text-sm">Số tiền</span>
                                <span className="text-white font-bold">{formatPrice(selectedPackage.price)}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-white/50 text-sm">Nội dung CK</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-purple-400 font-mono font-bold">{transferContent}</span>
                                    <button
                                        onClick={() => copyToClipboard(transferContent)}
                                        className="text-white/40 hover:text-white/80"
                                    >
                                        <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Note */}
                        <div className="mt-5 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                            <p className="text-green-400 text-sm flex items-start gap-2">
                                <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>Xu sẽ được cộng <strong>tự động</strong> vào tài khoản sau 1-5 phút khi chuyển khoản thành công.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
