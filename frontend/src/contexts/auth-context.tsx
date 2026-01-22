'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { api, User } from '@/lib/api'

interface AuthContextType {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
    register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>
    logout: () => Promise<void>
    refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Fetch user on mount if token exists
    useEffect(() => {
        const initAuth = async () => {
            if (api.isAuthenticated()) {
                try {
                    const response = await api.getUser()
                    if (response.success) {
                        setUser(response.data)
                    }
                } catch {
                    // Token invalid, clear it
                    api.setToken(null)
                }
            }
            setIsLoading(false)
        }
        initAuth()
    }, [])

    const login = useCallback(async (email: string, password: string) => {
        try {
            const response = await api.login(email, password)
            if (response.success) {
                setUser(response.data.user)
                return { success: true }
            }
            return { success: false, message: response.message || 'Đăng nhập thất bại' }
        } catch (error) {
            return { success: false, message: error instanceof Error ? error.message : 'Đăng nhập thất bại' }
        }
    }, [])

    const register = useCallback(async (name: string, email: string, password: string) => {
        try {
            const response = await api.register(name, email, password)
            if (response.success) {
                setUser(response.data.user)
                return { success: true }
            }
            return { success: false, message: response.message || 'Đăng ký thất bại' }
        } catch (error) {
            return { success: false, message: error instanceof Error ? error.message : 'Đăng ký thất bại' }
        }
    }, [])

    const logout = useCallback(async () => {
        await api.logout()
        setUser(null)
    }, [])

    const refreshUser = useCallback(async () => {
        if (api.isAuthenticated()) {
            try {
                const response = await api.getUser()
                if (response.success) {
                    setUser(response.data)
                }
            } catch {
                // Ignore
            }
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login,
                register,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
