import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { UserOutlined, FileTextOutlined, CommentOutlined, TagsOutlined } from '@ant-design/icons';
import Header from './comments/Header';
import Footer from '@/components/app.footer';

// const { Header, Sider, Content, Footer } = Layout;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      {children}
      <Footer />
      {/* <Layout>
        <Header className="bg-white shadow px-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Quản trị hệ thống blog</h1>
        </Header>
        <Content className="p-6">{children}</Content>
        <Footer style={{ textAlign: 'center' }}>Blog Admin ©2025 Created by huy</Footer>
      </Layout> */}
    </Layout>
  );
}
