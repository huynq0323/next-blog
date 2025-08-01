'use client';
import TagTable from '@/components/admin/TagTable';
import React from 'react'

function Tag() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Quản lý thẻ</h2>
      <TagTable />
    </div>
  )
}

export default Tag
