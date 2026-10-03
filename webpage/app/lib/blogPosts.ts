export const blogPostKeys = ['dataPlatformReadiness'] as const

export type BlogPostKey = (typeof blogPostKeys)[number]

export const blogPostSlugs: Record<BlogPostKey, string> = {
  dataPlatformReadiness: 'signs-you-need-a-modern-data-platform',
}

export const blogPostCoverImages: Record<BlogPostKey, string> = {
  dataPlatformReadiness: '/blog/data-platform-readiness.svg',
}

export const blogPostCaseStudyLink: Partial<Record<BlogPostKey, string>> = {}

export function blogPostKeyFromSlug(slug: string): BlogPostKey | undefined {
  return blogPostKeys.find(key => blogPostSlugs[key] === slug)
}
