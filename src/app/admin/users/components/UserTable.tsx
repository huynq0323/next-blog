'use client';
import { useGetData } from '@/hooks/useGetData.swr';
import { getUser } from '@/services/user.service';
import { getSerialNumber } from '@/utils/utils';
import { Button, Space, Table, TableProps } from 'antd'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';


function UserTable(initialData: IResponseGetDataDto<any>) {
  const [pagination, setPagination] = useState<IPaginationTable>({
    page: 1,
    pageSize: 1,
    total: 0
  });

  const { data, isLoading, error, refetch } = useGetData({
    key: 'admin-get-users',
    fetcher: getUser,
    params: {
      page: pagination.page,
      pageSize: pagination.pageSize
    },
    enabled: true,
    initialData
  });

  const handleTableChange = (
    newPagination: IPaginationTable,
  ) => {
    setPagination({
      ...pagination,
      page: newPagination.current,
      pageSize: newPagination.pageSize,
    });
  };

  useEffect(() => {
    if (data) {
      setPagination({ ...pagination, total: data.total });
    }
  }, [data?.total]);


  const columns: TableProps<any>['columns'] = [
    {
      title: 'No',
      render: (_, record, index) => getSerialNumber(index, pagination.page, pagination.pageSize),
    },
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Link href={`/blogs/${record?.id}`}><Button color="primary" variant="outlined">View</Button></Link>
          <Button color="purple" variant="outlined">Edit</Button>
          <Button color="danger" variant="outlined">Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data?.data || []}
        rowKey="id"
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: pagination?.total || 0,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default UserTable
