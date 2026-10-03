import Hero from '@/components/Hero'
import ServicesSection from '@/components/ServicesSection'
import WhyAbsoludata from '@/components/WhyAbsoludata'
import CTASection from '@/components/CTASection'

export const metadata = {
  title: 'Data Engineering & BI Consulting | Absoludata',
  description:
    'Solve disconnected systems, unreliable data, and reporting bottlenecks. Absoludata helps small and mid-sized businesses make better decisions with their data.',
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
