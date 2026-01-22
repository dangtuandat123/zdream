'use client'

import { useCallback, useState, useRef } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faTimes, faImage } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'

interface UploadZoneProps {
    onFileSelect: (file: File) => void
    disabled?: boolean
    maxSizeMB?: number
    acceptedTypes?: string[]
}

export function UploadZone({
    onFileSelect,
    disabled = false,
    maxSizeMB = 10,
    acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
}: UploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [preview, setPreview] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const validateFile = useCallback((file: File): boolean => {
        setError(null)

        if (!acceptedTypes.includes(file.type)) {
            setError('Chỉ hỗ trợ ảnh JPG, PNG hoặc WebP')
            return false
        }

        if (file.size > maxSizeMB * 1024 * 1024) {
            setError(`Ảnh phải nhỏ hơn ${maxSizeMB}MB`)
            return false
        }

        return true
    }, [acceptedTypes, maxSizeMB])

    const handleFile = useCallback((file: File) => {
        if (validateFile(file)) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setPreview(e.target?.result as string)
            }
            reader.readAsDataURL(file)
            onFileSelect(file)
        }
    }, [onFileSelect, validateFile])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        if (disabled) return
        const file = e.dataTransfer.files[0]
        if (file) handleFile(file)
    }, [disabled, handleFile])

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        if (!disabled) setIsDragging(true)
    }, [disabled])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }, [])

    const handleClick = () => {
        if (!disabled) inputRef.current?.click()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleFile(file)
    }

    const clearPreview = (e: React.MouseEvent) => {
        e.stopPropagation()
        setPreview(null)
        setError(null)
        if (inputRef.current) inputRef.current.value = ''
    }

    return (
        <div className="w-full">
            <div
                onClick={handleClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
          relative w-full aspect-square max-w-md mx-auto
          rounded-2xl overflow-hidden cursor-pointer
          transition-all duration-300 ease-out
          ${isDragging
                        ? 'bg-white/[0.08] backdrop-blur-[24px] border-2 border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.25)] scale-[1.02]'
                        : preview
                            ? 'bg-white/[0.03] backdrop-blur-[12px] border border-white/[0.08]'
                            : 'bg-white/[0.03] backdrop-blur-[12px] border border-white/[0.08] border-dashed hover:bg-white/[0.06] hover:border-white/[0.15]'
                    }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={acceptedTypes.join(',')}
                    onChange={handleInputChange}
                    className="hidden"
                    disabled={disabled}
                />

                {preview ? (
                    <>
                        <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Button
                                variant="secondary"
                                onClick={clearPreview}
                                className="
                  bg-white/[0.1] backdrop-blur-[12px]
                  border border-white/[0.2]
                  text-white
                  hover:bg-white/[0.2]
                  inline-flex items-center gap-2
                "
                            >
                                <FontAwesomeIcon icon={faTimes} className="w-3.5 h-3.5" />
                                Chọn ảnh khác
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        {/* Upload Icon */}
                        <div
                            className={`
                w-20 h-20 rounded-full flex items-center justify-center mb-6
                bg-gradient-to-br from-purple-500 to-pink-500
                shadow-lg shadow-purple-500/25
                ${isDragging ? 'scale-110 shadow-purple-500/40' : 'animate-float'}
                transition-all duration-300
              `}
                        >
                            <FontAwesomeIcon
                                icon={isDragging ? faCloudUploadAlt : faImage}
                                className="w-9 h-9 text-white"
                            />
                        </div>

                        <h3 className="text-xl font-semibold text-white/95 mb-2">
                            {isDragging ? 'Thả ảnh vào đây!' : 'Tải ảnh lên'}
                        </h3>

                        <p className="text-white/60 text-sm">
                            Kéo thả hoặc <span className="text-purple-400 font-medium">bấm để chọn</span>
                        </p>

                        <p className="text-white/40 text-xs mt-2">
                            JPG, PNG, WebP • Tối đa {maxSizeMB}MB
                        </p>
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <p className="text-red-400 text-center text-sm mt-4 animate-in fade-in slide-in-from-top-2 inline-flex items-center justify-center gap-2 w-full">
                    <FontAwesomeIcon icon={faTimes} className="w-3.5 h-3.5" />
                    {error}
                </p>
            )}
        </div>
    )
}
