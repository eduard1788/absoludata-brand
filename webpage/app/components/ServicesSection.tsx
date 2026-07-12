'use client'

import Link from 'next/link'
import { JSX } from 'react'
import { useTranslations } from 'next-intl'

const icons: Record<string, JSX.Element> = {
  'web-development': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  'data-engineering': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V7zm0 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm2 8h12" />
    </svg>
  ),
  analytics: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  applications: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  ai: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  telecommunications: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
    </svg>
  ),
}

const serviceKeys = ['dataEngineering', 'analytics', 'applications', 'ai', 'webDevelopment'] as const
const serviceIds = ['data-engineering', 'analytics', 'applications', 'ai', 'web-development']

export default function ServicesSection() {
  const t = useTranslations('servicesSection')

  const services = serviceKeys.map((key, i) => ({
    id: serviceIds[i],
    title: t(`items.${key}.title`),
    description: t(`items.${key}.description`),
    icon: icons[serviceIds[i]],
  }))

  return (
    <section className="py-24 bg-brand-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-green font-medium text-sm uppercase tracking-widest mb-3">{t('eyebrow')}</p>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-4">{t('heading')}</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t('subheading')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <div
              key={service.id}
              className="group p-6 bg-brand-navy-light rounded-xl border border-white/5 hover:border-brand-green/40 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green mb-5 group-hover:bg-brand-green/20 transition-colors">
                {service.icon}
              </div>
              <h3 className="font-heading font-semibold text-lg text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.description}</p>
              <Link
                href={`/services#${service.id}`}
                className="inline-flex items-center gap-1 text-brand-green text-sm font-medium hover:gap-2 transition-all"
              >
                {t('learnMore')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
