import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Table,
    Space,
    Breadcrumb,
    Layout,
    Button,
    Card,
    Modal,
    Form,
    Input,
    Pagination,
    message,
} from 'antd';
import { ExclamationCircleOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import WrappedComponent from '../component/wrapComponent';
import subjects from '../../../../store/actions/subjects';
import '../index.css';
const { Content } = Layout;
const { confirm } = Modal;

class app extends Component {
    constructor(props){
        super(props);
        this.state = {
            formData: {},
            currentPage: 1,
            pageSize: 10,
            userId: window.localStorage.getItem('userId'),
            type: window.localStorage.getItem('type'),
        }
    }
    componentDidMount(){
        const { getSubjects } = this.props;
        const { currentPage, pageSize} = this.state;
        getSubjects({currentPage, pageSize, userId: window.localStorage.getItem('userId')});
    }

    getColumns = () => {
        return [
            {
                title: '课程ID',
                dataIndex: 'subjectId',
                key: 'subjectId',
            },
            {
                title: '课程名称',
                dataIndex: 'subjectName',
                key: 'subjectName',
            },
            {
                title: '包含知识点数',
                dataIndex: 'pointCount',
                key: 'pointCount',
            },
            {
                title: '选择题数',
                dataIndex: 'choiceCount',
                key: 'choiceCount',
            },
            {
                title: '判断题数',
                dataIndex: 'judgementCount',
                key: 'judgementCount',
            },
            {
                title: '填空题数',
                dataIndex: 'blankCount',
                key: 'blankCount',
            },
            {
                title: '简答题数',
                dataIndex: 'shortAnswerCount',
                key: 'shortAnswerCount',
            },
            {
                title: '操作',
                key: '',
                render: (text, record) => {
                    const { userId, type } = this.state;
                    return (  
                        <Space size="middle">
                            {
                                (+userId === record.userId || type === '1') ? 
                                <>
                                    <Button
                                        type="primary"
                                        ghost
                                        shape="round" 
                                        icon={<FormOutlined />} 
                                        onClick={() =>{this.subjectManageModal('modify', record)}}
                                    >
                                        修改
                                    </Button>
                                    <Button
                                        danger
                                        shape="round" 
                                        icon={<DeleteOutlined />} 
                                        onClick={() => {this.onDelSubject(record.subjectId)}}
                                    >
                                        删除
                                    </Button>
                                </>
                                : '无'
                            }
                        </Space>
                    )
                }
            },
        ];   
    }

    handleChangeModalItem = (filedName, value) => {
        console.log('filedName, value', filedName, value)
        const { formData } = this.state;
        const tempFormData = Object.assign({}, formData, { [filedName]: value });
        this.setState({
            formData: tempFormData,
        });
    }

    // 确认添加或修改
    onOkModify = (type, record) => {
        const { formData, currentPage, pageSize } = this.state;
        if(type === 'add') {
            if(!Object.keys(formData).length || formData.subjectName === '') {
                message.error({
                    content: '未添加，不得保存',
                    className: 'custom-class',
                    style: {marginTop: '30vh'},
                });
            } else {
                const { addSubject, getSubjects } = this.props;
                addSubject({
                    name: formData.subjectName,
                    userId: window.localStorage.getItem('userId'),
                });
                setTimeout(()=>{
                    const { subjectAddSuccess } = this.props;
                    if (subjectAddSuccess) {
                        const { formData } = this.state;
                        const tempFormData = formData;
                        tempFormData.subjectName = '';
                        this.setState({
                            formData: tempFormData,
                        }, () => {
                            console.log('添加成功');
                            getSubjects({currentPage, pageSize, userId: window.localStorage.getItem('userId')});
                        });
                    }
                }, 500);
                
            }
        }
        if( type === 'modify'){
            if(!Object.keys(formData).length || formData.subjectName === '') {
                message.error({
                    content: '未修改，不得保存',
                    className: 'custom-class',
                    style: {marginTop: '30vh'},
                });
            } else {
                const { updateSubject, getSubjects } = this.props;
                const tempData = {
                    name: formData.subjectName,
                    id: record.subjectId,
                };
                updateSubject(tempData);
                setTimeout(()=>{
                    const { subjectUpdateSuccess } = this.props;
                    if (subjectUpdateSuccess) {
                        const { formData } = this.state;
                        const tempFormData = formData;
                        tempFormData.subjectName = '';
                        this.setState({
                            formData: tempFormData,
                        }, getSubjects({currentPage, pageSize, userId: window.localStorage.getItem('userId')}));
                    }
                },500);
               
            }
        }
    }

    // 添加或修改弹窗
    subjectManageModal = (type, record) => {
        const { formData } = this.state;
        const userId = window.localStorage.getItem('userId');
        if (!userId) {
            message.error({
                content: '请先登录，再进行添加操作！',
                className: 'custom-class',
                style: {marginTop: '30vh'},
            });
        } else {
            return (
                confirm({
                    title: type === 'modify' ? '修改课程' : '增加课程',
                    icon: <ExclamationCircleOutlined />,
                    content: (
                        <Form
                            name="basic"
                            layout="Horizontal"
                            initialValues={record}
                        >
                            <Form.Item
                                label="课程名称"
                                name="subjectName"
                            >
                                <Input
                                    placeholder="请输入课程名称"
                                    value={formData.subjectName}
                                    onChange={ (e) => { this.handleChangeModalItem('subjectName', e.target.value)}}
                                />
                            </Form.Item>
                        </Form>
                    ),
                    style: { marginTop: 150 },
                    okText: '保存',
                    cancelText: '取消',
                    onOk: () => {
                        this.onOkModify(type, record);
                    },
                    onCancel: () => {
                        console.log('不保存')
                    },
                })      
            )
        }
    }


    // 删除课程
    onDelSubject = (id) => {
        console.log('删除课程', this.props);
        confirm({
            title: '系统提示',
            icon: <ExclamationCircleOutlined />,
            content: `删除课程将会同步删除其关联的知识点及题目，确定要删除吗？`,
            style: { marginTop: 150 },
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                const { dropSubject, getSubjects } = this.props;
                const { currentPage, pageSize } = this.state;
                dropSubject({id});
                getSubjects({ currentPage, pageSize, userId: window.localStorage.getItem('userId')});
            },
            onCancel: () => {
                console.log('Cancel');
            },
        });
    }

    // 查询课程
    handleSelectSubject = (subjectName) => {
        const { getSubjects } = this.props;
        const { currentPage, pageSize, formData } = this.state;
        getSubjects({ name:subjectName, currentPage, pageSize, userId: window.localStorage.getItem('userId')});
        const tempFormData = formData;
        tempFormData.subjectName = '';
        this.setState({
            formData: tempFormData,
        });
    }

    // 分页
    onChangePage = (page, pageSize) => {
        this.setState({
            currentPage: page,
            pageSize,
        }, () => {
            const { getSubjects } = this.props;
            const { currentPage, pageSize } = this.state;
            getSubjects({currentPage, pageSize, userId: window.localStorage.getItem('userId')});
        });
    }

    render() {
        const { formData, currentPage, pageSize } = this.state;
        const { subjectsList, totalSubjectCount } = this.props;
        return (
            <div style={{ padding: 10 }} className="subject-list">
                <Card
                    title={
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>自动组卷系统</Breadcrumb.Item>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>试题管理</Breadcrumb.Item>
                        <Breadcrumb.Item>课程管理</Breadcrumb.Item>
                    </Breadcrumb>
                }>
                    <Content
                        className="site-layout-background"
                    >
                        <Form
                            name="basic"
                            layout="inline"
                        >
                            <Form.Item
                                label="课程名称"
                                name="subjectName"
                            >
                                <Input
                                    placeholder="请输入课程名称"
                                    value={formData.subjectName}
                                    onChange={ (e) => { this.handleChangeModalItem('subjectName', e.target.value)}}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    onClick={ () => { this.handleSelectSubject(formData.subjectName) }}
                                >
                                    查询
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    onClick={ () => { this.subjectManageModal('add', formData) }}
                                >
                                    添加课程
                                </Button>
                            </Form.Item>
                        </Form>
                        <Table
                            bordered
                            style={{ marginTop: 20 }}
                            columns={this.getColumns()}
                            dataSource={subjectsList}
                            pagination={false}
                        />
                        <Pagination
                            style={{ float: 'right', marginTop: 20}}
                            showQuickJumper
                            showSizeChanger={true}
                            current={currentPage}
                            total={totalSubjectCount}
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
    totalSubjectCount: state.subjects.totalSubjectCount,
    subjectAddSuccess: state.subjects.subjectAddSuccess,
    subjectUpdateSuccess: state.subjects.subjectUpdateSuccess,
})

const mapDispatchToProps = (dispatch) => ({
    getSubjects: params => dispatch(subjects.getSubjects(params)),
    addSubject: params => dispatch(subjects.addSubject(params)),
    updateSubject: params => dispatch(subjects.updateSubject(params)),
    dropSubject: params => dispatch(subjects.dropSubject(params)),
})

export default WrappedComponent(connect(
    mapStateToProps,
    mapDispatchToProps,
)(app));