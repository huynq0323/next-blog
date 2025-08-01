import Link from 'next/link'
import React from 'react'

function BlogList() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {[].map((post:any) => (
        <div key={post.id} className="border-b pb-4">
          <Link href={`/posts/${post.id}`} className="text-xl font-semibold hover:underline">
            {post.title}
          </Link>
          <p className="text-sm text-gray-500">By {post.author?.name}</p>
          <p className="mt-2 text-gray-700 line-clamp-3">{post.content}</p>
        </div>
      ))}
    </div>
  )
}

export default BlogList
