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
    Button
} from 'antd';
import { ExclamationCircleOutlined, EyeOutlined, FormOutlined, DeleteOutlined  } from '@ant-design/icons';
import WrappedComponent from '../component/wrapComponent';
import points from '../../../../store/actions/points';
import subjects from '../../../../store/actions/subjects';
import problems from '../../../../store/actions/problems';
import SearchProblem from './problemSearch';
import { Link } from "react-router-dom";

const { Content } = Layout;
const { confirm } = Modal;

const problemTypeMap = {
    choice:'单选题',
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
                score: '2',
                problemText: '',
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
        const { getAllProblem, getSubjects, getPoints } = this.props;
        getSubjects();
        getPoints({ currentPage: 1, pageSize: 10, userId: window.localStorage.getItem('userId')});
        getAllProblem({...formData, pageSize, currentPage});
    }

     // 分页
    onChangePage = (page, pageSize) => {
        this.setState({
            currentPage: page,
            pageSize,
        }, () => {
            const { formData, pageSize, currentPage } = this.state;
            const { getAllProblem } = this.props;
            getAllProblem({...formData, pageSize, currentPage});
        });
    }

    // 删除题目
    onDelProblem = (problemId, problemType) => {
        confirm({
            title: '系统提示',
            icon: <ExclamationCircleOutlined />,
            content: `确定要删除此题目吗？`,
            style: { marginTop: 150 },
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
              const { dropProblem } = this.props;
              dropProblem({ problemId, problemType });
              setTimeout(() => {
                const { problemDropSuccess, getAllProblem } = this.props;
                if (problemDropSuccess) {
                    const { formData, pageSize, currentPage } = this.state;
                    getAllProblem({...formData, pageSize, currentPage});
                }
              })
            },
            onCancel: () =>  {
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
                width: 100,
            },
            {
                title: '题目',
                dataIndex: 'steam',
                key: 'steam',
                width: 300,
            },
            {
                title: '题型',
                dataIndex: 'problemType',
                key: 'problemType',
                render: text => <span>{problemTypeMap[text]}</span>,
                width: 100,
            },
            {
                title: '难度',
                key: 'difficultyLevel',
                dataIndex: 'difficultyLevel', 
                width: 100,
            },
            {
                title: '分数',
                key: 'score',
                dataIndex: 'score',
                render: text => <span>{text}分</span>,
                width: 100,
            },
            {
                title: '知识点',
                dataIndex: 'knowledgePoints',
                key: 'knowledgePoints',
                render: tags => (
                    <>
                        {tags.map((tag, index) => {
                            let color = tag.length > 5 ? 'volcano' : 'green';
                            if (tag.length > 10) {
                                color = 'cyan';
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
                        <div>
                            <Link
                                to= '/problemsManage/view'
                                onClick={ () => {
                                    sessionStorage.setItem('problemId', record.problemId);
                                    sessionStorage.setItem('problemType', record.problemType);
                                }}
                                replace
                            >
                                <Button
                                    style={{margin: 5}}
                                    type="primary"
                                    ghost
                                    shape="round" 
                                    icon={<EyeOutlined />}
                                    >
                                        查看
                                    </Button>
                            </Link>
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
                                        <Button
                                            style={{margin: 5}}
                                            shape="round" 
                                            icon={<FormOutlined />}
                                        >
                                            修改
                                        </Button>
                                    </Link>
                                    <Button
                                        danger
                                        style={{margin: 5}}
                                        shape="round"
                                        icon={<DeleteOutlined />}
                                        onClick={() => {this.onDelProblem(record.problemId, record.problemType)}}
                                    >
                                        删除
                                    </Button>
                                </>
                                : ''
                            }
                        </div>
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
        const { subjectsList, pointsList, totalProblemsCount, problemList } = this.props;
        return (
            <div style={{ padding: 10 }} className="problem-list">
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
                            showSizeChanger={true}
                            current={currentPage}
                            defaultCurrent={1}
                            total={totalProblemsCount}
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
    totalProblemsCount: state.problems.totalProblemsCount,
    problemDropSuccess:  state.problems.problemDropSuccess,
})

const mapDispatchToProps = (dispatch) => ({
    getSubjects: params => dispatch(subjects.getSubjects(params)),
    getPoints: params => dispatch(points.getPoints(params)),
    getAllProblem: params => dispatch(problems.getAllProblem(params)),
    dropProblem: params => dispatch(problems.dropProblem(params)),
})

export default WrappedComponent(connect(
    mapStateToProps,
    mapDispatchToProps,
)(app));