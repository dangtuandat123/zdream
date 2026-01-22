'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faWandMagicSparkles,
    faEnvelope,
    faLock,
    faEye,
    faEyeSlash,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { useAuth } from '@/contexts/auth-context'

export default function LoginPage() {
    const router = useRouter()
    const { login, isAuthenticated, isLoading: authLoading } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Redirect if already logged in
    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            router.push('/')
        }
    }, [authLoading, isAuthenticated, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        const result = await login(email, password)

        if (result.success) {
            router.push('/')
        } else {
            setError(result.message || 'Đăng nhập thất bại')
            setIsLoading(false)
        }
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
                    <p className="text-white/60 mt-2">Đăng nhập để tiếp tục</p>
                </div>

                {/* Login Form */}
                <div className="bg-white/[0.03] backdrop-blur-[12px] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
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
                                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/50"
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
                                    placeholder="••••••••"
                                    required
                                    className="w-full h-12 pl-11 pr-11 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/50"
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

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Forgot Password */}
                        <div className="text-right">
                            <Link href="/forgot-password" className="text-purple-400 text-sm hover:underline">
                                Quên mật khẩu?
                            </Link>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-400 hover:to-pink-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                'Đang đăng nhập...'
                            ) : (
                                <>
                                    Đăng nhập
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

                    {/* Register Link */}
                    <p className="text-center text-white/60 mt-6">
                        Chưa có tài khoản?{' '}
                        <Link href="/register" className="text-purple-400 font-medium hover:underline">
                            Đăng ký miễn phí
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
