'use client'
import PostTable from '@/components/admin/PostTable'
import React from 'react'

function Post() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Quản lý bài viết</h2>
      <PostTable />
    </div>
  )
}

export default Post
