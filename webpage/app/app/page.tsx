import Hero from '@/components/Hero'
import ServicesSection from '@/components/ServicesSection'
import WhyAbsoludata from '@/components/WhyAbsoludata'
import CTASection from '@/components/CTASection'

export const metadata = {
  title: 'AWS Data Engineering, Analytics & Modernization | Absoludata',
  description:
    'Absoludata helps small and mid-sized businesses build reliable AWS data platforms, modernize data infrastructure, and turn trusted data into useful BI and analytics.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <WhyAbsoludata />
      <CTASection />
    </>
  )
}
