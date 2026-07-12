'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useLocaleContext } from './LocaleProvider'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const t = useTranslations('nav')
  const { locale, setLocale } = useLocaleContext()

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/blog', label: t('blog') },
    { href: '/contact', label: t('contact') },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-navy/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          <Link href="/" className="flex items-center gap-3">
            <div style={{ width: 72, height: 72, overflow: 'hidden', flexShrink: 0 }}>
              <Image
                src="/logo.png"
                alt="Absoludata"
                width={116}
                height={116}
                style={{ marginLeft: -22, mixBlendMode: 'screen', maxWidth: 'none' }}
                priority
              />
            </div>
            <span className="font-heading font-bold text-3xl tracking-wide text-brand-green">ABSOLUDATA</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}
              className="px-3 py-1.5 rounded-md border border-white/20 text-xs font-semibold text-gray-300 hover:text-white hover:border-white/40 transition-colors tracking-widest"
            >
              {locale === 'en' ? 'ES' : 'EN'}
            </button>
            <Link
              href="/contact"
              className="px-4 py-2 bg-brand-green text-brand-navy font-semibold text-sm rounded-lg hover:bg-brand-green/90 transition-colors"
            >
              {t('cta')}
            </Link>
          </div>

          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-brand-navy-light border-t border-white/10">
          <div className="px-4 py-4 flex flex-col gap-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}
                className="px-3 py-1.5 rounded-md border border-white/20 text-xs font-semibold text-gray-300 tracking-widest"
              >
                {locale === 'en' ? 'ES' : 'EN'}
              </button>
              <Link
                href="/contact"
                className="flex-1 px-4 py-2 bg-brand-green text-brand-navy font-semibold text-sm rounded-lg text-center"
                onClick={() => setMobileOpen(false)}
              >
                {t('cta')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
