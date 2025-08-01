'use client';
import { Button, Space, Table, TableProps } from 'antd'
import Link from 'next/link';
import React from 'react'

function UserTable() {
  const columns: TableProps<any>['columns'] = [
    {
      title: 'No',
      render: (_, record) => record?.id,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
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
      <Table<IBlog>
        columns={columns}
        dataSource={[]}
        rowKey="id"
      />
    </div>
  )
}

export default UserTable
