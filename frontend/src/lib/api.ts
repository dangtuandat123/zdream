// API configuration and helper functions

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export interface Style {
    id: string
    name: string
    description: string
    thumbnailUrl: string
    priceCredits: number
}

export interface Generation {
    id: string
    styleId: string
    originalImageUrl: string
    resultImageUrl: string | null
    status: 'pending' | 'processing' | 'completed' | 'failed'
    createdAt: string
}

export interface User {
    id: string
    name: string
    email: string
    credits: number
}

// API Client
class ApiClient {
    private baseUrl: string
    private token: string | null = null

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    setToken(token: string) {
        this.token = token
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

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Request failed' }))
            throw new Error(error.message || 'Request failed')
        }

        return response.json()
    }

    // Styles
    async getStyles(): Promise<{ data: Style[] }> {
        return this.request('/styles')
    }

    async getStyle(id: string): Promise<{ data: Style }> {
        return this.request(`/styles/${id}`)
    }

    // Generation
    async generateImage(styleId: string, image: File): Promise<{ data: Generation }> {
        const formData = new FormData()
        formData.append('style_id', styleId)
        formData.append('image', image)

        return this.request('/generate', {
            method: 'POST',
            body: formData,
        })
    }

    async getGeneration(id: string): Promise<{ data: Generation }> {
        return this.request(`/generations/${id}`)
    }

    // User
    async getUser(): Promise<{ data: User }> {
        return this.request('/user')
    }

    async getUserCredits(): Promise<{ data: { credits: number } }> {
        return this.request('/user/credits')
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
