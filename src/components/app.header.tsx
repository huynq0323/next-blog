'use client'
import React from 'react'
import { Menu, MenuProps } from "antd";
import { useState } from "react";
import Link from 'next/link';

function Header() {
  const [current, setCurrent] = useState<string>('mail');
  type MenuItem = Required<MenuProps>['items'][number];
  const items: MenuItem[] = [
    {
      label: (
        <Link href={'/'} >NextJs 15</Link>
      ),
      key: 'nextjs15',
    },
    {
      label: (
        <Link href={'/'} >User</Link>
      ),
      key: 'user',
    },
    {
      label: (
        <Link href={'/blogs'} >Blogs</Link>
      ),
      key: 'blogs',
    },
    {
      label: (
        <Link href={'/facebook'} >facebook</Link>
      ),
      key: 'app',
    },
    {
      label: (
        <Link href={'/youtube'} >youtube</Link>
      ),
      key: 'SubMenu',
      // icon: <SettingOutlined />,
      // children: [
      //   {
      //     type: 'group',
      //     label: 'Item 1',
      //     children: [
      //       { label: 'Option 1', key: 'setting:1' },
      //       { label: 'Option 2', key: 'setting:2' },
      //     ],
      //   },
      //   {
      //     type: 'group',
      //     label: 'Item 2',
      //     children: [
      //       { label: 'Option 3', key: 'setting:3' },
      //       { label: 'Option 4', key: 'setting:4' },
      //     ],
      //   },
      // ],
    },
    {
      key: 'alipay',
      label: (
        <Link href={'/instagram'} >instagram</Link>
      ),
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
