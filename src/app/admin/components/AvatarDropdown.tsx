import { MENU_KEY } from '@/constants/admin.constant';
import { useAuth } from '@/contexts/auth.context';
import { IMenuAdmin } from '@/types/admin';
import { InfoCircleOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu, MenuProps } from 'antd'
import React from 'react'

function AvatarDropdown() {
  const { user } = useAuth()

  const handleMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case MENU_KEY.PROFILE:
        console.log('Navigate to profile');
        // router.push('/admin/profile') nếu cần
        break;
      case MENU_KEY.LOGOUT:
        console.log('Logout');
        // call logout function
        break;
      default:
        break;
    }
  };  

  const items: MenuProps['items'] = [
    {
      key: MENU_KEY.PROFILE,
      icon: <InfoCircleOutlined />,
      label: 'Thông tin cá nhân',
    },
    {
      key: MENU_KEY.LOGOUT,
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
    },
  ];

  return (
    <Dropdown
      menu={{ items, onClick: handleMenuClick }}
      trigger={['click']}
      overlayClassName="avatar-dropdown"
      placement="bottomRight"
    >
      <div className="cursor-pointer flex items-center gap-1">
        <Avatar size="small" icon={<UserOutlined />} />
        {user?.email}
      </div>
    </Dropdown>
  )
}

export default AvatarDropdown
