import { blogPostKeys, blogPostSlugs } from '@/lib/blogPosts'
import BlogPostContent from './BlogPostContent'

export function generateStaticParams() {
  return blogPostKeys.map(key => ({ slug: blogPostSlugs[key] }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <BlogPostContent slug={slug} />
}
