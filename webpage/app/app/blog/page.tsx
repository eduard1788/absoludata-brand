'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { blogPostKeys, blogPostSlugs, blogPostCoverImages } from '@/lib/blogPosts'

export default function BlogPage() {
  const t = useTranslations('blog')

  const posts = blogPostKeys.map(key => ({
    id: key,
    slug: blogPostSlugs[key],
    category: t(`items.${key}.category`),
    date: t(`items.${key}.date`),
    readTime: t(`items.${key}.readTime`),
    title: t(`items.${key}.title`),
    excerpt: t(`items.${key}.excerpt`),
    image: blogPostCoverImages[key],
  }))

  return (
    <div className="pt-16">
      <section className="py-24 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-green font-medium text-sm uppercase tracking-widest mb-3">{t('eyebrow')}</p>
            <h1 className="font-heading font-bold text-5xl sm:text-6xl text-white mb-6">{t('heading')}</h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">{t('subheading')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {posts.map(post => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-brand-navy-light rounded-xl border border-white/5 hover:border-brand-green/30 transition-all overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={`${post.title} — cover illustration`}
                  className="w-full h-48 object-cover"
                />

                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-brand-green text-xs font-semibold uppercase tracking-widest">
                      {post.category}
                    </span>
                    <span className="text-gray-600 text-xs">&bull;</span>
                    <span className="text-gray-500 text-xs">{post.readTime}</span>
                  </div>
                  <h2 className="font-heading font-semibold text-xl text-white mb-3 group-hover:text-brand-green transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{post.excerpt}</p>
                  <p className="text-gray-500 text-xs">{post.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
