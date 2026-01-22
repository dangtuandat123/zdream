'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faStar, faBolt, faFire } from '@fortawesome/free-solid-svg-icons'

interface StyleCardProps {
    id: string
    name: string
    thumbnailUrl: string
    priceCredits: number
    description?: string
}

export function StyleCard({ id, name, thumbnailUrl, priceCredits, description }: StyleCardProps) {
    const isHot = ['1', '3', '5', '7'].includes(id) // Mock: some styles are hot
    const isNew = ['1', '4', '5'].includes(id) // Mock: some styles are new

    return (
        <Link href={`/style/${id}`} className="group block h-full">
            <div
                className="
          relative overflow-hidden h-full
          bg-gradient-to-b from-white/[0.05] to-white/[0.02]
          backdrop-blur-[8px]
          border border-white/[0.08]
          rounded-2xl sm:rounded-3xl
          transition-all duration-500 ease-out
          hover:border-purple-500/30
          hover:shadow-[0_20px_60px_rgba(168,85,247,0.15)]
          hover:-translate-y-2
          cursor-pointer
          flex flex-col
        "
            >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
                    <Image
                        src={thumbnailUrl}
                        alt={name}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Top Badges */}
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 flex items-start justify-between">
                        {/* Status Badge */}
                        <div className="flex flex-col gap-1">
                            {isHot && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] sm:text-xs font-bold shadow-lg">
                                    <FontAwesomeIcon icon={faFire} className="w-2.5 h-2.5" />
                                    HOT
                                </span>
                            )}
                            {isNew && !isHot && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[10px] sm:text-xs font-bold shadow-lg">
                                    <FontAwesomeIcon icon={faBolt} className="w-2.5 h-2.5" />
                                    MỚI
                                </span>
                            )}
                        </div>

                        {/* Price Badge */}
                        <div
                            className="
                px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full
                bg-black/60 backdrop-blur-md
                border border-white/[0.15]
                shadow-lg
              "
                        >
                            <span className="text-white font-bold text-xs sm:text-sm flex items-center gap-1">
                                <FontAwesomeIcon icon={faStar} className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400" />
                                {priceCredits}
                            </span>
                        </div>
                    </div>

                    {/* Hover Action Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <div className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm shadow-xl shadow-purple-500/30 flex items-center gap-2">
                                <span>Thử ngay</span>
                                <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Gradient Info - Shows on mobile */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 sm:hidden">
                        <h3 className="font-bold text-white text-sm line-clamp-1">{name}</h3>
                    </div>
                </div>

                {/* Card Footer - Desktop */}
                <div className="hidden sm:flex flex-col flex-1 p-4">
                    <h3 className="font-bold text-white text-base lg:text-lg line-clamp-1 group-hover:text-purple-300 transition-colors duration-300">
                        {name}
                    </h3>

                    {description && (
                        <p className="text-white/40 text-sm mt-1.5 line-clamp-2 flex-1">
                            {description}
                        </p>
                    )}

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.05]">
                        <div className="flex items-center gap-1.5 text-white/50 text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            Sẵn sàng
                        </div>
                        <div className="flex items-center gap-1 text-purple-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Xem chi tiết
                            <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                        </div>
                    </div>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </div>
            </div>
        </Link>
    )
}
