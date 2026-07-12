'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

const capabilityKeys = ['dataEngineering', 'cloudSolutions', 'analytics', 'ai', 'telecom', 'appDev'] as const

export default function AboutPage() {
  const t = useTranslations('about')

  const capabilities = capabilityKeys.map(key => ({
    title: t(`capabilities.${key}.title`),
    desc: t(`capabilities.${key}.desc`),
  }))

  return (
    <div className="pt-16">
      <section className="py-24 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-brand-green font-medium text-sm uppercase tracking-widest mb-3">{t('eyebrow')}</p>
            <h1 className="font-heading font-bold text-5xl sm:text-6xl text-white mb-6">{t('heading')}</h1>
            <p className="text-xl text-gray-400 leading-relaxed">{t('intro')}</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading font-bold text-3xl text-white mb-4">{t('mission.heading')}</h2>
              <p className="text-gray-400 leading-relaxed">{t('mission.text')}</p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-3xl text-white mb-4">{t('vision.heading')}</h2>
              <p className="text-gray-400 leading-relaxed">{t('vision.text')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-white mb-4">{t('whatWeDo.heading')}</h2>
            <p className="text-gray-400 text-lg">{t('whatWeDo.subheading')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map(item => (
              <div key={item.title} className="p-6 bg-brand-navy-light rounded-xl border border-white/5">
                <h3 className="font-heading font-semibold text-lg text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-navy-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading font-bold text-4xl text-white mb-4">{t('cta.heading')}</h2>
          <p className="text-gray-400 text-lg mb-8">{t('cta.subheading')}</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-brand-green text-brand-navy font-bold text-base rounded-lg hover:bg-brand-green/90 transition-all"
          >
            {t('cta.button')}
          </Link>
        </div>
      </section>
    </div>
  )
}
