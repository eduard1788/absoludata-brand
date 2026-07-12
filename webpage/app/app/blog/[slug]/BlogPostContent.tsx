'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { blogPostKeyFromSlug, blogPostCoverImages, blogPostCaseStudyLink } from '@/lib/blogPosts'

type Section = { heading: string; text: string }

export default function BlogPostContent({ slug }: { slug: string }) {
  const key = blogPostKeyFromSlug(slug)

  if (!key) {
    notFound()
  }

  const t = useTranslations('blog')

  const category = t(`items.${key}.category`)
  const date = t(`items.${key}.date`)
  const readTime = t(`items.${key}.readTime`)
  const author = t(`items.${key}.author`)
  const title = t(`items.${key}.title`)
  const intro = t(`items.${key}.intro`)
  const sections = t.raw(`items.${key}.sections`) as Section[]
  const closing = t(`items.${key}.closing`)
  const coverImage = blogPostCoverImages[key]
  const caseStudyLink = blogPostCaseStudyLink[key]

  return (
    <div className="pt-16">
      <section className="py-20 bg-brand-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 text-sm font-medium hover:text-brand-green transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('backToBlog')}
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-brand-green text-xs font-semibold uppercase tracking-widest">{category}</span>
            <span className="text-gray-600 text-xs">&bull;</span>
            <span className="text-gray-500 text-xs">{date}</span>
            <span className="text-gray-600 text-xs">&bull;</span>
            <span className="text-gray-500 text-xs">{readTime}</span>
          </div>

          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-6">{title}</h1>
          <p className="text-gray-500 text-sm mb-10">{author}</p>

          <div className="rounded-xl border border-white/5 overflow-hidden mb-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverImage} alt={`${title} — cover illustration`} className="w-full h-auto" />
          </div>

          <p className="text-lg text-gray-300 leading-relaxed mb-4">{intro}</p>
        </div>
      </section>

      <section className="py-4 bg-brand-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="font-heading font-semibold text-2xl text-white mb-3">{section.heading}</h2>
              <p className="text-gray-400 leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-brand-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-300 leading-relaxed mb-8">{closing}</p>

          {caseStudyLink && (
            <Link
              href={caseStudyLink}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy-light border border-brand-green/30 text-brand-green font-semibold text-sm rounded-lg hover:bg-brand-green/10 transition-all"
            >
              {t('readFullCaseStudy')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
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
