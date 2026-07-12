'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { caseStudyKeyFromSlug, caseStudyHeroImages } from '@/lib/caseStudies'

type Stat = { value: string; label: string }

export default function CaseStudyContent({ slug }: { slug: string }) {
  const key = caseStudyKeyFromSlug(slug)

  if (!key) {
    notFound()
  }

  const t = useTranslations('successStories')

  const client = t(`items.${key}.client`)
  const title = t(`items.${key}.title`)
  const tagline = t(`items.${key}.tagline`)
  const overview = t(`items.${key}.overview`)
  const challenge = t(`items.${key}.challenge`)
  const approach = t(`items.${key}.approach`)
  const approachBullets = t.raw(`items.${key}.approachBullets`) as string[]
  const results = t(`items.${key}.results`)
  const technologies = t.raw(`items.${key}.technologies`) as string[]
  const testimonialQuote = t(`items.${key}.testimonial.quote`)
  const testimonialRole = t(`items.${key}.testimonial.role`)
  const stats = t.raw(`items.${key}.stats`) as Stat[]
  const heroImage = caseStudyHeroImages[key]

  return (
    <div className="pt-16">
      <section className="py-20 bg-brand-navy">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#success-stories"
            className="inline-flex items-center gap-2 text-gray-400 text-sm font-medium hover:text-brand-green transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('backToStories')}
          </Link>

          <p className="text-brand-green font-medium text-sm uppercase tracking-widest mb-3">{client}</p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-4 max-w-3xl">{title}</h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mb-10">{tagline}</p>

          <div className="rounded-xl border border-white/5 overflow-hidden mb-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImage} alt={`${title} — platform overview`} className="w-full h-auto" />
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-2xl">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-heading font-bold text-2xl sm:text-3xl text-white">{stat.value}</p>
                <p className="text-gray-500 text-xs sm:text-sm leading-tight mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-navy-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-300 leading-relaxed">{overview}</p>
        </div>
      </section>

      <section className="py-20 bg-brand-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">{t('challengeLabel')}</h2>
          <p className="text-gray-400 leading-relaxed">{challenge}</p>
        </div>
      </section>

      <section className="py-20 bg-brand-navy-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">{t('approachLabel')}</h2>
          <p className="text-gray-400 leading-relaxed mb-8">{approach}</p>

          <ul className="flex flex-col gap-3 mb-10">
            {approachBullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
                {bullet}
              </li>
            ))}
          </ul>

          <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wide mb-3">
            {t('technologiesLabel')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {technologies.map(tech => (
              <span
                key={tech}
                className="px-3 py-1 bg-brand-navy rounded-md text-xs text-gray-400 border border-white/5 font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">{t('resultsLabel')}</h2>
          <p className="text-gray-400 leading-relaxed">{results}</p>
        </div>
      </section>

      <section className="py-20 bg-brand-navy-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pl-8 border-l-2 border-brand-green/40">
            <svg className="w-8 h-8 text-brand-green/30 absolute -left-4 -top-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4V3h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983V3h9.983z" />
            </svg>
            <p className="text-xl sm:text-2xl text-white font-heading font-medium leading-snug mb-4">
              {testimonialQuote}
            </p>
            <p className="text-gray-500 text-sm">{testimonialRole}</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading font-bold text-4xl text-white mb-4">{t('ctaHeading')}</h2>
          <p className="text-gray-400 text-lg mb-8">{t('ctaSubheading')}</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-brand-green text-brand-navy font-bold text-base rounded-lg hover:bg-brand-green/90 transition-all"
          >
            {t('ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  )
}
