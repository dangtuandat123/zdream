'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGem, faQrcode, faTimes, faCheck, faCoins } from '@fortawesome/free-solid-svg-icons'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface TopupModalProps {
    isOpen: boolean
    onClose: () => void
    currentCredits?: number
}

const TOPUP_PACKAGES = [
    { id: 1, credits: 10, price: 20000, popular: false },
    { id: 2, credits: 30, price: 50000, popular: true },
    { id: 3, credits: 60, price: 90000, popular: false },
    { id: 4, credits: 150, price: 200000, popular: false },
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

export function TopupModal({ isOpen, onClose, currentCredits = 0 }: TopupModalProps) {
    const [selectedPackage, setSelectedPackage] = useState(TOPUP_PACKAGES[1])

    const qrUrl = `https://img.vietqr.io/image/${BANK_CONFIG.bankId}-${BANK_CONFIG.accountNo}-${BANK_CONFIG.template}.png?amount=${selectedPackage.price}&addInfo=NAP${selectedPackage.credits}XU&accountName=${encodeURIComponent(BANK_CONFIG.accountName)}`

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="
          bg-[#0f0f18]/98 backdrop-blur-[24px] saturate-[180%]
          border border-white/[0.1]
          rounded-2xl shadow-2xl shadow-black/50
          max-w-sm w-[calc(100%-2rem)] mx-auto
          max-h-[85vh] overflow-y-auto
          p-0
        "
            >
                {/* Header - Sticky */}
                <DialogHeader className="sticky top-0 bg-[#0f0f18]/95 backdrop-blur-sm z-10 p-4 pb-3 border-b border-white/[0.05]">
                    <DialogTitle className="text-lg font-bold text-center flex items-center justify-center gap-2">
                        <FontAwesomeIcon icon={faGem} className="w-5 h-5 text-cyan-400" />
                        <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                            Nạp Xu
                        </span>
                    </DialogTitle>
                </DialogHeader>

                {/* Content */}
                <div className="p-4 pt-3 space-y-3">
                    {/* Current Credits - Compact */}
                    <div className="flex items-center justify-between bg-white/[0.03] rounded-xl px-4 py-3 border border-white/[0.06]">
                        <span className="text-white/50 text-sm flex items-center gap-1.5">
                            <FontAwesomeIcon icon={faCoins} className="w-3.5 h-3.5" />
                            Số dư hiện tại
                        </span>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                            {currentCredits} Xu
                        </span>
                    </div>

                    {/* Package Selection - 2x2 Grid, Compact */}
                    <div className="grid grid-cols-2 gap-2">
                        {TOPUP_PACKAGES.map((pkg) => (
                            <button
                                key={pkg.id}
                                onClick={() => setSelectedPackage(pkg)}
                                className={`
                  relative p-3 rounded-xl text-center transition-all duration-200
                  ${selectedPackage.id === pkg.id
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                                        : 'bg-white/[0.03] border border-white/[0.08] text-white/80 hover:bg-white/[0.06]'
                                    }
                `}
                            >
                                {pkg.popular && (
                                    <span className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                        HOT
                                    </span>
                                )}
                                {selectedPackage.id === pkg.id && (
                                    <FontAwesomeIcon icon={faCheck} className="absolute top-2 left-2 w-3 h-3 text-white" />
                                )}
                                <p className="text-xl font-bold">{pkg.credits}</p>
                                <p className="text-xs opacity-70">Xu</p>
                                <p className="text-xs font-medium mt-0.5">{formatPrice(pkg.price)}</p>
                            </button>
                        ))}
                    </div>

                    {/* QR Code Section - Compact */}
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center">
                        <p className="text-xs text-white/50 mb-2 flex items-center justify-center gap-1.5">
                            <FontAwesomeIcon icon={faQrcode} className="w-3.5 h-3.5" />
                            Quét mã để chuyển khoản
                        </p>

                        <div className="bg-white rounded-lg p-2 inline-block">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={qrUrl}
                                alt="VietQR Payment"
                                width={140}
                                height={140}
                                className="mx-auto"
                            />
                        </div>

                        <div className="mt-2 space-y-1 text-xs">
                            <p className="text-white/80">
                                Số tiền: <span className="font-bold text-white">{formatPrice(selectedPackage.price)}</span>
                            </p>
                            <p className="text-white/40">
                                Nội dung: <span className="font-mono font-bold text-purple-400">NAP{selectedPackage.credits}XU</span>
                            </p>
                        </div>
                    </div>

                    {/* Note */}
                    <p className="text-center text-[11px] text-white/40 flex items-center justify-center gap-1">
                        <FontAwesomeIcon icon={faCheck} className="w-2.5 h-2.5 text-green-500" />
                        Xu được cộng tự động sau 1-5 phút
                    </p>
                </div>

                {/* Footer - Sticky */}
                <div className="sticky bottom-0 bg-[#0f0f18]/95 backdrop-blur-sm p-4 pt-3 border-t border-white/[0.05]">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="
              w-full h-10
              bg-white/[0.03]
              border border-white/[0.1]
              text-white/80
              hover:bg-white/[0.06] hover:text-white
              inline-flex items-center justify-center gap-2
              text-sm
            "
                    >
                        <FontAwesomeIcon icon={faTimes} className="w-3.5 h-3.5" />
                        Đóng
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
