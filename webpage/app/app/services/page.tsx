'use client'

import { useTranslations } from 'next-intl'
import CalendlyPopupLink from '@/components/CalendlyPopupLink'

const serviceKeys = ['dataEngineering', 'analytics', 'applications'] as const
const serviceIds = ['data-engineering', 'analytics', 'modernization']

const technologies: Record<string, string[]> = {
  dataEngineering: [
    'Amazon S3',
    'AWS Glue',
    'AWS Lambda',
    'Amazon Redshift',
    'Amazon Athena',
    'Snowflake',
    'Databricks',
    'dbt',
  ],
  analytics: ['Amazon QuickSight', 'Power BI', 'SQL'],
  applications: ['AWS Glue', 'AWS Lambda', 'Amazon S3', 'Amazon Redshift', 'Snowflake', 'Databricks', 'dbt'],
}

export default function ServicesPage() {
  const t = useTranslations('services')

  const services = serviceKeys.map((key, i) => ({
    id: serviceIds[i],
    title: t(`items.${key}.title`),
    tagline: t(`items.${key}.tagline`),
    description: t(`items.${key}.description`),
    capabilities: t.raw(`items.${key}.capabilities`) as string[],
    technologies: technologies[key],
  }))

  return (
    <div className="pt-16">
      <section className="py-24 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-brand-green font-medium text-sm uppercase tracking-widest mb-3">{t('eyebrow')}</p>
            <h1 className="font-heading font-bold text-5xl sm:text-6xl text-white mb-6">{t('heading')}</h1>
            <p className="text-xl text-gray-400 leading-relaxed">{t('intro')}</p>
          </div>
        </div>
      </section>

      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 ${index % 2 === 0 ? 'bg-brand-navy' : 'bg-brand-navy-light'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-brand-green font-medium text-sm uppercase tracking-widest mb-2">
                  {service.tagline}
                </p>
                <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">{service.title}</h2>
                <p className="text-gray-400 leading-relaxed mb-6">{service.description}</p>
                <CalendlyPopupLink
                  className="inline-block px-6 py-3 bg-brand-green text-brand-navy font-semibold text-sm rounded-lg hover:bg-brand-green/90 transition-all"
                >
                  {t('discussService')}
                </CalendlyPopupLink>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wide mb-3">
                    {t('capabilitiesLabel')}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {service.capabilities.map(cap => (
                      <li key={cap} className="flex items-center gap-2 text-gray-400 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wide mb-3">
                    {t('technologiesLabel')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map(tech => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-brand-navy rounded-md text-xs text-gray-400 border border-white/5 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="py-24 bg-brand-navy-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading font-bold text-4xl text-white mb-4">{t('cta.heading')}</h2>
          <p className="text-gray-400 text-lg mb-8">{t('cta.subheading')}</p>
          <CalendlyPopupLink
            className="inline-block px-8 py-4 bg-brand-green text-brand-navy font-bold text-base rounded-lg hover:bg-brand-green/90 transition-all"
          >
            {t('cta.button')}
          </CalendlyPopupLink>
        </div>
      </section>
    </div>
  )
}
