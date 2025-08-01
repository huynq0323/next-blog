'use client';
import UserTable from '@/components/admin/UserTable';
import React from 'react'

function User() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Quản lý người dùng</h2>
      <UserTable />
    </div>
  )
}

export default User
