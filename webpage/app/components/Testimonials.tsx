'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

const testimonialKeys = ['sample1', 'sample2', 'sample3'] as const

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1 text-brand-green">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4"
          fill={i < count ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.116.483-.412.863-.833.6l-4.725-2.885a.563.563 0 00-.586 0L6.98 21.43c-.421.263-.949-.117-.833-.6l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602c-.38-.325-.178-.948.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"
          />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const t = useTranslations('testimonials')
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)

  const testimonials = testimonialKeys.map(key => ({
    id: key,
    quote: t(`items.${key}.quote`),
    name: t(`items.${key}.name`),
    role: t(`items.${key}.role`),
  }))

  return (
    <section className="py-24 bg-brand-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-blue font-medium text-sm uppercase tracking-widest mb-3">{t('eyebrow')}</p>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-4">{t('heading')}</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t('subheading')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map(item => (
            <div
              key={item.id}
              className="flex flex-col p-6 bg-brand-navy rounded-xl border border-white/5 hover:border-brand-blue/30 transition-all"
            >
              <StarRow />
              <p className="text-gray-300 text-sm leading-relaxed mt-4 mb-6 flex-1">&ldquo;{item.quote}&rdquo;</p>
              <div className="pt-4 border-t border-white/5">
                <p className="font-heading font-semibold text-white text-sm">{item.name}</p>
                <p className="text-gray-500 text-xs mt-0.5">{item.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-brand-navy rounded-2xl p-8 border border-white/5">
          <h3 className="font-heading font-semibold text-2xl text-white mb-1">{t('leaveReview.heading')}</h3>
          <p className="text-gray-400 text-sm mb-6">{t('leaveReview.subheading')}</p>

          <form className="flex flex-col gap-5" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">{t('leaveReview.name')}</label>
                <input
                  type="text"
                  placeholder="Jane Smith"
                  className="w-full px-4 py-3 bg-brand-navy-light border border-white/10 rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-blue/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">{t('leaveReview.company')}</label>
                <input
                  type="text"
                  placeholder="VP of Analytics, Acme Corp"
                  className="w-full px-4 py-3 bg-brand-navy-light border border-white/10 rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-blue/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1.5">{t('leaveReview.rating')}</label>
              <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                {Array.from({ length: 5 }).map((_, i) => {
                  const value = i + 1
                  const active = (hoverRating || rating) >= value
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRating(value)}
                      onMouseEnter={() => setHoverRating(value)}
                      className="text-brand-green"
                      aria-label={`${value} star`}
                    >
                      <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.116.483-.412.863-.833.6l-4.725-2.885a.563.563 0 00-.586 0L6.98 21.43c-.421.263-.949-.117-.833-.6l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602c-.38-.325-.178-.948.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"
                        />
                      </svg>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1.5">{t('leaveReview.review')}</label>
              <textarea
                rows={4}
                placeholder={t('leaveReview.reviewPlaceholder')}
                className="w-full px-4 py-3 bg-brand-navy-light border border-white/10 rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-blue/50 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-brand-blue text-brand-navy font-bold text-sm rounded-lg hover:bg-brand-blue/90 transition-all mt-2"
            >
              {t('leaveReview.submit')}
            </button>

            <p className="text-center text-gray-600 text-xs">{t('leaveReview.disclaimer')}</p>
          </form>
        </div>
      </div>
    </section>
  )
}
