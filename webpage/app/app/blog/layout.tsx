import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data Engineering & Analytics Insights',
  description:
    'Practical perspectives on AWS data engineering, data platforms, business intelligence, and analytics for growing businesses.',
  alternates: { canonical: '/blog/' },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
