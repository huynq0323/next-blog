import { usePostTable } from '@/app/admin/posts/hooks/usePostTable';
import { Button, Space, Table, TableProps } from 'antd'
import Link from 'next/link';
import React from 'react'

function PostTable(initialData: IResponseGetDataDto<any>) {
  const {
    dataSource,
    loading,
    pagination,
    handleTableChange,
  } = usePostTable(initialData);

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
      <div className='flex justify-between items-center mx-2'>
        <h2 className="text-2xl font-semibold mb-4">Quản lý người dùng</h2>
        <Button type="primary" className="btn-press">
          Thêm mới
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey="id"
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default PostTable
