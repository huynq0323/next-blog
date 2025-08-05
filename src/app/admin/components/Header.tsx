'use client'
import React from 'react'
import { Menu, MenuProps } from "antd";
import { useState } from "react";
import Link from 'next/link';
import AvatarDropdown from './AvatarDropdown';

function Header() {
  const [current, setCurrent] = useState<string>('user');
  type MenuItem = Required<MenuProps>['items'][number];
  const items: MenuItem[] = [
    {
      label: (
        <Link href={'/admin/users'} >User</Link>
      ),
      key: 'user',
      className: 'label'
    },
    {
      label: (
        <Link href={'/admin/posts'} >Post</Link>
      ),
      key: 'post',
      className: 'label'
    },
    {
      label: (
        <Link href={'/admin/comments'} >Comment</Link>
      ),
      key: 'comment',
      className: 'label'
    },
    {
      label: (
        <Link href={'/admin/tags'} >Tag</Link>
      ),
      key: 'tag',
      className: 'label'
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className='header-menu flex justify-between items-center p-3 bg-white shadow-md border-[#F5F5F5] border-b-2'>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        className="capitalize flex-1 !border-0 h-[36px]"
      />
      <AvatarDropdown />
    </div>
  )
}

export default Header
