export const caseStudyKeys = ['telecomChurn', 'retailForecasting', 'financeAutomation'] as const

export type CaseStudyKey = (typeof caseStudyKeys)[number]

export const caseStudySlugs: Record<CaseStudyKey, string> = {
  telecomChurn: 'telecom-churn',
  retailForecasting: 'retail-forecasting',
  financeAutomation: 'finance-automation',
}

export const caseStudyCardImages: Record<CaseStudyKey, string> = {
  telecomChurn: '/case-studies/telecom-churn.svg',
  retailForecasting: '/case-studies/retail-forecasting.svg',
  financeAutomation: '/case-studies/finance-automation.svg',
}

export const caseStudyHeroImages: Record<CaseStudyKey, string> = {
  telecomChurn: '/case-studies/telecom-churn-hero.svg',
  retailForecasting: '/case-studies/retail-forecasting-hero.svg',
  financeAutomation: '/case-studies/finance-automation-hero.svg',
}

export function caseStudyKeyFromSlug(slug: string): CaseStudyKey | undefined {
  return caseStudyKeys.find(key => caseStudySlugs[key] === slug)
}
