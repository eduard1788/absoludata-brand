'use client'

import { useTranslations } from 'next-intl'

export default function ContactPage() {
  const t = useTranslations('contact')

  const options = [
    { key: 'consultation', title: t('options.consultation.title'), desc: t('options.consultation.desc') },
    { key: 'inquiry', title: t('options.inquiry.title'), desc: t('options.inquiry.desc') },
    { key: 'questions', title: t('options.questions.title'), desc: t('options.questions.desc') },
  ]

  return (
    <div className="pt-16">
      <section className="py-24 bg-brand-navy min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            <div>
              <p className="text-brand-green font-medium text-sm uppercase tracking-widest mb-3">
                {t('eyebrow')}
              </p>
              <h1 className="font-heading font-bold text-5xl sm:text-6xl text-white mb-6">
                {t('heading')}
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed mb-12">
                {t('intro')}
              </p>

              <div className="flex flex-col gap-8">
                {options.map(item => (
                  <div key={item.key} className="flex gap-4">
                    <div className="mt-1 w-2 h-2 rounded-full bg-brand-green flex-shrink-0" />
                    <div>
                      <h3 className="font-heading font-semibold text-white text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand-navy-light rounded-2xl p-8 border border-white/5">
              <h2 className="font-heading font-semibold text-2xl text-white mb-6">
                {t('form.heading')}
              </h2>
              <form className="flex flex-col gap-5" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">{t('form.firstName')}</label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full px-4 py-3 bg-brand-navy border border-white/10 rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-green/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">{t('form.lastName')}</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full px-4 py-3 bg-brand-navy border border-white/10 rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-green/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">{t('form.email')}</label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 bg-brand-navy border border-white/10 rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-green/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">{t('form.company')}</label>
                  <input
                    type="text"
                    placeholder="Your Company"
                    className="w-full px-4 py-3 bg-brand-navy border border-white/10 rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-green/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">{t('form.message')}</label>
                  <textarea
                    rows={4}
                    placeholder={t('form.messagePlaceholder')}
                    className="w-full px-4 py-3 bg-brand-navy border border-white/10 rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-green/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-brand-green text-brand-navy font-bold text-sm rounded-lg hover:bg-brand-green/90 transition-all mt-2"
                >
                  {t('form.submit')}
                </button>

                <p className="text-center text-gray-600 text-xs">
                  {t('form.disclaimer')}
                </p>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
