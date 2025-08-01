'use client'
import React, { useEffect, useState } from 'react'
import CommentBox from '../comment/CommentSection'

function BlogDetail({ postId }: { postId: string }) {
  const [post, setPost] = useState<any | null>(null);

  useEffect(() => {
    // getPostById(postId).then(setPost);
  }, [postId]);

  if (!post) return <div>Loading...</div>;
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">By {post.author?.name}</p>
      <div className="prose max-w-none mb-10">{post.content}</div>
      <CommentBox postId={postId} />
    </div>
  )
}

export default BlogDetail
