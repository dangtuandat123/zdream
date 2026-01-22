'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faDownload, faWandMagicSparkles, faImage, faPalette, faSpinner, faRedo, faStar } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'
import { UploadZone } from '@/components/UploadZone'
import { MOCK_STYLES } from '@/lib/styles-data'

type GenerationStatus = 'idle' | 'uploading' | 'processing' | 'completed' | 'error'

interface StylePageClientProps {
    styleId: string
}

export function StylePageClient({ styleId }: StylePageClientProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [status, setStatus] = useState<GenerationStatus>('idle')
    const [resultUrl, setResultUrl] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const style = MOCK_STYLES[styleId]

    const handleFileSelect = useCallback((file: File) => {
        setSelectedFile(file)
        setStatus('idle')
        setResultUrl(null)
        setErrorMessage(null)
    }, [])

    const handleGenerate = async () => {
        if (!selectedFile || !style) return

        setStatus('uploading')
        setErrorMessage(null)

        try {
            await new Promise(resolve => setTimeout(resolve, 1500))
            setStatus('processing')
            await new Promise(resolve => setTimeout(resolve, 3000))
            setResultUrl(style.thumbnailUrl)
            setStatus('completed')
        } catch (error) {
            setStatus('error')
            setErrorMessage(error instanceof Error ? error.message : 'Có lỗi xảy ra, vui lòng thử lại')
        }
    }

    const handleReset = () => {
        setSelectedFile(null)
        setStatus('idle')
        setResultUrl(null)
        setErrorMessage(null)
    }

    if (!style) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white/95 mb-4">Style không tồn tại</h1>
                    <Link href="/">
                        <Button className="bg-white/[0.05] border border-white/[0.1] text-white/80 hover:bg-white/[0.1] inline-flex items-center gap-2">
                            <FontAwesomeIcon icon={faArrowLeft} className="w-3.5 h-3.5" />
                            Về trang chủ
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pb-12">
            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors text-sm"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="w-3.5 h-3.5" />
                    <span>Chọn style khác</span>
                </Link>
            </div>

            {/* Style Header */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
                <div
                    className="
                        inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full mb-4
                        bg-gradient-to-r from-purple-500/20 to-pink-500/20
                        border border-purple-500/30
                        text-purple-300 font-semibold text-sm
                    "
                >
                    <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-yellow-400" />
                    {style.priceCredits} Xu
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white/95 mb-3">
                    {style.name}
                </h1>
                <p className="text-white/60 max-w-md mx-auto">
                    {style.description}
                </p>
            </section>

            {/* Main Content */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                    {/* Left: Upload Zone / Processing / Result */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-white/95 flex items-center gap-2">
                            <FontAwesomeIcon
                                icon={status === 'completed' ? faWandMagicSparkles : faImage}
                                className={`w-4 h-4 ${status === 'completed' ? 'text-purple-400' : 'text-white/60'}`}
                            />
                            {status === 'completed' ? 'Kết quả' : 'Ảnh của bạn'}
                        </h2>

                        {status === 'completed' && resultUrl ? (
                            <div
                                className="
                                    relative aspect-square rounded-2xl overflow-hidden
                                    bg-white/[0.03] backdrop-blur-[12px]
                                    border border-white/[0.08]
                                "
                            >
                                <Image
                                    src={resultUrl}
                                    alt="Generated result"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : status === 'processing' || status === 'uploading' ? (
                            <div
                                className="
                                    aspect-square rounded-2xl
                                    bg-white/[0.03] backdrop-blur-[12px]
                                    border border-white/[0.08]
                                    flex flex-col items-center justify-center
                                "
                            >
                                <div
                                    className="
                                        w-20 h-20 rounded-full mb-6
                                        bg-gradient-to-br from-purple-500 to-pink-500
                                        shadow-lg shadow-purple-500/30
                                        flex items-center justify-center
                                    "
                                >
                                    <FontAwesomeIcon
                                        icon={faSpinner}
                                        className="w-8 h-8 text-white animate-spin"
                                    />
                                </div>
                                <p className="text-lg font-medium text-white/95 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faWandMagicSparkles} className="w-4 h-4 text-purple-400" />
                                    {status === 'uploading' ? 'Đang tải lên...' : 'AI đang biến hình...'}
                                </p>
                                <p className="text-white/50 text-sm mt-2">
                                    Chờ chút nhé, khoảng 10-30 giây
                                </p>
                            </div>
                        ) : (
                            <UploadZone
                                onFileSelect={handleFileSelect}
                                disabled={status !== 'idle'}
                            />
                        )}

                        {/* Error Message */}
                        {errorMessage && (
                            <p className="text-red-400 text-center text-sm">
                                ⚠️ {errorMessage}
                            </p>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3">
                            {status === 'idle' && selectedFile && (
                                <Button
                                    onClick={handleGenerate}
                                    className="
                                        w-full py-6 rounded-xl text-lg
                                        bg-gradient-to-r from-purple-500 to-pink-500
                                        hover:from-purple-400 hover:to-pink-400
                                        text-white font-semibold
                                        shadow-lg shadow-purple-500/25
                                        hover:shadow-purple-500/40
                                        transition-all duration-200
                                        inline-flex items-center justify-center gap-2
                                    "
                                >
                                    <FontAwesomeIcon icon={faWandMagicSparkles} className="w-5 h-5" />
                                    Tạo ngay ({style.priceCredits} Xu)
                                </Button>
                            )}

                            {status === 'completed' && (
                                <>
                                    <Button
                                        asChild
                                        className="
                                            w-full py-6 rounded-xl text-lg
                                            bg-gradient-to-r from-purple-500 to-pink-500
                                            hover:from-purple-400 hover:to-pink-400
                                            text-white font-semibold
                                            shadow-lg shadow-purple-500/25
                                        "
                                    >
                                        <a href={resultUrl || '#'} download="zdream-result.jpg" className="inline-flex items-center justify-center gap-2">
                                            <FontAwesomeIcon icon={faDownload} className="w-5 h-5" />
                                            Tải ảnh về
                                        </a>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={handleReset}
                                        className="
                                            w-full py-5 rounded-xl
                                            bg-white/[0.03] backdrop-blur-[12px]
                                            border border-white/[0.1]
                                            text-white/80 hover:text-white
                                            hover:bg-white/[0.06]
                                            inline-flex items-center justify-center gap-2
                                        "
                                    >
                                        <FontAwesomeIcon icon={faRedo} className="w-4 h-4" />
                                        Tạo ảnh khác
                                    </Button>
                                </>
                            )}

                            {status === 'error' && (
                                <Button
                                    variant="outline"
                                    onClick={handleReset}
                                    className="
                                        w-full py-5 rounded-xl
                                        bg-white/[0.03] border border-white/[0.1]
                                        text-white/80 hover:bg-white/[0.06]
                                        inline-flex items-center justify-center gap-2
                                    "
                                >
                                    <FontAwesomeIcon icon={faRedo} className="w-4 h-4" />
                                    Thử lại
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Right: Style Preview */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-white/95 flex items-center gap-2">
                            <FontAwesomeIcon icon={faPalette} className="w-4 h-4 text-purple-400" />
                            Style mẫu
                        </h2>
                        <div
                            className="
                                relative aspect-[3/4] rounded-2xl overflow-hidden
                                bg-white/[0.03] backdrop-blur-[12px]
                                border border-white/[0.08]
                            "
                        >
                            <Image
                                src={style.thumbnailUrl}
                                alt={style.name}
                                fill
                                className="object-cover"
                            />

                            {/* Style Info Overlay */}
                            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white/60 text-sm">
                                    Kết quả của bạn sẽ có phong cách tương tự
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
