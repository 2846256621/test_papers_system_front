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
import $ajax from '../../../utils/ajax';
import APIS from '../../../constants/api';
const { Content } = Layout;
const { Title } = Typography;

class app extends Component {
    constructor(props){
        super(props);
        this.state = {
            totalQuestion: '',
            totalPaper: '',
            totalSubject: '',
            totalKnowledge: '',
            totalUser: '',
        }
    }
    componentDidMount(){
        $ajax.common({
            method: 'get',
            api: APIS.home,
        }).then(res => {
            if (res.code === 10000 && res.success === true) { 
                this.setState({
                    totalQuestion: res.data.totalQuestion,
                    totalPaper: res.data.totalPaper,
                    totalSubject: res.data.totalSubject,
                    totalKnowledge: res.data.totalKnowledge,
                    totalUser: res.data.totalUser,
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }
    render() {
        const { totalKnowledge, totalPaper, totalQuestion, totalSubject, totalUser } = this.state;
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
                            欢迎来到邮易自动组卷系统
                        </Title>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Card title="现有题目" extra={
                                    <Link style={{ marginTop: 16 }} to="/problemList">
                                        进入查看
                                    </Link>
                                }>
                                    <Statistic prefix={<LikeOutlined />} value={totalQuestion} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="现有试卷" extra={
                                    <Link style={{ marginTop: 16 }} to="/testPaperList">
                                        进入查看
                                    </Link>
                                }>
                                    <Statistic prefix={<LikeOutlined />} value={totalPaper} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="包含课程" extra={
                                    <Link style={{ marginTop: 16 }} to="/subjectsList">
                                        进入查看
                                    </Link>
                                }>
                                    <Statistic prefix={<LikeOutlined />} value={totalSubject} />
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
                                    <Statistic prefix={<LikeOutlined />} value={totalKnowledge} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="用户量" extra={
                                    <Link style={{ marginTop: 16 }} to="/userManager">
                                        进入查看
                                    </Link>
                                }>
                                    <Statistic prefix={<LikeOutlined />} value={totalUser} />
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