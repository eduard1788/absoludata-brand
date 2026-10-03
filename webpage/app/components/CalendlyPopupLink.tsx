'use client'

import type { MouseEvent, ReactNode } from 'react'
import { CALENDLY_URL } from '@/lib/links'

let calendlyWidgetPromise: Promise<void> | undefined

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => boolean
    }
  }
}

type CalendlyPopupLinkProps = {
  children: ReactNode
  className: string
}

export default function CalendlyPopupLink({ children, className }: CalendlyPopupLinkProps) {
  function loadCalendlyWidget() {
    if (window.Calendly) return Promise.resolve()
    if (calendlyWidgetPromise) return calendlyWidgetPromise

    const stylesheet = document.createElement('link')
    stylesheet.rel = 'stylesheet'
    stylesheet.href = 'https://assets.calendly.com/assets/external/widget.css'
    document.head.appendChild(stylesheet)

    calendlyWidgetPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Calendly widget failed to load'))
      document.body.appendChild(script)
    })

    return calendlyWidgetPromise
  }

  async function openCalendly(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()

    try {
      await loadCalendlyWidget()
      if (window.Calendly) {
        window.Calendly.initPopupWidget({ url: CALENDLY_URL })
      } else {
        window.location.assign(CALENDLY_URL)
      }
    } catch {
      window.location.assign(CALENDLY_URL)
    }
  }

  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={openCalendly}
      className={className}
    >
      {children}
    </a>
  )
}