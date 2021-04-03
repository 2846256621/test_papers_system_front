import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Table,
    Tag,
    Space,
    Breadcrumb,
    Layout,
    Card,
    Modal,
    Pagination,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import WrappedComponent from '../component/wrapComponent';
import points from '../../../../store/actions/points';
import subjects from '../../../../store/actions/subjects';
import problems from '../../../../store/actions/problems';
import SearchProblem from './problemSearch';
import { Link } from "react-router-dom";
const { Content } = Layout;
const { confirm } = Modal;

const problemTypeMap = {
    choice:'选择题',
    judgement: '判断题',
    blank: '填空题',
    shortAnswer: '简答题',
    multiple: '多选题'
};

class app extends Component {
    constructor(props){
        super(props);
        this.state = {
            formData: {
                problemType: '',
                subject: '',
                difficultyLevel: '',
                knowledgePoints: [],
                score: '',
            },
            check: {},
            pageSize: 10,
            currentPage: 1,
            userId: window.localStorage.getItem('userId'),
            type: window.localStorage.getItem('type'),
        }
    }
    
    componentDidMount() {
        const { formData, pageSize, currentPage } = this.state;
        const { getAllProblem, getSubjects, getPoints, viewProblem } = this.props;
        getSubjects();
        getPoints({ currentPage: 1, pageSize: 10, userId: window.localStorage.getItem('userId')});
        getAllProblem({...formData, pageSize, currentPage});
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
                title: '课程',
                dataIndex: 'subjectName',
                key: 'subjectName',
                render: text => <a>{text}</a>,
                width: 100,
            },
            {
                title: '题目',
                dataIndex: 'steam',
                key: 'steam',
                width: 250,
            },
            {
                title: '题型',
                dataIndex: 'problemType',
                key: 'problemType',
                render: text => <span>{problemTypeMap[text]}</span>
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
                render: text => <span>{text}分</span>
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
                            <Link
                                to= '/problemsManage/view'
                                onClick={ () => {
                                    sessionStorage.setItem('problemId', record.problemId);
                                    sessionStorage.setItem('problemType', record.problemType);
                                }}
                                replace
                            >查看题目</Link>
                            {
                                (+userId === record.userId || type === '1') ?
                                <>
                                    <Link
                                        to='/problemsManage/modify'
                                        onClick={ () => {
                                            sessionStorage.setItem('problemId', record.problemId);
                                            sessionStorage.setItem('problemType', record.problemType);
                                        }}
                                        replace
                                    >
                                        修改
                                    </Link>
                                    <a onClick={() => {this.onDelProblem(record.id)}}>删除</a>
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
        // TODO: 如果学科字段更新，则更新知识点。
        if (filedName === 'subject') {
            const { getPoints, getSubjects } = this.props;
            getSubjects();
            getPoints({ currentPage: 1, pageSize: 10, userId: window.localStorage.getItem('userId'), subjectId: value });
        }
    }

    onSubmit = () => {
        console.log('submit提交表单',this.state.formData);
        const { formData, pageSize, currentPage } = this.state;
        const { getAllProblem } = this.props;
        getAllProblem({...formData, pageSize, currentPage});
    }

    render() {
        const { formData, check, currentPage, pageSize } = this.state;
        const { subjectsList, pointsList, totalProblemCount, problemList } = this.props;
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
                            subjectsList={subjectsList}
                            pointsList={pointsList}
                        />
                        <Table
                            bordered
                            style={{ marginTop: 20 }}
                            columns={this.getColumns()}
                            dataSource={problemList}
                            hideOnSinglePage={true}
                            pagination={false}
                        />
                        <Pagination
                            style={{ float: 'right', marginTop: 20}}
                            showQuickJumper
                            showSizeChanger={true}
                            current={currentPage}
                            total={totalProblemCount}
                            pageSize={pageSize}
                            onChange={this.onChangePage}
                        />
                    </Content>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    subjectsList: state.subjects.subjectsList,
    pointsList: state.points.pointsList,
    problemList: state.problems.problemList,
    totalProblemCount: state.problems.totalProblemCount,
})

const mapDispatchToProps = (dispatch) => ({
    getSubjects: params => dispatch(subjects.getSubjects(params)),
    getPoints: params => dispatch(points.getPoints(params)),
    getAllProblem: params => dispatch(problems.getAllProblem(params))
})

export default WrappedComponent(connect(
    mapStateToProps,
    mapDispatchToProps,
)(app));