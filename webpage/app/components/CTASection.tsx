'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function CTASection() {
  const t = useTranslations('cta')

  return (
    <section className="py-24 bg-brand-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-green/5 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-green/40 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-4">
          {t('heading')}
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          {t('subheading')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="px-8 py-4 bg-brand-green text-brand-navy font-bold text-base rounded-lg hover:bg-brand-green/90 transition-all hover:shadow-lg hover:shadow-brand-green/20"
          >
            {t('scheduleCta')}
          </Link>
          <Link
            href="/services"
            className="px-8 py-4 border border-white/20 text-white font-medium text-base rounded-lg hover:bg-white/5 transition-all"
          >
            {t('viewServices')}
          </Link>
        </div>
      </div>
    </section>
  )
}
