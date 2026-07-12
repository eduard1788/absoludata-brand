'use client'

import { JSX } from 'react'
import { useTranslations } from 'next-intl'

const icons: Record<string, JSX.Element> = {
  expertise: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  delivery: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  cloudNative: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  aiAutomation: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
}

const valueKeys = ['expertise', 'delivery', 'cloudNative', 'aiAutomation'] as const

export default function WhyAbsoludata() {
  const t = useTranslations('whyAbsoludata')

  const values = valueKeys.map(key => ({
    id: key,
    title: t(`items.${key}.title`),
    description: t(`items.${key}.description`),
    icon: icons[key],
  }))

  return (
    <section className="py-24 bg-brand-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-blue font-medium text-sm uppercase tracking-widest mb-3">{t('eyebrow')}</p>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-4">{t('heading')}</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t('subheading')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map(value => (
            <div
              key={value.id}
              className="flex gap-5 p-6 bg-brand-navy rounded-xl border border-white/5 hover:border-brand-blue/30 transition-all"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                {value.icon}
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
