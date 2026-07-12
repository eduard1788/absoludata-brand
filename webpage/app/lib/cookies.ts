export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const escaped = name.replace(/[.$?*|{}()[\]\\/+^]/g, '\\$&')
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

export function setCookie(name: string, value: string, maxAgeSeconds = 60 * 60 * 24 * 365): void {
  if (typeof document === 'undefined') return
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax${secure}`
}
