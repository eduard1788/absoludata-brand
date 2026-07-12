'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')

  const companyLinks = [
    { href: '/about', label: t('links.about') },
    { href: '/services', label: t('links.services') },
    { href: '/blog', label: t('links.blog') },
    { href: '/contact', label: t('links.contact') },
  ]

  const serviceLinks = [
    { href: '/services#data-engineering', label: t('links.dataEngineering') },
    { href: '/services#analytics', label: t('links.analytics') },
    { href: '/services#applications', label: t('links.applications') },
    { href: '/services#ai', label: t('links.ai') },
    { href: '/services#web-development', label: t('links.webDevelopment') },
  ]

  return (
    <footer className="bg-brand-navy border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-4">
              <div style={{ width: 80, height: 80, overflow: 'hidden', flexShrink: 0 }}>
                <Image
                  src="/logo.png"
                  alt="Absoludata"
                  width={130}
                  height={130}
                  style={{ marginLeft: -25, mixBlendMode: 'screen', maxWidth: 'none' }}
                />
              </div>
              <span className="font-heading font-bold text-4xl tracking-wide text-brand-green">ABSOLUDATA</span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-sm">
              {t('description')}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">{t('sections.company')}</h4>
            <ul className="flex flex-col gap-2">
              {companyLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">{t('sections.services')}</h4>
            <ul className="flex flex-col gap-2">
              {serviceLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {t('copyright')}
          </p>
          <p className="text-gray-500 text-sm">{t('tagline')}</p>
        </div>
      </div>
    </footer>
  )
}
