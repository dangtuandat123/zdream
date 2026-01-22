'use client'

import { useState, useCallback } from 'react'
import { api, Generation } from '@/lib/api'

export function useGenerate() {
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const generate = useCallback(async (styleId: string, image: File): Promise<Generation | null> => {
        setIsGenerating(true)
        setError(null)

        try {
            const response = await api.generateImage(styleId, image)
            if (response.success) {
                return response.data
            } else {
                setError(response.message || 'Có lỗi xảy ra')
                return null
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra')
            return null
        } finally {
            setIsGenerating(false)
        }
    }, [])

    return { generate, isGenerating, error }
}

export function useGenerations() {
    const [generations, setGenerations] = useState<Generation[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)

    const fetchGenerations = useCallback(async (page = 1) => {
        setIsLoading(true)
        try {
            const response = await api.getGenerations(page)
            if (response.success) {
                setGenerations(response.data.data)
                setCurrentPage(response.data.current_page)
                setLastPage(response.data.last_page)
            }
        } catch (err) {
            console.error('Failed to fetch generations:', err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    return {
        generations,
        isLoading,
        currentPage,
        lastPage,
        fetchGenerations,
        hasMore: currentPage < lastPage
    }
}
