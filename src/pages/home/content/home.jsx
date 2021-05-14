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
    message
} from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import './index.css';
import WrappedComponent from './component/wrapComponent';
import $ajax from '../../../utils/ajax';
import APIS from '../../../constants/api';
import { GridComponent } from 'echarts/components';
import { LegendComponent } from 'echarts/components';
echarts.use([LegendComponent]);
echarts.use([GridComponent]);
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
            problemList: [],
        }
    }
    componentDidMount(){
        
        this.getInitProblemData();
        this.getInitData();
    }
    getInitData = () => {
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
                }, () => {
                    this.handleInitBirEcharts();
                    this.handleInitPieEcharts()
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    getInitProblemData = () => {
        $ajax.common({
            method: 'get',
            api: APIS.getSubjects,
        }).then((res) => {
            if (res.code === 10000) {
                this.setState({
                    problemList: res.data.dataList,
                });
            } else {
                message.error({
                    content: res.message,
                    className: 'custom-class',
                    style: {marginTop: '30vh'},
                });
            }
            return res;
        }).catch((e) => {
            console.log(e);
        });
    }

    handleInitBirEcharts = () => {
        const { totalKnowledge, totalPaper, totalSubject, totalUser} = this.state;
        let myChart = echarts.init(document.getElementById('bar-echarts'));
        // 绘制图表
        myChart.setOption({
            title: { text: '系统数据柱状图' },
            tooltip: {},
            xAxis: {
                data: [ "试卷", "课程", "知识点", "用户"]
            },
            yAxis: {},
            series: [{
                name: '总数',
                type: 'bar',
                data: [ parseInt(totalPaper), parseInt(totalSubject), parseInt(totalKnowledge), parseInt(totalUser)]
            }]
        });
    }
    handleInitPieEcharts = () => {
        var pie = document.getElementById('pie-echarts');
        var chart = echarts.init(pie);
        const { problemList } = this.state;
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['填空题', '单选题', '判断题', '简答题', '多选题']
            },
            grid: {
                left: '5%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: problemList.map(item => {
                    return item.subjectName;
                })
            },
            series: [
                {
                    name: '填空题',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: problemList.map(item => {
                        return parseInt(item.blankCount);
                    })
                },
                {
                    name: '单选题',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: problemList.map(item => {
                        return parseInt(item.choiceCount);
                    })
                },
                {
                    name: '判断题',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: problemList.map(item => {
                        return parseInt(item.judgementCount);
                    })
                },
                {
                    name: '简答题',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: problemList.map(item => {
                        return parseInt(item.shortAnswerCount);
                    })
                },
                {
                    name: '多选题',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: problemList.map(item => {
                        return parseInt(item.multipleCount);
                    })
                }
            ]
        };
        chart.setOption(option);
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
                        <Row gutter={16} style={{ marginTop: 10 }}>
                            <Col span={8}>
                                <Card
                                    title="系统数据统计"
                                    id="bar-echarts"
                                    style={{ width: 400, height: 400, padding:20 }}
                                ></Card>
                            </Col>
                            <Col span={8}>
                                <Card
                                    title="系统题量分布统计"
                                    id="pie-echarts"
                                    style={{ width:600, height: 400., marginLeft: 20, padding: 20 }}
                                ></Card>
                            </Col>
                        </Row>
                    </Content>
                </Card>
            </div>
        )
    }
}
export default WrappedComponent(app);