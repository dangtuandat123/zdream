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
      {/* === HERO SECTION - Premium Design === */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6">
                <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-white/80">Công nghệ AI tiên tiến nhất</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-white">Biến Ảnh Thường</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Thành Tác Phẩm
                </span>
              </h1>

              <p className="text-white/60 text-lg sm:text-xl max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
                Chỉ cần <span className="text-purple-400 font-semibold">3 bước đơn giản</span>:
                Chọn style, upload ảnh, nhận kết quả. Không cần viết prompt phức tạp!
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="#styles"
                  className="
                    px-8 py-4 rounded-xl
                    bg-gradient-to-r from-purple-500 to-pink-500
                    text-white font-semibold text-lg
                    shadow-lg shadow-purple-500/30
                    hover:shadow-purple-500/50 hover:scale-105
                    transition-all duration-300
                    inline-flex items-center justify-center gap-2
                  "
                >
                  <FontAwesomeIcon icon={faWandMagicSparkles} className="w-5 h-5" />
                  Bắt đầu ngay
                </Link>
                <button
                  className="
                    px-8 py-4 rounded-xl
                    bg-white/[0.05] backdrop-blur-sm
                    border border-white/[0.1]
                    text-white font-medium text-lg
                    hover:bg-white/[0.1]
                    transition-all duration-300
                    inline-flex items-center justify-center gap-2
                  "
                >
                  <FontAwesomeIcon icon={faPlay} className="w-4 h-4" />
                  Xem demo
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center lg:justify-start gap-8 mt-10 pt-10 border-t border-white/[0.05]">
                <div>
                  <p className="text-3xl font-bold text-white">8+</p>
                  <p className="text-white/50 text-sm">Styles</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-3xl font-bold text-white">10s</p>
                  <p className="text-white/50 text-sm">Xử lý</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-3xl font-bold text-white">2K</p>
                  <p className="text-white/50 text-sm">Từ</p>
                </div>
              </div>
            </div>

            {/* Right: Preview Images */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Main Image */}
                <div className="absolute top-0 right-0 w-72 h-96 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 border border-white/[0.1] transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src={allStyles[0]?.thumbnailUrl || ''}
                    alt="AI Generated"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold">{allStyles[0]?.name}</p>
                    <p className="text-white/60 text-sm">AI Generated</p>
                  </div>
                </div>

                {/* Secondary Image */}
                <div className="absolute bottom-0 left-0 w-56 h-72 rounded-2xl overflow-hidden shadow-2xl shadow-pink-500/20 border border-white/[0.1] transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src={allStyles[2]?.thumbnailUrl || ''}
                    alt="AI Generated"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Floating Badge */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50 animate-bounce">
                  <FontAwesomeIcon icon={faWandMagicSparkles} className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === FEATURED STYLE SECTION === */}
      {featuredStyle && activeCategory === 'all' && !searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="featured">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
              <FontAwesomeIcon icon={faFire} className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Style Nổi Bật</h2>
              <p className="text-white/50 text-sm">Được yêu thích nhất tuần này</p>
            </div>
          </div>

          <Link
            href={`/style/${featuredStyle.id}`}
            className="
              block relative overflow-hidden rounded-3xl
              bg-gradient-to-br from-purple-900/60 via-pink-900/40 to-purple-900/60
              border border-white/[0.1]
              group cursor-pointer
              hover:border-purple-500/50
              transition-all duration-500
            "
          >
            {/* Background Image */}
            <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500">
              <Image
                src={featuredStyle.thumbnailUrl}
                alt={featuredStyle.name}
                fill
                className="object-cover blur-sm group-hover:blur-none group-hover:scale-105 transition-all duration-700"
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/95 via-[#0a0a0f]/80 to-transparent" />

            {/* Content */}
            <div className="relative flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
              {/* Image Preview */}
              <div className="relative w-48 h-64 md:w-56 md:h-72 rounded-2xl overflow-hidden flex-shrink-0 shadow-2xl shadow-purple-500/30 border-2 border-white/[0.1] group-hover:border-purple-500/50 group-hover:scale-105 transition-all duration-500">
                <Image
                  src={featuredStyle.thumbnailUrl}
                  alt={featuredStyle.name}
                  fill
                  className="object-cover"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <FontAwesomeIcon icon={faPlay} className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Badges */}
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-lg">
                    <FontAwesomeIcon icon={faFire} className="w-3 h-3" />
                    HOT
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-white/[0.1] text-white/70 text-xs font-medium">
                    🎯 Được chọn nhiều nhất
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">{featuredStyle.name}</h3>
                <p className="text-white/60 text-lg mb-6 max-w-xl">{featuredStyle.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-3 mb-8 justify-center md:justify-start">
                  <span className="px-4 py-2 rounded-full bg-white/[0.05] text-white/70 text-sm inline-flex items-center gap-2">
                    <FontAwesomeIcon icon={faBolt} className="w-3.5 h-3.5 text-yellow-400" />
                    Xử lý nhanh 10s
                  </span>
                  <span className="px-4 py-2 rounded-full bg-white/[0.05] text-white/70 text-sm inline-flex items-center gap-2">
                    <FontAwesomeIcon icon={faStar} className="w-3.5 h-3.5 text-yellow-400" />
                    Chất lượng cao
                  </span>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-6 justify-center md:justify-start">
                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">
                    Thử ngay
                    <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Chỉ từ</p>
                    <p className="text-2xl font-bold text-white">{featuredStyle.priceCredits} <span className="text-purple-400 text-lg">Xu</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-pink-500/20 rounded-full blur-[80px] pointer-events-none" />
          </Link>
        </section>
      )}

      {/* === SEARCH & FILTER SECTION === */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="styles">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Tìm kiếm style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full h-12 pl-12 pr-12 rounded-xl
                bg-white/[0.05] backdrop-blur-[12px]
                border border-white/[0.1]
                text-white/90 placeholder:text-white/40
                focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/50
                transition-all duration-200
              "
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 flex-wrap justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  px-4 py-2.5 rounded-xl text-sm font-medium
                  inline-flex items-center gap-2
                  transition-all duration-200
                  ${activeCategory === cat.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-white/[0.05] text-white/70 hover:bg-white/[0.1] hover:text-white border border-white/[0.08]'
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faPalette} className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white/95">
              {activeCategory === 'all' ? 'Tất cả Styles' : CATEGORIES.find(c => c.id === activeCategory)?.label}
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-white/[0.1] text-white/60 text-xs">
              {filteredStyles.length}
            </span>
          </div>
        </div>

        {/* Grid */}
        {filteredStyles.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredStyles.map((style) => (
              <StyleCard key={style.id} {...style} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FontAwesomeIcon icon={faSearch} className="w-12 h-12 text-white/20 mb-4" />
            <h3 className="text-xl font-semibold text-white/80 mb-2">Không tìm thấy style</h3>
            <p className="text-white/50">Thử tìm với từ khóa khác hoặc chọn danh mục khác</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-4 px-5 py-2 rounded-full bg-white/[0.05] text-white/70 hover:bg-white/[0.1] transition-colors text-sm"
            >
              Xem tất cả
            </button>
          </div>
        )}
      </section>

      {/* === HOW IT WORKS === */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Cách sử dụng</h2>
          <p className="text-white/50">3 bước đơn giản để có ảnh đẹp</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { step: '01', icon: faPalette, title: 'Chọn Style', desc: 'Duyệt và chọn style yêu thích từ bộ sưu tập đa dạng', color: 'from-purple-500 to-purple-600' },
            { step: '02', icon: faCamera, title: 'Upload Ảnh', desc: 'Tải lên ảnh chân dung rõ nét của bạn', color: 'from-pink-500 to-pink-600' },
            { step: '03', icon: faWandMagicSparkles, title: 'Nhận Kết Quả', desc: 'AI xử lý và trả về ảnh đẹp trong 10 giây', color: 'from-cyan-500 to-cyan-600' },
          ].map((item, index) => (
            <div
              key={item.step}
              className="relative bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 text-center group hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#0a0a0f] border border-white/[0.1] text-white/40 text-sm font-mono">
                {item.step}
              </div>

              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} mb-5 mt-2 group-hover:scale-110 transition-transform duration-300`}>
                <FontAwesomeIcon icon={item.icon} className="w-7 h-7 text-white" />
              </div>

              <h3 className="font-semibold text-white text-lg mb-2">{item.title}</h3>
              <p className="text-white/50 text-sm">{item.desc}</p>

              {/* Arrow */}
              {index < 2 && (
                <div className="hidden sm:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-white/20">
                  <FontAwesomeIcon icon={faArrowRight} className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/60 to-pink-900/60 backdrop-blur-[16px] border border-white/[0.1] p-10 sm:p-14 text-center">
          {/* Glow effects */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-500/30 rounded-full blur-[100px]" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-pink-500/30 rounded-full blur-[100px]" />

          <div className="relative">
            <FontAwesomeIcon icon={faGift} className="w-12 h-12 text-purple-300 mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Nhận 5 Xu Miễn Phí!
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto text-lg">
              Đăng ký tài khoản ngay hôm nay và nhận ngay 5 Xu để trải nghiệm
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 rounded-xl bg-white text-gray-900 font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl inline-flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faCrown} className="w-5 h-5" />
                Đăng Ký Miễn Phí
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faWandMagicSparkles} className="w-5 h-5 text-purple-400" />
              <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">ZDream</span>
            </div>
            <p className="text-white/40 text-sm">© 2026 ZDream.vn - Tiệm Ảnh Kỹ Thuật Số</p>
            <div className="flex gap-4 text-white/40">
              <a href="#" className="hover:text-white/80 transition-colors text-sm">Điều khoản</a>
              <a href="#" className="hover:text-white/80 transition-colors text-sm">Liên hệ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
