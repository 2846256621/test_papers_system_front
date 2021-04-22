import React, { Component } from 'react'
import { Menu } from 'antd';
import { SettingOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import image from "../../../assets/images/logo2.png";
const { SubMenu } = Menu;
export default class app extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    handleLogOut = () => {
        window.localStorage.removeItem('userId');
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('type');
        this.props.history.push('/login');
    }

    render() {
        const username = window.localStorage.getItem('username');
        return (
            <div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                >    
                    <Menu.Item style={{ padding: 0}}>
                        <img
                            width={60}
                            height={60}
                            src={image}
                        />
                        <div style={{ display: 'inline-block', marginLeft: '20px', fontSize: '17px', fontWeight: 'bold'}}>
                            邮易自动组卷系统
                        </div>
                    </Menu.Item>
                    <SubMenu key="3"
                        icon={<SettingOutlined />}
                        title={`欢迎你，${username}`}
                        style={{ float: 'right'}}
                    >
                        <Menu.Item
                            key="setting:2"
                            onClick={() => { this.handleLogOut()}}
                        >
                                退出登录
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}