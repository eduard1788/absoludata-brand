'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import enMessages from '@/messages/en.json'
import esMessages from '@/messages/es.json'
import { getCookie, setCookie } from '@/lib/cookies'
import { detectLocaleFromIp } from '@/lib/geoLocale'

type Locale = 'en' | 'es'

const messages: Record<Locale, typeof enMessages> = { en: enMessages, es: esMessages }

const LOCALE_COOKIE = 'locale'

const LocaleContext = createContext<{
  locale: Locale
  setLocale: (l: Locale) => void
}>({ locale: 'en', setLocale: () => {} })

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    const stored = getCookie(LOCALE_COOKIE)
    if (stored === 'en' || stored === 'es') {
      setLocaleState(stored)
      return
    }

    const controller = new AbortController()
    let cancelled = false

    detectLocaleFromIp(controller.signal).then(detected => {
      if (cancelled || detected === null) return
      setLocaleState(detected)
      setCookie(LOCALE_COOKIE, detected)
    })

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    setCookie(LOCALE_COOKIE, l)
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages[locale]} timeZone="UTC">
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  )
}

export const useLocaleContext = () => useContext(LocaleContext)
