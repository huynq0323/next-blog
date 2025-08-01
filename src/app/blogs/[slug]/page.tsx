import CommentSection from '@/components/comment/CommentSection';
import { getBlogDetailSlug } from '@/services/blog.service';
import React from 'react'

async function DetailBlog({ params }: { params: { slug: string } }) {
  const blog = await getBlogDetailSlug(params.slug);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <article className="space-y-4">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <p className="text-sm text-gray-500">
          Viết bởi <span className="font-semibold">{blog.author.name}</span> –{' '}
          {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
        </p>
        <div className="prose prose-lg max-w-none">{blog.content}</div>
      </article>

      {/* 💬 Bình luận */}
      <section className="pt-10 border-t border-gray-200">
        <CommentSection postId={blog.id} />
      </section>
    </div>
  )
}

export default DetailBlog
