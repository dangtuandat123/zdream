'use client'

import { useState, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes, faArrowRight, faFire, faPalette, faWandMagicSparkles, faCamera, faBolt, faRocket, faGift, faCrown } from '@fortawesome/free-solid-svg-icons'
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
      {/* Hero Section */}
      <section className="relative py-12 lg:py-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[120px] translate-x-1/3 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Biến Hình Ảnh
              </span>
              <span className="text-white/95"> Với AI</span>
            </h1>

            <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto">
              Chọn style → Upload ảnh → Nhận kết quả trong 10 giây!
              <span className="text-purple-400 font-medium"> Không cần prompt.</span>
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                  w-full h-12 pl-12 pr-12 rounded-full
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
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium
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
      </section>

      {/* Featured Style Banner */}
      {featuredStyle && activeCategory === 'all' && !searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <a
            href={`/style/${featuredStyle.id}`}
            className="
              block relative overflow-hidden rounded-2xl
              bg-gradient-to-r from-purple-900/40 to-pink-900/40
              backdrop-blur-[12px]
              border border-white/[0.1]
              group cursor-pointer
              hover:border-white/[0.2]
              transition-all duration-300
            "
          >
            <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
              {/* Image */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredStyle.thumbnailUrl}
                  alt={featuredStyle.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-500/30 inline-flex items-center gap-1">
                    <FontAwesomeIcon icon={faFire} className="w-3 h-3" />
                    HOT
                  </span>
                  <span className="text-white/50 text-sm">Style nổi bật</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{featuredStyle.name}</h3>
                <p className="text-white/60 text-sm mb-4 max-w-md">{featuredStyle.description}</p>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-shadow">
                  Thử ngay
                  <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Price */}
              <div className="text-center md:text-right">
                <p className="text-white/50 text-sm">Chỉ từ</p>
                <p className="text-3xl font-bold text-white">{featuredStyle.priceCredits}</p>
                <p className="text-purple-400 font-medium">Xu</p>
              </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-pink-500/20 rounded-full blur-[80px] pointer-events-none" />
          </a>
        </section>
      )}

      {/* Styles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white/95 flex items-center gap-2">
              <FontAwesomeIcon icon={faPalette} className="w-5 h-5 text-purple-400" />
              {activeCategory === 'all' ? 'Tất cả Styles' : CATEGORIES.find(c => c.id === activeCategory)?.label}
            </h2>
            <p className="text-white/50 text-sm mt-0.5">
              {filteredStyles.length} style{filteredStyles.length !== 1 ? 's' : ''} có sẵn
            </p>
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

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white/[0.02] backdrop-blur-[8px] border border-white/[0.06] rounded-2xl p-6 sm:p-10">
          <h2 className="text-xl font-bold text-white/95 text-center mb-8 flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faBolt} className="w-5 h-5 text-yellow-400" />
            Cách sử dụng
          </h2>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { step: '1', icon: faPalette, title: 'Chọn Style', desc: 'Duyệt và chọn style yêu thích từ bộ sưu tập', color: 'text-purple-400' },
              { step: '2', icon: faCamera, title: 'Upload Ảnh', desc: 'Tải lên ảnh chân dung của bạn', color: 'text-pink-400' },
              { step: '3', icon: faWandMagicSparkles, title: 'Nhận Kết Quả', desc: 'AI xử lý và trả kết quả trong 10 giây', color: 'text-cyan-400' },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-4 ${item.color}`}>
                  <FontAwesomeIcon icon={item.icon} className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-white/90 mb-1">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-[16px] border border-white/[0.1] p-8 sm:p-12 text-center">
          {/* Glow effects */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/30 rounded-full blur-[80px]" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-500/30 rounded-full blur-[80px]" />

          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 inline-flex items-center gap-3">
              Bắt đầu ngay hôm nay!
              <FontAwesomeIcon icon={faRocket} className="w-7 h-7 text-purple-300" />
            </h2>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              Đăng ký miễn phí và nhận <span className="text-purple-300 font-bold inline-flex items-center gap-1"><FontAwesomeIcon icon={faGift} className="w-4 h-4" /> 5 Xu</span> để trải nghiệm
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-8 py-3.5 rounded-full bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors shadow-xl inline-flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faCrown} className="w-4 h-4" />
                Đăng Ký Miễn Phí
              </button>
              <button className="px-8 py-3.5 rounded-full bg-white/[0.1] text-white font-medium border border-white/[0.2] hover:bg-white/[0.2] transition-colors">
                Xem Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
