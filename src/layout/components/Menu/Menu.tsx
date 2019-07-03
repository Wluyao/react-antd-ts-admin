import React from 'react';
import { Link } from 'react-router-dom';

import { Menu, Icon } from 'antd';

import './Menu.less';

interface INavLink {
  path: string;
  icon: string;
  title: string
}

function NavLink(props: INavLink) {
  return (
    <Link to={props.path}>
      <Icon type={props.icon} />
      <span>{props.title}</span>
    </Link>
  );
}


function YGMenu() {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1">
        <NavLink path="/home" icon="pie-chart" title="首页" />
      </Menu.Item>

      <Menu.SubMenu key="sub1" title={<span><Icon type="mail" /><span>文章管理</span></span>}>
        <Menu.Item key="3">
          <NavLink path="/articleList" icon="pie-chart" title="文章列表" />
        </Menu.Item>

        <Menu.Item key="4">
          <NavLink path="/home" icon="pie-chart" title="草稿箱" />
        </Menu.Item>
      </Menu.SubMenu>


      <Menu.Item key="5">
        <NavLink path="/component" icon="pie-chart" title="组件" />
      </Menu.Item>

      <Menu.Item key="6">
        <NavLink path="/structure" icon="pie-chart" title="组织架构" />
      </Menu.Item>
    </Menu>
  )
}

export default YGMenu;
