import React, { Component } from 'react'
import { Menu } from 'antd';
import { SettingOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
export default class app extends Component {
    render() {
        const username = window.localStorage.getItem('username');
        return (
            <div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                >    
                    <Menu.Item>
                        <img
                            width={50}
                            height={50}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                        />
                    </Menu.Item>
                    <Menu.Item key="1" icon={<LogoutOutlined />}>用户系统</Menu.Item>
                    <Menu.Item key="2" icon={<LoginOutlined />}>管理系统</Menu.Item>
                    <SubMenu key="3"
                        icon={<SettingOutlined />}
                        title={`欢迎你，${username}`}
                        style={{ float: 'right'}}
                    >
                        <Menu.Item key="setting:1">个人中心</Menu.Item>
                        <Menu.Item key="setting:2">退出登录</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}