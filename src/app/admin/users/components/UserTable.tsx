// UserTable.tsx
'use client';

import React from 'react';
import { Button, Space, Table, TableProps } from 'antd';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { getSerialNumber } from '@/utils/utils';
import { useUserTable } from '../hooks/useUserTable';

function UserTable(initialData: IResponseGetDataDto<any>) {
  const {
    dataSource,
    loading,
    pagination,
    handleTableChange,
  } = useUserTable(initialData);

  const columns: TableProps<any>['columns'] = [
    {
      title: 'No',
      render: (_, __, index) => getSerialNumber(index, pagination.page, pagination.pageSize),
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

export default UserTable;
