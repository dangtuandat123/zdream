// API configuration and helper functions

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
const TOKEN_KEY = 'zdream_token'

export interface Style {
    id: string
    name: string
    description: string
    thumbnailUrl: string
    priceCredits: number
    category?: string
}

export interface Generation {
    id: string
    styleId: string
    styleName?: string
    originalImageUrl: string
    resultImageUrl: string | null
    status: 'pending' | 'processing' | 'completed' | 'failed'
    creditsUsed: number
    createdAt: string
}

export interface User {
    id: string
    name: string
    email: string
    credits: number
    avatar?: string | null
}

export interface Transaction {
    id: string
    type: 'topup' | 'usage' | 'refund' | 'bonus'
    amount: number
    credits: number
    description: string
    createdAt: string
}

export interface AuthResponse {
    success: boolean
    data: {
        user: User
        token: string
    }
    message?: string
}

// API Client
class ApiClient {
    private baseUrl: string
    private token: string | null = null

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
        // Load token from localStorage on init
        if (typeof window !== 'undefined') {
            this.token = localStorage.getItem(TOKEN_KEY)
        }
    }

    setToken(token: string | null) {
        this.token = token
        if (typeof window !== 'undefined') {
            if (token) {
                localStorage.setItem(TOKEN_KEY, token)
            } else {
                localStorage.removeItem(TOKEN_KEY)
            }
        }
    }

    getToken(): string | null {
        return this.token
    }

    isAuthenticated(): boolean {
        return !!this.token
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`

        const headers: HeadersInit = {
            'Accept': 'application/json',
            ...(options.headers || {}),
        }

        if (this.token) {
            (headers as Record<string, string>)['Authorization'] = `Bearer ${this.token}`
        }

        // Don't set Content-Type for FormData
        if (!(options.body instanceof FormData)) {
            (headers as Record<string, string>)['Content-Type'] = 'application/json'
        }

        const response = await fetch(url, {
            ...options,
            headers,
        })

        // Handle 401 Unauthorized
        if (response.status === 401) {
            this.setToken(null)
            if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                window.location.href = '/login'
            }
            throw new Error('Phiên đăng nhập hết hạn')
        }

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Request failed' }))
            throw new Error(error.message || 'Request failed')
        }

        return response.json()
    }

    // ========== AUTH ==========
    async login(email: string, password: string): Promise<AuthResponse> {
        const response = await this.request<AuthResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        })
        if (response.success && response.data.token) {
            this.setToken(response.data.token)
        }
        return response
    }

    async register(name: string, email: string, password: string): Promise<AuthResponse> {
        const response = await this.request<AuthResponse>('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, password_confirmation: password }),
        })
        if (response.success && response.data.token) {
            this.setToken(response.data.token)
        }
        return response
    }

    async logout(): Promise<void> {
        try {
            await this.request('/auth/logout', { method: 'POST' })
        } catch {
            // Ignore errors on logout
        }
        this.setToken(null)
    }

    // ========== STYLES ==========
    async getStyles(): Promise<{ success: boolean; data: Style[] }> {
        return this.request('/styles')
    }

    async getStyle(id: string): Promise<{ success: boolean; data: Style }> {
        return this.request(`/styles/${id}`)
    }

    // ========== GENERATION ==========
    async generateImage(styleId: string, image: File): Promise<{ success: boolean; data: Generation; message?: string }> {
        const formData = new FormData()
        formData.append('style_id', styleId)
        formData.append('image', image)

        return this.request('/generate', {
            method: 'POST',
            body: formData,
        })
    }

    async getGeneration(id: string): Promise<{ success: boolean; data: Generation }> {
        return this.request(`/generations/${id}`)
    }

    async getGenerations(page = 1): Promise<{ success: boolean; data: { data: Generation[]; current_page: number; last_page: number } }> {
        return this.request(`/generations?page=${page}`)
    }

    // ========== USER ==========
    async getUser(): Promise<{ success: boolean; data: User }> {
        return this.request('/user')
    }

    async getUserCredits(): Promise<{ success: boolean; data: { credits: number } }> {
        return this.request('/user/credits')
    }

    async getTransactions(page = 1): Promise<{ success: boolean; data: { data: Transaction[]; current_page: number; last_page: number } }> {
        return this.request(`/user/transactions?page=${page}`)
    }
}

export const api = new ApiClient(API_BASE_URL)

// Helper to poll generation status
export async function pollGenerationStatus(
    generationId: string,
    onUpdate: (generation: Generation) => void,
    maxAttempts = 60,
    intervalMs = 2000
): Promise<Generation> {
    let attempts = 0

    while (attempts < maxAttempts) {
        const { data: generation } = await api.getGeneration(generationId)
        onUpdate(generation)

        if (generation.status === 'completed' || generation.status === 'failed') {
            return generation
        }

        await new Promise(resolve => setTimeout(resolve, intervalMs))
        attempts++
    }

    throw new Error('Generation timed out')
}

