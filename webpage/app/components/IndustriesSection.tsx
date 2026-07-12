'use client'

import { JSX } from 'react'
import { useTranslations } from 'next-intl'

const icons: Record<string, JSX.Element> = {
  telecom: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
    </svg>
  ),
  finance: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  retail: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  marketing: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
  logistics: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4zM3 5h2l2.5 9.5M5 5h14l-1.5 8H7.5" />
    </svg>
  ),
}

const industryKeys = ['telecom', 'finance', 'retail', 'marketing', 'logistics'] as const

export default function IndustriesSection() {
  const t = useTranslations('industries')

  const industries = industryKeys.map(key => ({
    id: key,
    title: t(`items.${key}.title`),
    description: t(`items.${key}.description`),
    icon: icons[key],
  }))

  return (
    <section className="py-24 bg-brand-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-green font-medium text-sm uppercase tracking-widest mb-3">{t('eyebrow')}</p>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-4">{t('heading')}</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t('subheading')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map(industry => (
            <div
              key={industry.id}
              className="p-6 bg-brand-navy rounded-xl border border-white/5 hover:border-brand-green/30 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green mb-5">
                {industry.icon}
              </div>
              <h3 className="font-heading font-semibold text-lg text-white mb-3">{industry.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
