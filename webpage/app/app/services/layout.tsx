import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AWS Data Engineering, Modernization & BI Services',
  description:
    'Explore Absoludata services for AWS data pipelines, data platform modernization, system integrations, and business intelligence and analytics.',
  alternates: { canonical: '/services/' },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
