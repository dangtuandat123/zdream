'use client'

import { useState, useEffect, useCallback } from 'react'
import { api } from '@/lib/api'
import { useAuth } from '@/contexts/auth-context'

export function useCredits() {
    const { user, isAuthenticated } = useAuth()
    const [credits, setCredits] = useState<number>(0)
    const [isLoading, setIsLoading] = useState(false)

    // Sync with user from auth context
    useEffect(() => {
        if (user) {
            setCredits(user.credits)
        }
    }, [user])

    const refreshCredits = useCallback(async () => {
        if (!isAuthenticated) return

        setIsLoading(true)
        try {
            const response = await api.getUserCredits()
            if (response.success) {
                setCredits(response.data.credits)
            }
        } catch (err) {
            console.error('Failed to fetch credits:', err)
        } finally {
            setIsLoading(false)
        }
    }, [isAuthenticated])

    return { credits, isLoading, refreshCredits }
}
