import { caseStudyKeys, caseStudySlugs } from '@/lib/caseStudies'
import CaseStudyContent from './CaseStudyContent'

export function generateStaticParams() {
  return caseStudyKeys.map(key => ({ slug: caseStudySlugs[key] }))
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <CaseStudyContent slug={slug} />
}
