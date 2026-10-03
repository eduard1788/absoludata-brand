import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Discuss Your Data Project',
  description:
    'Book a free 30-minute introductory conversation about AWS data engineering or BI and analytics with Absoludata.',
  alternates: { canonical: '/contact/' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
