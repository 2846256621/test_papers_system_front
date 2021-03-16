import React, { Component } from 'react'
import {
    Table,
    Tag,
    Space,
    Breadcrumb,
    Layout,
    Card,
    Modal,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import WrappedComponent from '../component/wrapComponent';
import SearchProblem from './problemSearch';
import { Link } from "react-router-dom";
const { Content } = Layout;
const { confirm } = Modal;

const data = [
    {
      id: '1',
      subject: '语文',
      problemType: '填空题',
      problemText: '我5点有个会冲',
      difficultyLevel: '1',
      knowledgePoints: ['nice', 'developer'],
      score: 1,
    },
    {
        id: '2',
        subject: '数学',
        problemType: '判断题',
        problemText: '我5点有个会冲突，预计不长，',
        difficultyLevel: '3',
        knowledgePoints: ['nice', 'loser'],
        score: 1,
    },
    {
        id: '3',
        subject: '英语',
        problemType: '选择题',
        problemText: '我5点有个会冲突，预计不长，',
        difficultyLevel: '5',
        knowledgePoints: ['nice', 'developer'],
        score: 1,
    },
    {
        id: '4',
        subject: '数学',
        problemType: '判断题',
        problemText: '我5点有个会冲突，预计不长，',
        difficultyLevel: '3',
        knowledgePoints: ['nice', 'loser'],
        score: 1,
    }
];
class app extends Component {
    constructor(props){
        super(props);
        this.state = {
            formData: {
                problemType: 'all',
                subject: '',
                difficultyLevel: '',
                knowledgePoints: '',
                score: '',
            },
            check: {},
            userId: window.localStorage.getItem('userId'),
            type: window.localStorage.getItem('type'),
        }
    }
    // 删除题目
    onDelProblem = (id) => {
        confirm({
            title: '系统提示',
            icon: <ExclamationCircleOutlined />,
            content: `确定要删除题目${id}吗？`,
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
    getColumns = () => {
        return [
            {
                title: '学科',
                dataIndex: 'subject',
                key: 'subject',
                render: text => <a>{text}</a>,
            },
            {
                title: '题目',
                dataIndex: 'problemText',
                key: 'problemText',
            },
            {
                title: '题型',
                dataIndex: 'problemType',
                key: 'problemType',
            },
            {
                title: '难度',
                key: 'difficultyLevel',
                dataIndex: 'difficultyLevel',
            },
            {
                title: '分数',
                key: 'score',
                dataIndex: 'score',
            },
            {
                title: '知识点',
                dataIndex: 'knowledgePoints',
                key: 'knowledgePoints',
                render: tags => (
                    <>
                        {tags.map((tag, index) => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            if (tag === 'loser') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={`${tag}_${index}`}>
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
                render: (text, record) => {
                    const { userId, type } = this.state;
                    return (
                        <Space size="middle">
                            <Link to='/problemsManage/view' replace>查看题目</Link>
                            {
                                (userId === record.userId || type === '1') ?
                                <>
                                    <Link to='/problemsManage/modify' replace>修改题目</Link>
                                    <a onClick={() => {this.onDelProblem(record.id)}}>删除题目</a>
                                </>
                                : ''
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

    onSubmit = () => {
        console.log('submit提交表单',this.state.formData);
    }

    render() {
        const { formData, check } = this.state;
        return (
            <div style={{ padding: 10 }}>
                <Card title={
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>自动组卷系统</Breadcrumb.Item>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>试题管理</Breadcrumb.Item>
                        <Breadcrumb.Item>题目管理</Breadcrumb.Item>
                    </Breadcrumb>
                }>
                    <Content
                        className="site-layout-background"
                    >
                        <SearchProblem
                            handleChangeItem={this.handleChangeItem}
                            handleSubmit={this.onSubmit}
                            formData={formData}
                            check={check}
                            require={false}
                        />
                        <Table
                            bordered
                            style={{ marginTop: 20 }}
                            columns={this.getColumns()}
                            dataSource={data}
                        />
                    </Content>
                </Card>
            </div>
        )
    }
}

export default WrappedComponent(app);