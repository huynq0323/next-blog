'use client'
import Link from "next/link";
import { Button, Space, Table } from "antd"
import React, { useState } from 'react';
import type { TableProps } from 'antd'
import CreateModal from "./create.modal";
import useSWR, { mutate } from "swr";
import { deleteBlog, getBlogs } from "@/services/blog.service";
import { toast } from "react-toastify";
import ConfirmDialog from "./dialog/ConfirmDialog";

type IPropsTable = {
    blog?: IBlog[]
}

function TableTest() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingBlog, setEditingBlog] = useState<IBlog | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    // const { data } = useSWR('home-get-blogs', getBlogs, { fallbackData: blogs })

    const showModal = () => {
        setEditingBlog(null);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setEditingBlog(null);
    };


    const handleEdit = (record: IBlog) => {
        setEditingBlog(record);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number | null) => {
        try {
            if (!id) return;
            await toast.promise(
                deleteBlog(id),
                {
                    pending: 'Đang xóa...',
                    success: 'Xóa thành công!',
                    error: 'Xóa thất bại!',
                }
            );
            await mutate('home-get-blogs');
        } catch (err) {
            toast.error('Đã xảy ra lỗi khi xóa!');
        }
    };

    const columns: TableProps<IBlog>['columns'] = [
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
                    <Button color="purple" variant="outlined" onClick={() => handleEdit(record)}>Edit</Button>
                    <Button color="danger" variant="outlined" onClick={() => setDeleteId(record?.id || null)}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="mx-[30px] my-[16px]">
            <div className="flex justify-between items-center my-[16px]">
                <div>Table</div>
                <Button type="primary" onClick={showModal}>
                    Add
                </Button>
            </div>

            <Table<IBlog>
                columns={columns}
                // dataSource={(data || []).sort((i: IBlog) => i?.id)}
                dataSource={[]}
                rowKey="id"
            />

            {
                isModalOpen && <CreateModal
                    open={isModalOpen}
                    handleClose={handleClose}
                    editingBlog={editingBlog}
                />
            }

            <ConfirmDialog
                open={!!deleteId}
                onConfirm={async () => {
                    await handleDelete(deleteId);
                    setDeleteId(null);
                }}
                onCancel={() => setDeleteId(null)}
                title="Xác nhận xóa?"
                content="Bạn có chắc chắn muốn xóa mục này không?"
            />
        </div>
    )
}

export default TableTest

// handleDelete(record.id)
