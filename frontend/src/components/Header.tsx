'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faWandMagicSparkles,
    faGem,
    faPlus,
    faBars,
    faTimes,
    faHome,
    faPalette,
    faHistory,
    faUser,
    faSignInAlt,
    faCrown,
    faChevronRight,
    faSignOutAlt,
    faCog
} from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'

// Navigation items
const NAV_ITEMS = [
    { href: '/', label: 'Trang chủ', icon: faHome },
    { href: '/#styles', label: 'Styles', icon: faPalette },
    { href: '/history', label: 'Lịch sử', icon: faHistory },
]

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

    // TODO: Fetch from API
    const credits = 0
    const isLoggedIn = true // Mock: đang đăng nhập
    const user = {
        name: 'Tuấn Đạt',
        avatar: null, // null = hiển thị chữ cái đầu
        email: 'dat@example.com'
    }

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close menus on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isUserMenuOpen && !(e.target as Element).closest('.user-menu-container')) {
                setIsUserMenuOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [isUserMenuOpen])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isMobileMenuOpen])

    return (
        <>
            <header
                className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${isScrolled
                        ? 'bg-[#0a0a0f]/95 backdrop-blur-[20px] shadow-lg shadow-black/20 border-b border-white/[0.05]'
                        : 'bg-[#0a0a0f]/80 backdrop-blur-[12px] border-b border-white/[0.03]'
                    }
        `}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-14 sm:h-16">
                        {/* Left: Logo + Desktop Nav */}
                        <div className="flex items-center gap-6">
                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
                                <FontAwesomeIcon
                                    icon={faWandMagicSparkles}
                                    className="w-5 h-5 text-purple-400 transition-transform duration-300 group-hover:rotate-12"
                                />
                                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                                    ZDream
                                </span>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center gap-1">
                                {NAV_ITEMS.map(item => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="
                      px-3 py-2 rounded-lg text-sm font-medium
                      text-white/60 hover:text-white hover:bg-white/[0.05]
                      transition-all duration-200
                      inline-flex items-center gap-2
                    "
                                    >
                                        <FontAwesomeIcon icon={item.icon} className="w-3.5 h-3.5" />
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2">
                            {/* Credits + Topup Button - Combined */}
                            <div className="hidden sm:flex items-center bg-white/[0.03] rounded-full border border-white/[0.08] p-1">
                                {/* Credits Display */}
                                <Link
                                    href="/topup"
                                    className="
                    px-3 h-8 rounded-full
                    flex items-center gap-2
                    text-white/80
                    hover:bg-white/[0.05]
                    transition-all duration-200
                  "
                                >
                                    <FontAwesomeIcon icon={faGem} className="w-4 h-4 text-cyan-400" />
                                    <span className="font-semibold text-sm text-white/95">{credits}</span>
                                </Link>

                                {/* Topup Button */}
                                <Link
                                    href="/topup"
                                    className="
                    h-8 px-4 rounded-full
                    bg-gradient-to-r from-purple-500 to-pink-500
                    text-white font-medium text-sm
                    flex items-center gap-1.5
                    hover:from-purple-400 hover:to-pink-400
                    transition-all duration-200
                  "
                                >
                                    <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
                                    Nạp Xu
                                </Link>
                            </div>

                            {/* Mobile: Credits Only */}
                            <Link
                                href="/topup"
                                className="
                  sm:hidden
                  h-9 px-3 rounded-full
                  bg-white/[0.03] border border-white/[0.08]
                  flex items-center gap-2
                  text-white/80
                "
                            >
                                <FontAwesomeIcon icon={faGem} className="w-4 h-4 text-cyan-400" />
                                <span className="font-semibold text-sm text-white/95">{credits}</span>
                            </Link>

                            {/* User Avatar / Profile - Desktop */}
                            {isLoggedIn ? (
                                <div className="relative user-menu-container hidden sm:block">
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="
                      w-9 h-9 rounded-full overflow-hidden
                      bg-gradient-to-br from-purple-500 to-pink-500
                      flex items-center justify-center
                      text-white font-semibold text-sm
                      border-2 border-white/[0.1]
                      hover:border-white/[0.3]
                      transition-all duration-200
                    "
                                    >
                                        {user.avatar ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                        ) : (
                                            user.name.charAt(0).toUpperCase()
                                        )}
                                    </button>

                                    {/* User Dropdown Menu */}
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-56 py-2 bg-[#0f0f18]/98 backdrop-blur-[24px] border border-white/[0.1] rounded-xl shadow-2xl shadow-black/50">
                                            {/* User Info */}
                                            <div className="px-4 py-3 border-b border-white/[0.05]">
                                                <p className="text-white font-medium text-sm">{user.name}</p>
                                                <p className="text-white/50 text-xs">{user.email}</p>
                                            </div>

                                            {/* Menu Items */}
                                            <div className="py-1">
                                                <Link
                                                    href="/profile"
                                                    className="flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors text-sm"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                >
                                                    <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                                                    Tài khoản
                                                </Link>
                                                <Link
                                                    href="/history"
                                                    className="flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors text-sm"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                >
                                                    <FontAwesomeIcon icon={faHistory} className="w-4 h-4" />
                                                    Lịch sử tạo ảnh
                                                </Link>
                                                <Link
                                                    href="/settings"
                                                    className="flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors text-sm"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                >
                                                    <FontAwesomeIcon icon={faCog} className="w-4 h-4" />
                                                    Cài đặt
                                                </Link>
                                            </div>

                                            {/* Logout */}
                                            <div className="border-t border-white/[0.05] pt-1">
                                                <button
                                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-500/10 transition-colors text-sm"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                >
                                                    <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
                                                    Đăng xuất
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link href="/login" className="hidden sm:block">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="
                      h-9 px-4 rounded-full
                      bg-white/[0.03] border border-white/[0.1]
                      text-white/80 text-sm
                      hover:bg-white/[0.06]
                    "
                                    >
                                        Đăng nhập
                                    </Button>
                                </Link>
                            )}

                            {/* Mobile: Hamburger Menu */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="
                  md:hidden
                  w-10 h-10 rounded-xl
                  bg-white/[0.03] border border-white/[0.08]
                  flex items-center justify-center
                  text-white/80 hover:text-white hover:bg-white/[0.06]
                  transition-all duration-200
                "
                                aria-label={isMobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
                            >
                                <FontAwesomeIcon
                                    icon={isMobileMenuOpen ? faTimes : faBars}
                                    className="w-4 h-4"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`
          fixed inset-0 z-40 md:hidden
          transition-opacity duration-300
          ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Menu Panel */}
                <div
                    className={`
            absolute right-0 top-0 h-full w-72 max-w-[85vw]
            bg-[#0a0a0f]/98 backdrop-blur-[24px]
            border-l border-white/[0.08]
            transform transition-transform duration-300 ease-out
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
                >
                    {/* Menu Header with User */}
                    <div className="p-4 border-b border-white/[0.05]">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                                    {user.avatar ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
                                    ) : (
                                        user.name.charAt(0).toUpperCase()
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-medium text-sm truncate">{user.name}</p>
                                    <p className="text-white/50 text-xs truncate">{user.email}</p>
                                </div>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center text-white/60 hover:text-white"
                                >
                                    <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <span className="text-white/80 font-medium">Menu</span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center text-white/60 hover:text-white"
                                >
                                    <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Menu Content */}
                    <div className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-80px)]">
                        {/* Credits Card */}
                        <Link
                            href="/topup"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-white/60 text-sm">Số dư</span>
                                <FontAwesomeIcon icon={faGem} className="w-4 h-4 text-cyan-400" />
                            </div>
                            <div className="text-2xl font-bold text-white mb-3">{credits} Xu</div>
                            <div className="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25">
                                <FontAwesomeIcon icon={faPlus} className="w-3.5 h-3.5" />
                                Nạp thêm Xu
                            </div>
                        </Link>

                        {/* Divider */}
                        <div className="h-px bg-white/[0.05] my-4" />

                        {/* Navigation Links */}
                        {NAV_ITEMS.map(item => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="
                  flex items-center justify-between
                  px-4 py-3 rounded-xl
                  bg-white/[0.02] hover:bg-white/[0.05]
                  border border-white/[0.05] hover:border-white/[0.1]
                  text-white/80 hover:text-white
                  transition-all duration-200
                "
                            >
                                <span className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={item.icon} className="w-4 h-4 text-purple-400" />
                                    {item.label}
                                </span>
                                <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 text-white/30" />
                            </Link>
                        ))}

                        {/* Divider */}
                        <div className="h-px bg-white/[0.05] my-4" />

                        {/* Auth Section */}
                        {isLoggedIn ? (
                            <div className="space-y-2">
                                <Link
                                    href="/profile"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="
                    flex items-center justify-between
                    px-4 py-3 rounded-xl
                    bg-white/[0.02] hover:bg-white/[0.05]
                    border border-white/[0.05]
                    text-white/80 hover:text-white
                    transition-all duration-200
                  "
                                >
                                    <span className="flex items-center gap-3">
                                        <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-purple-400" />
                                        Tài khoản
                                    </span>
                                    <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 text-white/30" />
                                </Link>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="
                    w-full flex items-center gap-3
                    px-4 py-3 rounded-xl
                    bg-red-500/10 border border-red-500/20
                    text-red-400
                    transition-all duration-200
                  "
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
                                    Đăng xuất
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="
                    w-full py-3 rounded-xl
                    bg-white text-gray-900 font-medium
                    flex items-center justify-center gap-2
                    hover:bg-gray-100
                    transition-colors
                  "
                                >
                                    <FontAwesomeIcon icon={faCrown} className="w-4 h-4" />
                                    Đăng ký miễn phí
                                </button>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="
                    w-full py-3 rounded-xl
                    bg-white/[0.05] border border-white/[0.1]
                    text-white/80 font-medium
                    flex items-center justify-center gap-2
                    hover:bg-white/[0.1]
                    transition-colors
                  "
                                >
                                    <FontAwesomeIcon icon={faSignInAlt} className="w-4 h-4" />
                                    Đăng nhập
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
