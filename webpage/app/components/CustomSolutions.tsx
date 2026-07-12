'use client'

import { useTranslations } from 'next-intl'

const solutionKeys = ['telecomReports', 'logisticsRouting'] as const

const images: Record<string, string> = {
  telecomReports: '/solutions/telecom-ai-report.svg',
  logisticsRouting: '/solutions/logistics-route.svg',
}

export default function CustomSolutions() {
  const t = useTranslations('customSolutions')

  const solutions = solutionKeys.map(key => ({
    id: key,
    tag: t(`items.${key}.tag`),
    title: t(`items.${key}.title`),
    challenge: t(`items.${key}.challenge`),
    solution: t(`items.${key}.solution`),
    result: t(`items.${key}.result`),
    image: images[key],
  }))

  return (
    <section className="py-24 bg-brand-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-green font-medium text-sm uppercase tracking-widest mb-3">{t('eyebrow')}</p>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-4">{t('heading')}</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t('subheading')}</p>
        </div>

        <div className="flex flex-col gap-8">
          {solutions.map((item, i) => (
            <div
              key={item.id}
              className={`flex flex-col ${
                i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } bg-brand-navy-light rounded-xl border border-white/5 hover:border-brand-green/20 transition-all overflow-hidden`}
            >
              <div className="lg:w-2/5 flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={`${item.title} — illustration`}
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>

              <div className="flex-1 p-8 sm:p-10 flex flex-col justify-center">
                <p className="text-brand-green text-xs font-semibold uppercase tracking-widest mb-3">{item.tag}</p>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-6">{item.title}</h3>

                <div className="flex flex-col gap-4 mb-6">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    <span className="text-white font-semibold">{t('challengeLabel')}: </span>
                    {item.challenge}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    <span className="text-white font-semibold">{t('solutionLabel')}: </span>
                    {item.solution}
                  </p>
                </div>

                <div className="flex items-start gap-3 px-4 py-3 bg-brand-navy rounded-lg border border-brand-green/20">
                  <svg className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <span className="text-brand-green font-semibold">{t('resultLabel')}: </span>
                    {item.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
