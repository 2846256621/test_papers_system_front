import React, { Component } from 'react'
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import {
    UserOutlined,
    LaptopOutlined,
    SolutionOutlined,
    HomeOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;

export default class app extends Component {
    constructor(props){
        super(props);
        this.state = {
            type: window.localStorage.getItem('type'),
        }
    }
    render() {
        const { type } = this.state;
        console.log('type |||', type);
        return (
            <div>
                <Menu
                    onClick={this.handleClick}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1','sub2','sub3']}
                    mode="inline"
                    // theme="dark"
                    style={{ height: 980, borderRight: 0}}
                >
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to='/home'>首页</Link>
                    </Menu.Item>

                    <SubMenu key="sub1" icon={<LaptopOutlined />} title="试卷管理">
                        <Menu.Item key="2"><Link to="/testPaperAutomatic">自动组卷</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="/testPaperList">试题管理</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<SolutionOutlined />} title="题库管理">
                        <Menu.Item key="6"><Link to='/problemsManage/add' replace>增加题目</Link></Menu.Item>
                        <Menu.Item key="7"><Link to='/problemList'>题目管理</Link></Menu.Item>
                        <Menu.Item key="8"><Link to='/pointsList'>知识点管理</Link></Menu.Item>
                        <Menu.Item key="9"><Link to='/subjectsList'>课程管理</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<UserOutlined />} title="账号管理">
                        <Menu.Item key="10"><Link to='/userPerson'>个人中心</Link></Menu.Item>
                        {
                            type === '1' ?
                            <Menu.Item key="11"><Link to='/userManager'>用户管理</Link></Menu.Item>
                            : ''
                        }
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}