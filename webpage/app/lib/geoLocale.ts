type Locale = 'en' | 'es'

const GEO_API_URL = 'https://get.geojs.io/v1/ip/geo.json'
const GEO_FETCH_TIMEOUT_MS = 2500

const SPANISH_SPEAKING_COUNTRY_CODES = new Set([
  'ES', // Spain
  'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU', 'BO',
  'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', // Latin America
  'GQ', // Equatorial Guinea
  'PR', // Puerto Rico
])

function mapCountryCodeToLocale(countryCode: string): Locale {
  return SPANISH_SPEAKING_COUNTRY_CODES.has(countryCode.toUpperCase()) ? 'es' : 'en'
}

function extractCountryCode(data: unknown): string | null {
  if (typeof data !== 'object' || data === null) return null
  const value = (data as Record<string, unknown>).country_code
  return typeof value === 'string' && value.length > 0 ? value : null
}

export async function detectLocaleFromIp(externalSignal?: AbortSignal): Promise<Locale | null> {
  const timeoutSignal = AbortSignal.timeout(GEO_FETCH_TIMEOUT_MS)
  const signal = externalSignal ? AbortSignal.any([externalSignal, timeoutSignal]) : timeoutSignal

  try {
    const res = await fetch(GEO_API_URL, { signal, cache: 'no-store' })
    if (!res.ok) return null
    const data: unknown = await res.json()
    const countryCode = extractCountryCode(data)
    return countryCode ? mapCountryCodeToLocale(countryCode) : null
  } catch {
    return null
  }
}
