'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-brand-navy">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#38BDF8 1px, transparent 1px), linear-gradient(90deg, #38BDF8 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
          {t('badge')}
        </div>

        <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight text-white mb-6">
          {t('title')}{' '}
          <span className="text-brand-green">{t('titleHighlight')}</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          {t('subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
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
            {t('exploreServices')}
          </Link>
          <Link
            href="#success-stories"
            className="px-8 py-4 border border-white/20 text-white font-medium text-base rounded-lg hover:bg-white/5 transition-all"
          >
            {t('viewSuccessStories')}
          </Link>
        </div>
      </div>
    </section>
  )
}
