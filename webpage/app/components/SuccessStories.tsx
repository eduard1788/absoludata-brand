'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { caseStudyKeys, caseStudySlugs, caseStudyCardImages } from '@/lib/caseStudies'

type Stat = { value: string; label: string }

export default function SuccessStories() {
  const t = useTranslations('successStories')

  const cases = caseStudyKeys.map(key => ({
    id: key,
    slug: caseStudySlugs[key],
    client: t(`items.${key}.client`),
    title: t(`items.${key}.title`),
    description: t(`items.${key}.description`),
    stats: t.raw(`items.${key}.stats`) as Stat[],
    image: caseStudyCardImages[key],
  }))

  return (
    <section id="success-stories" className="py-24 bg-brand-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-green font-medium text-sm uppercase tracking-widest mb-3">{t('eyebrow')}</p>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-4">{t('heading')}</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t('subheading')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cases.map(item => (
            <div
              key={item.id}
              className="group flex flex-col bg-brand-navy-light rounded-xl border border-white/5 hover:border-brand-green/30 transition-all overflow-hidden"
            >
              <div className="relative">
                <div className="flex items-center gap-1.5 px-4 py-3 bg-brand-navy border-b border-white/5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={`${item.title} — illustrative preview`}
                  className="w-full h-44 object-cover"
                />
              </div>

              <div className="flex flex-col flex-1 p-6">
                <p className="text-brand-green text-xs font-semibold uppercase tracking-widest mb-2">
                  {item.client}
                </p>
                <h3 className="font-heading font-semibold text-lg text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{item.description}</p>

                <div className="grid grid-cols-3 gap-2 pt-5 mb-6 border-t border-white/5">
                  {item.stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className="font-heading font-bold text-lg sm:text-xl text-white">{stat.value}</p>
                      <p className="text-gray-500 text-[11px] leading-tight mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/success-stories/${item.slug}`}
                  className="mt-auto inline-flex items-center gap-1 text-brand-green text-sm font-medium hover:gap-2 transition-all"
                >
                  {t('readCase')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
