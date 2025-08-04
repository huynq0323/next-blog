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
    },
    {
      label: (
        <Link href={'/admin/posts'} >Post</Link>
      ),
      key: 'post',
    },
    {
      label: (
        <Link href={'/admin/comments'} >Comment</Link>
      ),
      key: 'comment',
    },
    {
      label: (
        <Link href={'/admin/tags'} >Tag</Link>
      ),
      key: 'tag',
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className='flex justify-between items-center p-4 bg-white shadow-md'>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        className="capitalize flex-1 !border-0"
      />
      <AvatarDropdown />
    </div>
  )
}

export default Header
