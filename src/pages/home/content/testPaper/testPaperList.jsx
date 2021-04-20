import React, { Component } from 'react';
import {
    Table,
    Tag,
    Space,
    Breadcrumb,
    Layout,
    Card,
    Modal,
    Input,
    Form,
    Select,
    Button,
    DatePicker,
} from 'antd';
import { ExclamationCircleOutlined, EyeOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import WrappedComponent from '../component/wrapComponent';
import { Link } from "react-router-dom";
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
const { Content } = Layout;
const { confirm } = Modal;
const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
};
const data = [{
    id: 1,
    testPaperName: '测试试卷',
    subject: '语文',
    startTime:'2020-01-13 20:00:00',
    endTime: '2020-01-13 21:00:00',
    score: '60',
    difficulty: '0.8',
    knowledgePoints: ['nice', 'wow'],
}, {
    id: 2,
    testPaperName: '测试试卷',
    subject: '语文',
    startTime:'2020-01-13 20:00:00',
    endTime: '2020-01-13 21:00:00',
    score: '60',
    difficulty: '0.8',
    knowledgePoints: ['nice', 'wowowwowwowwowwowwowwowwowwowwowwowwoww','nicewowwowwowwow', 'wow','nice', 'wow','nwowwowwowice', 'wow','nice', 'wow','nice', 'wow','nice', 'wow','nice', 'wow','nice', 'wow','nice', 'wowowwowwoww','nice', 'wowwowwowwowwow','nice', 'wow','nice', 'wow'],
}];
class app extends Component {
    constructor(props){
        super(props);
        this.state = {
            formData: {
                testPaperName: '',
                subject: '',
            },
            check: {},
            modalFormDate: {},
            userId: window.localStorage.getItem('userId'),
            type: window.localStorage.getItem('type'),
        }
    }

    getColumns = () => {
        return [
            {
                title: '试卷ID',
                dataIndex: 'id',
                key: 'id',
                width:80,
            },
            {
                title: '试卷名称',
                dataIndex: 'testPaperName',
                key: 'testPaperName',
                width:160,
            },
            {
                title: '所属课程',
                dataIndex: 'subject',
                key: 'subject',
                width:120,
            },
            {
                title: '开始时间',
                dataIndex: 'startTime',
                key: 'startTime',
                width:200,
            },
            {
                title: '结束时间',
                key: 'startTime',
                dataIndex: 'startTime',
                width:200,
            },
            {
                title: '总分',
                key: 'score',
                dataIndex: 'score',
                width:100,
            },
            {
                title: '难度',
                key: 'difficulty',
                dataIndex: 'difficulty',
                width:100,
            },
            {
                title: '包含知识点',
                dataIndex: 'knowledgePoints',
                key: 'knowledgePoints',
                width:370,
                render: tags => (
                    <>
                        {tags.map((tag, index) => {
                            return (
                                <Tag color='volcano' key={`${tag}_${index}`}>
                                    {tag}
                                </Tag>
                            );
                        })}
                    </>
                ),
            },
            {
                title: '操作',
                key: '',
                fixed: 'right',
                width: 180,
                render: (text, record) => {
                    const { userId, type } = this.state;
                    return (
                        <Space size="middle">
                            <Link to={`/testPaperDetails?id=${record.id}`} replace>
                                <Button
                                    type="primary"
                                    shape="circle" 
                                    icon={<EyeOutlined />}
                                    onClick={() => {this.onModifyTestPaper(record)}}
                                >
                                    {/* 查看 */}
                                </Button>
                            </Link>
                            <Button
                                shape="circle" 
                                icon={<FormOutlined />}
                                onClick={() => {this.onModifyTestPaper(record)}}
                            >
                                {/* 修改 */}
                            </Button>
                            {
                                (userId === record.userId  || type === '1') ? 
                                 (
                                    <>
                                        <Button
                                            danger
                                            shape="circle" 
                                            icon={<DeleteOutlined />}
                                            onClick={() => {this.onDelTestPaper(record.id)}}
                                        >
                                            {/* 删除 */}
                                        </Button>
                                    </>
                                ) : ''
                            }
                            
                        </Space>
                    )
                } 
              },
          ];
          
    }

    formRef = React.createRef();

    // 处理表单字段
    handleChangeItem = (filedName, value) => {
        console.log('filedName, value', filedName, value)
        const { formData } = this.state;
        const tempFormDate = Object.assign({}, formData, { [filedName]: value });
        this.setState({
            formData: tempFormDate,
        });
    }

    // 提交查询
    onSubmit = () => {
        console.log('submit提交表单',this.state.formData);
    }

    // 删除试卷
    onDelTestPaper = (id) => {
        confirm({
            title: '系统提示',
            icon: <ExclamationCircleOutlined />,
            content: `确定要删除试卷${id}吗？`,
            style: { marginTop: 150 },
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
              console.log('OK');
            },
            onCancel() {
              console.log('Cancel');
            },
        });
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
        const { formData } = this.state;
        return (
            <div style={{ padding: 10 }}>
                <Card title={
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>自动组卷系统</Breadcrumb.Item>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>试题管理</Breadcrumb.Item>
                        <Breadcrumb.Item>试卷管理</Breadcrumb.Item>
                    </Breadcrumb>
                }>
                    <Content
                        className="site-layout-background"
                    >
                        <Form
                            layout="inline"
                            initialValues={formData}
                        >
                            <Form.Item
                                label="试卷名称"
                                name="testPaperName"
                            >
                                <Input
                                    placeholder="请输入试卷名称"
                                    style={{ width: 180 }}
                                    value={formData.testPaperName}
                                    onChange={(e) => this.handleChangeItem('testPaperName', e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="所属课程"
                                name="subject"
                            >
                                <Select 
                                    style={{ width: 180 }}
                                    placeholder="请选择课程"
                                    value={formData.subject}
                                    onChange={(e) => this.handleChangeItem('subject', e)}
                                >
                                    <Option value="">全部</Option>
                                    <Option value="1">数学</Option>
                                    <Option value="2">语文</Option>
                                    <Option value="3">英语</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    onClick={this.onSubmit}
                                >
                                    查询
                                </Button>
                            </Form.Item>
                        </Form>
                        <Table
                            bordered
                            style={{ marginTop: 20 }}
                            columns={this.getColumns()}
                            dataSource={data}
                            scroll={{ x: 1800 }}
                        />
                    </Content>
                </Card>
            </div>
        )
    }
}

export default WrappedComponent(app);