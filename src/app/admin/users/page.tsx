import UserTable from '@/app/admin/users/components/UserTable';
import { useGetData } from '@/hooks/useGetData.swr';
import { getUser } from '@/services/user.service';
import React from 'react'

async function User() {
  const initialData = await getUser({ pageSize: 1 });
  return (
    <div className='layout-table'>
      <h2 className="text-2xl font-semibold mb-4">Quản lý người dùng</h2>
      <UserTable {...initialData} />
    </div>
  )
}

export default User
