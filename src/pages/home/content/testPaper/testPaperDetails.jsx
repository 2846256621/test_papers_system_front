import React, { Component } from 'react'
import {
    Breadcrumb,
    Layout,
    Card,
    Table,
    Form,
    Space,
    Button,
    Alert,
    Modal,
    Select,
    DatePicker,
    Input,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import RenderProblem from '../component/RenderProblem';
import WrappedComponent from '../component/wrapComponent';
const { Content } = Layout;
const { confirm } = Modal;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
};

class app extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [{
                fitness: 0.43,
                difficulty: 0.8,
                pointCoverage: 0.3,
                problemNum: 20,
                score: 100,
            }],
            problemList: [{
                id: '1',
                problemType: 'choice',
                problemText: '计算机网络是一门很有意思的课程。',
                choiceOptionA: '是的',
                choiceOptionB: '不是',
                choiceOptionC: '还行',
                choiceOptionD: '一般',
                score: 2,
                answer: 'A',
            }, {
                id: '5',
                problemType: 'multiple',
                problemText: '你的爱好有什么',
                multipleOptionA: '吃饭',
                multipleOptionB: '睡觉',
                multipleOptionC: '上厕所',
                multipleOptionD: '打游戏',
                multipleOptionE: '出去玩',
                multipleOptionF: '',
                score: 5,
                answer: 'A,B',
            }, {
                id: '2',
                problemType: 'judgement',
                problemText: '你是世界上最聪明的是吗？',
                score: 4,
                answer: 'true',
            },{
                id: '3',
                problemType: 'blank',
                problemText: '计算机网络是一门很有意思的课程，最有意思的部分是____和_____。',
                score: 3,
                answer: '优秀、聪明',
            },{
                id: '4',
                problemType: 'shortAnswer',
                problemText: '你为什么感觉到幸福呢',
                score: 6,
                answer: '因为年年有今日，岁岁有今朝',
            }],
            testPaperDetails: {
                testPaperName: '今日颜值测试考试',
                subject:'语文',
                startTime: '2020-01-13 21:00:00',
                endTime: '2020-01-13 21:00:00',
            },
            modalFormDate: {},
        }
    }
    getTestPaPaerColumns = () => {
        return [{
            title: '试卷名称',
            dataIndex: 'testPaperName',
            key: 'testPaperName',
        },{
            title: '所属课程',
            dataIndex: 'subject',
            key: 'subject',
        },  {
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
        }, {
            title: '结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
        }]
    }
    getResultColumns = () => {
        return [
            {
                title: '适应度',
                dataIndex: 'fitness',
                key: 'fitness',
            }, {
                title: '试卷难度系数',
                dataIndex: 'difficulty',
                key: 'difficulty',
            }, {
                title: '知识点覆盖率',
                dataIndex: 'pointCoverage',
                key: 'pointCoverage',
            }, {
                title: '题目总数',
                dataIndex: 'problemNum',
                key: 'problemNum',
            }, {
                title: '试卷总分',
                dataIndex: 'score',
                key: 'score',
            }
        ]
    }

    onChangeItem = (filed, val) => {
        console.log('正确答案不允许修改');
        return;
    }

    // 修改试卷
    onModifyTestPaper = (record) => {
        let tempRecord = record;
        tempRecord.startTime = moment(record.startTime,'YYYY-MM-DD HH:mm:ss');
        tempRecord.endTime = moment(record.endTime,'YYYY-MM-DD HH:mm:ss');
        confirm({
            title: '修改试卷信息',
            icon: <ExclamationCircleOutlined />,
            content: (
                <Form
                    {...layout}
                    name="basic"
                    layout="Horizontal"
                    initialValues={tempRecord}
                >
                    <Form.Item
                        label="试卷名称"
                        name="testPaperName"
                    >
                        <Input
                            placeholder="请输入试卷名称"
                            value={tempRecord.testPaperName}
                            onChange={ (e) => { this.handleChangeModalItem('testPaperName', e)}}
                        />
                    </Form.Item>
                    <Form.Item
                        label="开始时间"
                        name="startTime"
                    >
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            value={tempRecord.startTime}
                            locale={locale}
                            onChange={ (time, timeString) => { this.handleChangeModalItem('startTime', timeString)}}
                        />
                    </Form.Item>
                    <Form.Item
                        label="结束时间"
                        name="endTime"
                    >
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            value={tempRecord.endTime}
                            locale={locale}
                            onChange={ (time, timeString) => { this.handleChangeModalItem('endTime', timeString)}}
                        />
                    </Form.Item>
                </Form>
            ),
            style: { marginTop: 150 },
            okText: '保存',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                this.onOkModify(record);
            },
            onCancel: () => {
                console.log('不保存')
            },
        })
    }

    // 修改试卷内容字段
    handleChangeModalItem = (filedName, value) => {
        console.log('filedName, value', filedName, value)
        const { modalFormDate } = this.state;
        const tempModalFormDate = Object.assign({}, modalFormDate, { [filedName]: value });
        this.setState({
            modalFormDate: tempModalFormDate,
        });
    }
    
    // 确认修改
    onOkModify = (record) => {
        const { modalFormDate } = this.state;
        // 请求返回之后，modalFormDate清空
        console.log(modalFormDate);
    }

    render() {
        const { data, problemList, testPaperDetails } = this.state;
        return (
            <div style={{ padding: 10 }}>
                <Card title={
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>自动组卷系统</Breadcrumb.Item>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>试题管理</Breadcrumb.Item>
                        <Breadcrumb.Item>试卷详情</Breadcrumb.Item>
                    </Breadcrumb>
                }>
                    <Content
                        className="site-layout-background test-paper-details"
                    >
                        <Alert message="组卷结果请及时保存，若直接退出则不会保存组卷结果。" type="warning" showIcon closable />
                        <Card
                            style={{ marginTop: 20}}
                            title="组卷结果"
                            extra={
                                <Button
                                    type="primary"
                            >
                                保存试卷
                            </Button>
                            }
                        >
                                <Table
                                    columns={this.getResultColumns()}
                                    dataSource={data}
                                    pagination={false}
                                />
                        </Card>
                        <Card
                            title="试卷信息"
                            style={{ marginTop: 20}}
                            extra={
                            <Space size={50}>
                                <Button
                                    type="primary"
                                    onClick={() => this.onModifyTestPaper(testPaperDetails)}
                                >
                                    修改试卷信息
                                </Button>
                            </Space>
                        }>
                                <Table
                                    columns={this.getTestPaPaerColumns()}
                                    dataSource={[testPaperDetails]}
                                    pagination={false}
                                />
                        </Card>
                        <Alert
                            style={{ marginTop: 10 }}
                            message="题目信息仅为展示，不可修改。若要修改，请前往题目管理，进行修改。"
                            type="warning"
                            showIcon
                            closable
                        />
                        <Card
                            title="题目信息"
                            style={{ marginTop: 10}}
                                
                        >
                            <Form>
                                {
                                    problemList.map(item => {
                                        return(
                                            <Form.Item
                                                label=""
                                                name={item.answer}
                                                key={item.id}
                                            >
                                                {item.id}.{item.problemText} ({item.score}分)
                                                <RenderProblem
                                                    field={item}
                                                    onChangeItem={this.onChangeItem}
                                                />
                                            </Form.Item>
                                        )
                                    })
                                }
                            </Form>
                        </Card>
                    </Content>
                </Card>
            </div>
        )
    }
}
export default WrappedComponent(app);