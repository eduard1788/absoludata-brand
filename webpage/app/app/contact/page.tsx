'use client'

import { useTranslations } from 'next-intl'
import CalendlyPopupLink from '@/components/CalendlyPopupLink'

export default function ContactPage() {
  const t = useTranslations('contact')

  return (
    <div className="pt-16">
      <section className="py-24 bg-brand-navy min-h-[80vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-brand-green font-medium text-sm uppercase tracking-widest mb-3">
              {t('eyebrow')}
            </p>
            <h1 className="font-heading font-bold text-5xl sm:text-6xl text-white mb-6">
              {t('heading')}
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              {t('intro')}
            </p>
            <p className="text-gray-300 leading-relaxed mb-8">
              {t('consultation')}
            </p>
            <CalendlyPopupLink
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-green text-brand-navy font-semibold text-sm rounded-lg hover:bg-brand-green/90 transition-colors"
            >
              {t('linkedinCta')}
            </CalendlyPopupLink>
          </div>
        </div>
      </section>
    </div>
  )
}
