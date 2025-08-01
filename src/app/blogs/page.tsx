import { getBlogs } from '@/services/blog.service';
import Link from 'next/link'
import React from 'react'

async function Blogs() {
  const blogs = await getBlogs();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tất cả bài viết</h1>
      <div className="space-y-6">
        {(blogs || []).map((blog: any) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.slug}`}
            className="block p-5 border border-gray-200 rounded-2xl hover:shadow transition"
          >
            <h2 className="text-xl font-semibold text-blue-600">{blog.title}</h2>
            <p className="text-gray-600 line-clamp-2">{blog.summary}</p>
            <div className="text-sm text-gray-500 mt-2">
              Viết bởi <span className="font-medium">{blog.author.name}</span> –{' '}
              {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Blogs
