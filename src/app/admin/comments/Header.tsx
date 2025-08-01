'use client'
import React from 'react'
import { Menu, MenuProps } from "antd";
import { useState } from "react";
import Link from 'next/link';

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
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        className="capitalize"
      />
    </div>
  )
}

export default Header
