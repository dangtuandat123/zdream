'use client'

import { useState, useEffect, useCallback } from 'react'
import { api, Style } from '@/lib/api'
import { MOCK_STYLES } from '@/lib/styles-data'

// Convert API style to frontend format
function mapStyle(style: Record<string, unknown>): Style {
    return {
        id: String(style.id),
        name: style.name as string,
        description: style.description as string,
        thumbnailUrl: (style.thumbnail_url as string) || (style.thumbnailUrl as string) || '',
        priceCredits: (style.price_credits as number) || (style.priceCredits as number) || 0,
        category: style.category as string,
    }
}

export function useStyles() {
    const [styles, setStyles] = useState<Style[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchStyles = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await api.getStyles()
            if (response.success && response.data) {
                setStyles(response.data.map(s => mapStyle(s as unknown as Record<string, unknown>)))
            }
        } catch (err) {
            console.error('Failed to fetch styles from API, using mock data:', err)
            // Fallback to mock data
            setStyles(Object.values(MOCK_STYLES))
            setError(null) // Don't show error, just use mock
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchStyles()
    }, [fetchStyles])

    return { styles, isLoading, error, refetch: fetchStyles }
}

export function useStyle(id: string) {
    const [style, setStyle] = useState<Style | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchStyle = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await api.getStyle(id)
                if (response.success && response.data) {
                    setStyle(mapStyle(response.data as unknown as Record<string, unknown>))
                }
            } catch (err) {
                console.error('Failed to fetch style from API, using mock data:', err)
                // Fallback to mock data
                const mockStyle = MOCK_STYLES[id]
                if (mockStyle) {
                    setStyle(mockStyle)
                } else {
                    setError('Style không tồn tại')
                }
            } finally {
                setIsLoading(false)
            }
        }

        if (id) {
            fetchStyle()
        }
    }, [id])

    return { style, isLoading, error }
}
