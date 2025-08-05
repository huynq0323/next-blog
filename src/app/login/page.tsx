'use client';

import { Form, Input, Button, message } from 'antd';
import { useAuth } from '@/contexts/auth.context';
import { useState } from 'react';
import axios from '@/utils/axios';
import { ILogin } from '@/types/auth';
import { login } from '@/services/auth.service';


export default function LoginPage() {
  const { authLogin } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: ILogin) => {
    setLoading(true);
    try {
      const res = await login(values);
      debugger
      const { accessToken, refreshToken } = res.data;
      authLogin({ accessToken, refreshToken });
      message.success('Đăng nhập thành công!');
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Đăng nhập thất bại';
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h1>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Vui lòng nhập email' }]}
          >
            <Input type="email" placeholder="example@email.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="bg-blue-600 hover:bg-blue-700"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
