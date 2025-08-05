import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { UserOutlined, FileTextOutlined, CommentOutlined, TagsOutlined } from '@ant-design/icons';
import Header from './components/Header';
import Footer from '@/components/app.footer';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <div className='flex-1 bg-white'>
        {children}
      </div>

      <Footer />
    </Layout>
  );
}
