import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LocaleProvider } from '@/components/LocaleProvider'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://absoludata.com'),
  title: {
    default: 'AWS Data Engineering & BI Consulting | Absoludata',
    template: '%s | Absoludata',
  },
  description:
    'Absoludata helps small and mid-sized businesses build reliable AWS data platforms, modernize data infrastructure, and improve BI and analytics.',
  openGraph: {
    type: 'website',
    url: 'https://absoludata.com/',
    siteName: 'Absoludata',
    title: 'AWS Data Engineering & BI Consulting | Absoludata',
    description:
      'AWS data engineering, data platform modernization, integrations, and BI and analytics for small and mid-sized businesses.',
    images: [{ url: '/logo.webp', alt: 'Absoludata' }],
  },
  twitter: {
    card: 'summary',
    title: 'AWS Data Engineering & BI Consulting | Absoludata',
    description:
      'AWS data engineering, data platform modernization, integrations, and BI and analytics for small and mid-sized businesses.',
    images: ['/logo.webp'],
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans bg-brand-navy text-white antialiased">
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Absoludata',
              url: 'https://absoludata.com/',
              logo: 'https://absoludata.com/logo.webp',
              sameAs: ['https://www.linkedin.com/company/absoludata/'],
            }),
          }}
        />
        <LocaleProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  )
}
