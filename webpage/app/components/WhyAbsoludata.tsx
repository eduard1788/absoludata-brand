'use client'

import { JSX } from 'react'
import { useTranslations } from 'next-intl'

const icons: Record<string, JSX.Element> = {
  discover: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M18 11a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  design: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11 19l-4 1 1-4 9.414-9.414z" />
    </svg>
  ),
  implement: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  grow: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 17l6-6 4 4 8-8m0 0h-5m5 0v5" />
    </svg>
  ),
}

const stepKeys = ['discover', 'design', 'implement'] as const

export default function WhyAbsoludata() {
  const t = useTranslations('whyAbsoludata')

  const steps = stepKeys.map((key, i) => ({
    id: key,
    number: i + 1,
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

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />

          {steps.map(step => (
            <div key={step.id} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 w-12 h-12 rounded-full bg-brand-navy border-2 border-brand-blue/40 flex items-center justify-center text-brand-blue font-heading font-bold mb-5">
                {step.number}
              </div>
              <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-4">
                {step.icon}
              </div>
              <h3 className="font-heading font-semibold text-lg text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
