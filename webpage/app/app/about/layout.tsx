import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Absoludata',
  description:
    'Learn about Absoludata, a consulting partner focused on AWS data engineering, platform modernization, and BI and analytics for growing businesses.',
  alternates: { canonical: '/about/' },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
