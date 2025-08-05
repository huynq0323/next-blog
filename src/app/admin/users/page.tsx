import UserTable from '@/app/admin/users/components/UserTable';
import { useGetData } from '@/hooks/useGetData.swr';
import { getUser } from '@/services/user.service';
import React from 'react'

async function User() {
  const initialData = await getUser({ pageSize: 10 });
  return (
    <div className='layout-table'>
      <UserTable {...initialData} />
    </div>
  )
}

export default User
