'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faWandMagicSparkles,
    faEnvelope,
    faLock,
    faUser,
    faEye,
    faEyeSlash,
    faArrowRight,
    faCheck,
    faGift
} from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [agreed, setAgreed] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!agreed) return
        setIsLoading(true)
        // TODO: Call API
        setTimeout(() => {
            setIsLoading(false)
            window.location.href = '/'
        }, 1500)
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-600/15 rounded-full blur-[130px]" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 group">
                        <FontAwesomeIcon icon={faWandMagicSparkles} className="w-8 h-8 text-purple-400" />
                        <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                            ZDream
                        </span>
                    </Link>
                    <p className="text-white/60 mt-2">Tạo tài khoản miễn phí</p>
                </div>

                {/* Bonus Badge */}
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 mb-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-purple-300">
                        <FontAwesomeIcon icon={faGift} className="w-5 h-5" />
                        <span className="font-semibold">Nhận ngay 5 Xu miễn phí!</span>
                    </div>
                </div>

                {/* Register Form */}
                <div className="bg-white/[0.03] backdrop-blur-[12px] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-white/70 text-sm mb-2">Họ tên</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nguyễn Văn A"
                                    required
                                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                                />
                                <FontAwesomeIcon icon={faUser} className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-white/70 text-sm mb-2">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                                />
                                <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-white/70 text-sm mb-2">Mật khẩu</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Tối thiểu 8 ký tự"
                                    required
                                    minLength={8}
                                    className="w-full h-12 pl-11 pr-11 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                                />
                                <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80"
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Terms */}
                        <label className="flex items-start gap-3 cursor-pointer">
                            <div
                                onClick={() => setAgreed(!agreed)}
                                className={`w-5 h-5 mt-0.5 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${agreed ? 'bg-purple-500 border-purple-500' : 'border-white/30'
                                    }`}
                            >
                                {agreed && <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-white" />}
                            </div>
                            <span className="text-white/60 text-sm">
                                Tôi đồng ý với{' '}
                                <Link href="/terms" className="text-purple-400 hover:underline">Điều khoản sử dụng</Link>
                                {' '}và{' '}
                                <Link href="/privacy" className="text-purple-400 hover:underline">Chính sách bảo mật</Link>
                            </span>
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading || !agreed}
                            className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-400 hover:to-pink-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                'Đang tạo tài khoản...'
                            ) : (
                                <>
                                    Đăng ký
                                    <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-white/[0.1]" />
                        <span className="text-white/40 text-sm">hoặc</span>
                        <div className="flex-1 h-px bg-white/[0.1]" />
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-3">
                        <button className="h-11 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white/80 hover:bg-white/[0.1] transition-colors flex items-center justify-center gap-2">
                            <FontAwesomeIcon icon={faGoogle} className="w-4 h-4" />
                            <span className="text-sm">Google</span>
                        </button>
                        <button className="h-11 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white/80 hover:bg-white/[0.1] transition-colors flex items-center justify-center gap-2">
                            <FontAwesomeIcon icon={faFacebook} className="w-4 h-4" />
                            <span className="text-sm">Facebook</span>
                        </button>
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-white/60 mt-6">
                        Đã có tài khoản?{' '}
                        <Link href="/login" className="text-purple-400 font-medium hover:underline">
                            Đăng nhập
                        </Link>
                    </p>
                </div>

                {/* Back to Home */}
                <p className="text-center mt-6">
                    <Link href="/" className="text-white/40 text-sm hover:text-white/80">
                        ← Về trang chủ
                    </Link>
                </p>
            </div>
        </div>
    )
}
