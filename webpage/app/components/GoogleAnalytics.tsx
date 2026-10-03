'use client'

import { useEffect } from 'react'

const measurementId = 'G-ZQC9YKY1BP'

export function GoogleAnalytics() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== 'production' ||
      window.location.hostname !== 'absoludata.com' ||
      document.getElementById('google-analytics-loader')
    ) {
      return
    }

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', measurementId)

    const script = document.createElement('script')
    script.id = 'google-analytics-loader'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)
  }, [])

  return null
}

declare global {
  interface Window {
    dataLayer: IArguments[]
    gtag: (...args: IArguments[number][]) => void
  }
}