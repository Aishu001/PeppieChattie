import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
  {
    label: 'Get Signal',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: 'Help',
    key: 'app',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Feature',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: 'alipay',
  },
];

const Header = () => {
  const [current, setCurrent] = useState('mail');

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" style={{ display: 'flex', justifyContent: 'space-between' , border: 'none'  }}>
      <Menu.Item key="logo">
        {/* Place your logo image here */}
        <img src="logo.png" alt="Logo" style={{ height: '130px', width: 'auto' , marginRight: "800px" }} />
      </Menu.Item>
      <Menu.ItemGroup key="menu" style={{ float: 'right' , fontSize:'18px' , fontWeight:'bold' }}>
        {items.map((item) => (
          <Menu.Item key={item.key}>{item.label}</Menu.Item>
        ))}
      </Menu.ItemGroup>
    </Menu>
  );
};

export default Header;
