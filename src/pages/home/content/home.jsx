import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Layout,
    Breadcrumb,
    Statistic,
    Row,
    Col,
    Card,
    Typography,
} from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import './index.css';
import WrappedComponent from './component/wrapComponent';
const { Content } = Layout;
const { Title } = Typography;

class app extends Component {
    render() {
        return (
            <div className="home-container">
                <Card title={
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>自动组卷系统</Breadcrumb.Item>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                    </Breadcrumb>
                }>
                    <Content
                        className="site-layout-background"
                    >
                        <Title level={4}>
                            欢迎来到遗传算法自动组卷系统
                        </Title>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Card title="现有题目" extra={
                                    <Link style={{ marginTop: 16 }} to="/problemList">
                                        进入查看
                                    </Link>
                                }>
                                    <Statistic prefix={<LikeOutlined />} value={1002} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="现有试卷" extra={
                                    <Link style={{ marginTop: 16 }} to="/testPaperList">
                                        进入查看
                                    </Link>
                                }>
                                    <Statistic prefix={<LikeOutlined />} value={56} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="包含课程" extra={
                                    <Link style={{ marginTop: 16 }} to="/subjectsList">
                                        进入查看
                                    </Link>
                                }>
                                    <Statistic prefix={<LikeOutlined />} value={8} />
                                </Card>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ marginTop: 10 }}>
                            <Col span={8}>
                                <Card title="包含知识点" extra={
                                    <Link style={{ marginTop: 16 }} to="/pointsList">
                                        进入查看
                                    </Link>
                                }>
                                    <Statistic prefix={<LikeOutlined />} value={123} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="用户量" extra={
                                    <Link style={{ marginTop: 16 }} to="/userManager">
                                        进入查看
                                    </Link>
                                }>
                                    <Statistic prefix={<LikeOutlined />} value={1221} />
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                </Card>
            </div>
        )
    }
}
export default WrappedComponent(app);