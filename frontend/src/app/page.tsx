'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes, faArrowRight, faFire, faPalette, faWandMagicSparkles, faCamera, faBolt, faRocket, faGift, faCrown, faStar, faPlay } from '@fortawesome/free-solid-svg-icons'
import { StyleCard } from '@/components/StyleCard'
import { MOCK_STYLES } from '@/lib/styles-data'

// Categories for filtering
const CATEGORIES = [
  { id: 'all', label: 'Tất cả', icon: faWandMagicSparkles },
  { id: 'trending', label: 'Hot', icon: faFire },
  { id: 'new', label: 'Mới', icon: faBolt },
  { id: 'classic', label: 'Cổ điển', icon: faPalette },
]

// Map styles to categories (mock)
const STYLE_CATEGORIES: Record<string, string[]> = {
  '1': ['trending', 'new'],
  '2': ['classic'],
  '3': ['trending'],
  '4': ['new'],
  '5': ['trending', 'new'],
  '6': ['classic'],
  '7': ['trending'],
  '8': ['classic'],
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const allStyles = Object.values(MOCK_STYLES)

  const filteredStyles = useMemo(() => {
    return allStyles.filter(style => {
      if (activeCategory !== 'all') {
        const categories = STYLE_CATEGORIES[style.id] || []
        if (!categories.includes(activeCategory)) return false
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          style.name.toLowerCase().includes(query) ||
          style.description.toLowerCase().includes(query)
        )
      }

      return true
    })
  }, [allStyles, activeCategory, searchQuery])

  const featuredStyle = allStyles.find(s => STYLE_CATEGORIES[s.id]?.includes('trending'))

  return (
    <div className="min-h-screen">
      {/* === HERO SECTION - Mobile First === */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-600/20 rounded-full blur-[100px] sm:blur-[150px]" />
          <div className="absolute bottom-0 right-0 w-48 sm:w-80 h-48 sm:h-80 bg-pink-600/15 rounded-full blur-[80px] sm:blur-[130px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
          {/* Mobile: Stacked Layout */}
          <div className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">

            {/* Content */}
            <div>
              {/* Badge - Smaller on mobile */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-4 sm:mb-6">
                <FontAwesomeIcon icon={faStar} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                <span className="text-xs sm:text-sm font-medium text-white/80">AI tiên tiến nhất</span>
              </div>

              {/* Heading - Responsive sizes */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                <span className="text-white">Biến Ảnh Thường</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Thành Tác Phẩm
                </span>
              </h1>

              {/* Description - Shorter on mobile */}
              <p className="text-white/60 text-base sm:text-lg lg:text-xl max-w-lg mx-auto lg:mx-0 mb-6 sm:mb-8">
                Chọn style → Upload ảnh → Nhận kết quả.
                <span className="hidden sm:inline"> Chỉ cần 3 bước đơn giản, không cần viết prompt!</span>
              </p>

              {/* CTA Buttons - Stack on mobile */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-0">
                <Link
                  href="#styles"
                  className="
                    px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl
                    bg-gradient-to-r from-purple-500 to-pink-500
                    text-white font-semibold text-base sm:text-lg
                    shadow-lg shadow-purple-500/30
                    hover:shadow-purple-500/50
                    transition-all duration-300
                    inline-flex items-center justify-center gap-2
                  "
                >
                  <FontAwesomeIcon icon={faWandMagicSparkles} className="w-4 h-4 sm:w-5 sm:h-5" />
                  Bắt đầu ngay
                </Link>
                <button
                  className="
                    px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl
                    bg-white/[0.05] backdrop-blur-sm
                    border border-white/[0.1]
                    text-white font-medium text-base sm:text-lg
                    hover:bg-white/[0.1]
                    transition-all duration-300
                    inline-flex items-center justify-center gap-2
                  "
                >
                  <FontAwesomeIcon icon={faPlay} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Xem demo
                </button>
              </div>

              {/* Stats - Show on all sizes */}
              <div className="flex items-center justify-center lg:justify-start gap-6 sm:gap-8 mt-8 pt-6 sm:pt-8 border-t border-white/[0.05]">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">8+</p>
                  <p className="text-white/50 text-xs sm:text-sm">Styles</p>
                </div>
                <div className="w-px h-8 sm:h-10 bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">10s</p>
                  <p className="text-white/50 text-xs sm:text-sm">Xử lý</p>
                </div>
                <div className="w-px h-8 sm:h-10 bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">2K</p>
                  <p className="text-white/50 text-xs sm:text-sm">Từ</p>
                </div>
              </div>
            </div>

            {/* Preview Images - Hide on mobile, show on lg+ */}
            <div className="hidden lg:block relative mt-8 lg:mt-0">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Main Image */}
                <div className="absolute top-0 right-0 w-64 xl:w-72 h-80 xl:h-96 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 border border-white/[0.1] transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src={allStyles[0]?.thumbnailUrl || ''}
                    alt="AI Generated"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold">{allStyles[0]?.name}</p>
                  </div>
                </div>

                {/* Secondary Image */}
                <div className="absolute bottom-0 left-0 w-48 xl:w-56 h-60 xl:h-72 rounded-2xl overflow-hidden shadow-2xl shadow-pink-500/20 border border-white/[0.1] transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src={allStyles[2]?.thumbnailUrl || ''}
                    alt="AI Generated"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Floating Badge */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 xl:w-20 xl:h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <FontAwesomeIcon icon={faWandMagicSparkles} className="w-6 h-6 xl:w-8 xl:h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === FEATURED STYLE SECTION - Mobile Optimized === */}
      {featuredStyle && activeCategory === 'all' && !searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" id="featured">
          {/* Section Header */}
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
              <FontAwesomeIcon icon={faFire} className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-white">Style Nổi Bật</h2>
              <p className="text-white/50 text-xs sm:text-sm">Được yêu thích nhất</p>
            </div>
          </div>

          <Link
            href={`/style/${featuredStyle.id}`}
            className="
              block relative overflow-hidden rounded-2xl sm:rounded-3xl
              bg-gradient-to-br from-purple-900/60 via-pink-900/40 to-purple-900/60
              border border-white/[0.1]
              group
            "
          >
            {/* Content - Stack on mobile, row on md+ */}
            <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
              {/* Image Preview */}
              <div className="relative w-full sm:w-40 lg:w-56 aspect-[4/5] sm:aspect-auto sm:h-52 lg:h-72 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0 border border-white/[0.1]">
                <Image
                  src={featuredStyle.thumbnailUrl}
                  alt={featuredStyle.name}
                  fill
                  className="object-cover"
                />
                {/* Price Badge on mobile */}
                <div className="sm:hidden absolute top-2 right-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white font-bold text-sm">
                  {featuredStyle.priceCredits} Xu
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 text-center sm:text-left w-full">
                {/* Badges */}
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2 sm:mb-3">
                  <span className="px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] sm:text-xs font-bold inline-flex items-center gap-1">
                    <FontAwesomeIcon icon={faFire} className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    HOT
                  </span>
                  <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/[0.1] text-white/70 text-xs">
                    🎯 Chọn nhiều nhất
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">{featuredStyle.name}</h3>
                <p className="text-white/60 text-sm sm:text-base mb-4 line-clamp-2">{featuredStyle.description}</p>

                {/* Features - Hide some on mobile */}
                <div className="hidden sm:flex flex-wrap gap-2 mb-4 lg:mb-6">
                  <span className="px-3 py-1.5 rounded-full bg-white/[0.05] text-white/70 text-xs inline-flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faBolt} className="w-3 h-3 text-yellow-400" />
                    10 giây
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-white/[0.05] text-white/70 text-xs inline-flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-yellow-400" />
                    Chất lượng cao
                  </span>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-4 sm:gap-6 justify-center sm:justify-start">
                  <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm">
                    Thử ngay
                    <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
                  </span>
                  <div className="hidden sm:block">
                    <p className="text-white/50 text-xs">Chỉ từ</p>
                    <p className="text-xl font-bold text-white">{featuredStyle.priceCredits} <span className="text-purple-400 text-sm">Xu</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative - Hide on mobile */}
            <div className="hidden sm:block absolute -top-20 -right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none" />
          </Link>
        </section>
      )}

      {/* === SEARCH & FILTER SECTION === */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8" id="styles">
        {/* Filter Controls */}
        <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between mb-6">
          {/* Search Box */}
          <div className="relative w-full sm:w-72 lg:w-80">
            <input
              type="text"
              placeholder="Tìm kiếm style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full h-11 sm:h-12 pl-10 sm:pl-12 pr-10 sm:pr-12 rounded-xl
                bg-white/[0.05] backdrop-blur-[12px]
                border border-white/[0.1]
                text-white/90 text-sm sm:text-base placeholder:text-white/40
                focus:outline-none focus:ring-2 focus:ring-purple-500/40
                transition-all duration-200
              "
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80"
              >
                <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs - Horizontal scroll on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-sm font-medium
                  inline-flex items-center gap-1.5 sm:gap-2
                  whitespace-nowrap flex-shrink-0
                  transition-all duration-200
                  ${activeCategory === cat.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-white/[0.05] text-white/70 hover:bg-white/[0.1] border border-white/[0.08]'
                  }
                `}
              >
                <FontAwesomeIcon icon={cat.icon} className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <FontAwesomeIcon icon={faPalette} className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
          <h2 className="text-lg sm:text-xl font-bold text-white/95">
            {activeCategory === 'all' ? 'Tất cả' : CATEGORIES.find(c => c.id === activeCategory)?.label}
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-white/[0.1] text-white/60 text-xs">
            {filteredStyles.length}
          </span>
        </div>

        {/* Grid */}
        {filteredStyles.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {filteredStyles.map((style) => (
              <StyleCard key={style.id} {...style} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <FontAwesomeIcon icon={faSearch} className="w-10 h-10 sm:w-12 sm:h-12 text-white/20 mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-white/80 mb-2">Không tìm thấy</h3>
            <p className="text-white/50 text-sm">Thử từ khóa khác</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-4 px-5 py-2 rounded-full bg-white/[0.05] text-white/70 hover:bg-white/[0.1] text-sm"
            >
              Xem tất cả
            </button>
          </div>
        )}
      </section>

      {/* === HOW IT WORKS - Mobile Optimized === */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">Cách sử dụng</h2>
          <p className="text-white/50 text-sm sm:text-base">3 bước đơn giản</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { step: '1', icon: faPalette, title: 'Chọn Style', desc: 'Chọn style yêu thích', color: 'from-purple-500 to-purple-600' },
            { step: '2', icon: faCamera, title: 'Upload Ảnh', desc: 'Tải ảnh chân dung', color: 'from-pink-500 to-pink-600' },
            { step: '3', icon: faWandMagicSparkles, title: 'Nhận Kết Quả', desc: 'Nhận ảnh trong 10s', color: 'from-cyan-500 to-cyan-600' },
          ].map((item) => (
            <div
              key={item.step}
              className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-0 bg-white/[0.02] border border-white/[0.06] rounded-xl sm:rounded-2xl p-4 sm:p-6"
            >
              {/* Icon */}
              <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                <FontAwesomeIcon icon={item.icon} className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>

              <div className="flex-1 sm:flex-none">
                <h3 className="font-semibold text-white text-base sm:text-lg">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </div>

              {/* Step number - mobile only */}
              <div className="sm:hidden w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-white/40 text-sm font-mono">
                {item.step}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-purple-900/60 to-pink-900/60 border border-white/[0.1] p-6 sm:p-10 lg:p-14 text-center">
          {/* Glow */}
          <div className="absolute -top-20 -left-20 w-40 sm:w-60 h-40 sm:h-60 bg-purple-500/30 rounded-full blur-[80px]" />
          <div className="absolute -bottom-20 -right-20 w-40 sm:w-60 h-40 sm:h-60 bg-pink-500/30 rounded-full blur-[80px]" />

          <div className="relative">
            <FontAwesomeIcon icon={faGift} className="w-10 h-10 sm:w-12 sm:h-12 text-purple-300 mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Nhận 5 Xu Miễn Phí!
            </h2>
            <p className="text-white/70 mb-6 sm:mb-8 max-w-lg mx-auto text-sm sm:text-lg">
              Đăng ký ngay để nhận 5 Xu trải nghiệm
            </p>
            <button className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl bg-white text-gray-900 font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faCrown} className="w-4 h-4 sm:w-5 sm:h-5" />
              Đăng Ký Miễn Phí
            </button>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faWandMagicSparkles} className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              <span className="font-bold text-sm sm:text-base bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">ZDream</span>
            </div>
            <p className="text-white/40 text-xs sm:text-sm">© 2026 ZDream.vn</p>
            <div className="flex gap-4 text-white/40">
              <a href="#" className="hover:text-white/80 text-xs sm:text-sm">Điều khoản</a>
              <a href="#" className="hover:text-white/80 text-xs sm:text-sm">Liên hệ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
