import { StylePageClient } from '@/components/StylePageClient'
import { MOCK_STYLES } from '@/lib/styles-data'

// Required for Static Export - pre-generate all style pages at build time
export function generateStaticParams() {
    return Object.keys(MOCK_STYLES).map((id) => ({ id }))
}

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function StylePage({ params }: PageProps) {
    const { id } = await params
    return <StylePageClient styleId={id} />
}
