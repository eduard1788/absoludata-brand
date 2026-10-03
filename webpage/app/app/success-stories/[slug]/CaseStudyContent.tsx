'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { caseStudyKeyFromSlug } from '@/lib/caseStudies'
import CalendlyPopupLink from '@/components/CalendlyPopupLink'

type ScenarioKey = 'telecomChurn' | 'retailForecasting' | 'financeAutomation'

export default function CaseStudyContent({ slug }: { slug: string }) {
  const key = caseStudyKeyFromSlug(slug)

  if (!key) {
    notFound()
  }

  const t = useTranslations('successStories')
  const titles: Record<ScenarioKey, string> = {
    telecomChurn: t('scenarioTitles.telecomChurn'),
    retailForecasting: t('scenarioTitles.retailForecasting'),
    financeAutomation: t('scenarioTitles.financeAutomation'),
  }

  return (
    <div className="pt-16">
      <section className="py-24 bg-brand-navy min-h-[70vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services/"
            className="inline-flex items-center gap-2 text-gray-400 text-sm font-medium hover:text-brand-green transition-colors mb-8"
          >
            {t('backToServices')}
          </Link>
          <p className="text-brand-green font-medium text-sm uppercase tracking-widest mb-3">
            {t('scenarioLabel')}
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-6">
            {titles[key as ScenarioKey]}
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            {t('scenarioDisclaimer')}
          </p>
          <CalendlyPopupLink
            className="inline-flex items-center justify-center px-6 py-3 bg-brand-green text-brand-navy font-semibold text-sm rounded-lg hover:bg-brand-green/90 transition-colors"
          >
            {t('ctaButton')}
          </CalendlyPopupLink>
        </div>
      </section>
    </div>
  )
}
