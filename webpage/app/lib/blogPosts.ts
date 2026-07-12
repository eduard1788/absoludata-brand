export const blogPostKeys = ['dataPlatformReadiness', 'telecomChurnBehindTheScenes'] as const

export type BlogPostKey = (typeof blogPostKeys)[number]

export const blogPostSlugs: Record<BlogPostKey, string> = {
  dataPlatformReadiness: 'signs-you-need-a-modern-data-platform',
  telecomChurnBehindTheScenes: 'predictive-analytics-cut-telecom-churn',
}

export const blogPostCoverImages: Record<BlogPostKey, string> = {
  dataPlatformReadiness: '/blog/data-platform-readiness.svg',
  telecomChurnBehindTheScenes: '/blog/telecom-churn-behind-scenes.svg',
}

export const blogPostCaseStudyLink: Partial<Record<BlogPostKey, string>> = {
  telecomChurnBehindTheScenes: '/success-stories/telecom-churn',
}

export function blogPostKeyFromSlug(slug: string): BlogPostKey | undefined {
  return blogPostKeys.find(key => blogPostSlugs[key] === slug)
}
