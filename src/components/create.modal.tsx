import React, { useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import { createBlog, updateBlog } from '@/services/blog.service';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

type IProps = {
    open: boolean,
    handleClose: () => void,
    editingBlog?: IBlog | null;
}

const CreateModal = (props: IProps) => {
    const { open, handleClose, editingBlog } = props

    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (editingBlog) {
            form.setFieldsValue(editingBlog);
        } else {
            form.resetFields();
        }
    }, [editingBlog]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            if (editingBlog?.id) {
                await toast.promise(
                    updateBlog(editingBlog.id, values),
                    {
                        pending: 'Đang cập nhật blog...',
                        success: 'Cập nhật thành công!',
                        error: 'Cập nhật thất bại!',
                    }
                );
            } else {
                await toast.promise(
                    createBlog(values),
                    {
                        pending: 'Đang tạo blog...',
                        success: 'Thêm blog thành công!',
                        error: 'Thêm blog thất bại!',
                    }
                );
            }

            await mutate('home-get-blogs');
            form.resetFields();
            handleClose();
        } catch (err) {
            toast.error('Đã xảy ra lỗi!');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        handleClose();
    };

    return (
        <Modal
            title={editingBlog ? 'Chỉnh sửa Blog' : 'Tạo Blog Mới'}
            open={open}
            onOk={handleSubmit}
            onCancel={handleCancel}
            okText={editingBlog ? 'Cập nhật' : 'Tạo'}
            cancelText="Hủy"
            confirmLoading={loading}
        >
            <Form
                form={form}
                layout="vertical"
                name="create_blog_form"
            >
                <Form.Item
                    name="title"
                    label="Tiêu đề"
                    rules={[
                        { required: true, message: 'Vui lòng nhập tiêu đề!' },
                        { min: 5, message: 'Tiêu đề phải có ít nhất 5 ký tự' },
                        { max: 100, message: 'Tiêu đề không được dài quá 100 ký tự' }
                    ]}
                >
                    <Input placeholder="Nhập tiêu đề blog" />
                </Form.Item>

                <Form.Item
                    name="author"
                    label="Tác giả"
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên tác giả!' },
                        { pattern: /^[a-zA-ZÀ-ỹ\s]+$/, message: 'Tên tác giả chỉ chứa chữ cái và khoảng trắng' },
                        { max: 50, message: 'Tên tác giả không được quá 50 ký tự' }
                    ]}
                >
                    <Input placeholder="Tên tác giả" />
                </Form.Item>

                <Form.Item
                    name="content"
                    label="Nội dung"
                    rules={[
                        { required: true, message: 'Vui lòng nhập nội dung!' },
                        { min: 10, message: 'Nội dung phải có ít nhất 10 ký tự' }
                    ]}
                >
                    <Input.TextArea rows={4} placeholder="Nội dung blog..." />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateModal;
