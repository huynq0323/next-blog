'use client';

import React from 'react';
import { Button, Space, Table, TableProps } from 'antd';
import { CommentOutlined, DeleteTwoTone, EditTwoTone, UserOutlined } from '@ant-design/icons';
import { getSerialNumber } from '@/utils/utils';
import { usePostTable } from '../hooks/usePostTable';

function PostTable(initialData: IResponseGetDataDto<IPaginationTable>) {
  const {
    dataSource,
    loading,
    pagination,
    handleTableChange,
  } = usePostTable(initialData);

  const columns: TableProps<any>['columns'] = [
    {
      title: 'No',
      align: 'center',
      render: (_, __, index) => getSerialNumber(index, pagination.page, pagination.pageSize),
    },
    {
      title: 'Title',
      align: 'center',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Content',
      align: 'center',
      dataIndex: 'content',
      key: 'content',
      render: (text: string) => (
        <div
          className="line-clamp-2 cursor-pointer"
          title={text}
        >
          {text}
        </div>
      ),
    },
    {
      title: 'Slug',
      align: 'center',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: <UserOutlined />,
      align: 'center',
      dataIndex: 'author',
      key: 'author',
      render: (author: any) => author?.username,
    },
    {
      title: <CommentOutlined />,
      align: 'center',
      dataIndex: 'comments',
      key: 'comments',
      render: (comments: any[]) => comments.length || 0
    },
    {
      title: 'Tags',
      align: 'center',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: any[]) => (
        <div>
          {tags.map(tag => (
            <div>+ {tag?.tag?.name} </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Action',
      align: 'center',
      key: 'action',
      render: (_, record) => (
        <Space>
          <DeleteTwoTone twoToneColor="#ff4d4f" />
          <EditTwoTone twoToneColor="#1890ff" />
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
  );
}

export default PostTable