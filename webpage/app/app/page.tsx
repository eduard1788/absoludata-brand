import Hero from '@/components/Hero'
import ServicesSection from '@/components/ServicesSection'
import WhyAbsoludata from '@/components/WhyAbsoludata'
import CustomSolutions from '@/components/CustomSolutions'
import IndustriesSection from '@/components/IndustriesSection'
import SuccessStories from '@/components/SuccessStories'
import Testimonials from '@/components/Testimonials'
import CTASection from '@/components/CTASection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <WhyAbsoludata />
      <CustomSolutions />
      <IndustriesSection />
      <SuccessStories />
      <Testimonials />
      <CTASection />
    </>
  )
}
