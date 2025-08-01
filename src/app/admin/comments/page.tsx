'use client';
import CommentTable from '@/components/admin/CommentTable';
import React from 'react'

function Comment() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Quản lý bình luận</h2>
      <CommentTable />
    </div>
  )
}

export default Comment
