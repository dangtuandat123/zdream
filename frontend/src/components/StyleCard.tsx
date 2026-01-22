'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCircle, faCrown, faStar } from '@fortawesome/free-solid-svg-icons'

interface StyleCardProps {
    id: string
    name: string
    thumbnailUrl: string
    priceCredits: number
    description?: string
}

export function StyleCard({ id, name, thumbnailUrl, priceCredits, description }: StyleCardProps) {
    return (
        <Link href={`/style/${id}`} className="group block h-full">
            <div
                className="
          relative overflow-hidden h-full
          bg-white/[0.03] backdrop-blur-[12px] saturate-[180%]
          border border-white/[0.08]
          rounded-2xl
          transition-all duration-300 ease-out
          hover:bg-white/[0.06] hover:border-white/[0.12]
          hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]
          hover:-translate-y-1
          cursor-pointer
          flex flex-col
        "
            >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-2xl flex-shrink-0">
                    <Image
                        src={thumbnailUrl}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Price Badge */}
                    <div
                        className="
              absolute top-2.5 right-2.5
              px-2.5 py-1 rounded-full
              bg-black/50 backdrop-blur-[8px]
              border border-white/[0.15]
              text-white font-bold text-xs
              inline-flex items-center gap-1
            "
                    >
                        <FontAwesomeIcon icon={faStar} className="w-2.5 h-2.5 text-yellow-400" />
                        {priceCredits} Xu
                    </div>

                    {/* Quick Action Button on Hover */}
                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-sm">
                            <span>Thử ngay</span>
                            <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                        <h3 className="font-semibold text-white/95 text-sm sm:text-base line-clamp-1 group-hover:text-white transition-colors">
                            {name}
                        </h3>
                        {description && (
                            <p className="text-white/40 text-xs sm:text-sm mt-1 line-clamp-2">
                                {description}
                            </p>
                        )}
                    </div>

                    {/* Footer Info */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.05]">
                        <span className="text-white/40 text-xs flex items-center gap-1.5">
                            <FontAwesomeIcon icon={faCircle} className="w-1.5 h-1.5 text-green-500" />
                            Sẵn sàng
                        </span>
                        {priceCredits >= 4 && (
                            <span className="text-purple-400 text-xs font-medium inline-flex items-center gap-1">
                                <FontAwesomeIcon icon={faCrown} className="w-3 h-3" />
                                Premium
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}
