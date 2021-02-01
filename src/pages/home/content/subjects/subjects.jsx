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
import { ExclamationCircleOutlined } from '@ant-design/icons';
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
        }
    }
    componentDidMount(){
        const { getSubjects } = this.props;
        const { currentPage, pageSize} = this.state;
        getSubjects({currentPage, pageSize});
    }

    getColumns = () => {
        return [
            {
                title: '学科ID',
                dataIndex: 'subjectId',
                key: 'subjectId',
            },
            {
                title: '学科名称',
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
                render: (text, record) => (
                    <Space size="middle">
                        <a onClick={() =>{this.subjectManageModal('modify', record)}}>修改学科</a>
                        <a onClick={() => {this.onDelSubject(record.subjectId)}}>删除学科</a>
                    </Space>
                ),
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
                const { addSubject, subjectAddSuccess, getSubjects } = this.props;
                addSubject(formData);
                if (subjectAddSuccess) {
                    const { formData } = this.state;
                    const tempFormData = formData;
                    tempFormData.subjectName = '';
                    this.setState({
                        formData: tempFormData,
                    }, getSubjects({currentPage, pageSize}));
                }
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
                const { updateSubject, subjectUpdateSuccess, getSubjects } = this.props;
                const tempData = {
                    subjectName: formData.subjectName,
                    subjectId: record.subjectId,
                };
                updateSubject(tempData);
                if (subjectUpdateSuccess) {
                    const { formData } = this.state;
                    const tempFormData = formData;
                    tempFormData.subjectName = '';
                    this.setState({
                        formData: tempFormData,
                    }, getSubjects({currentPage, pageSize}));
                }
            }
        }
    }

    // 添加或修改弹窗
    subjectManageModal = (type, record) => {
        const { formData } = this.state;
        return (
            confirm({
                title: type === 'modify' ? '修改学科' : '增加学科',
                icon: <ExclamationCircleOutlined />,
                content: (
                    <Form
                        name="basic"
                        layout="Horizontal"
                        initialValues={record}
                    >
                        <Form.Item
                            label="学科名称"
                            name="subjectName"
                        >
                            <Input
                                placeholder="请输入学科名称"
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


    // 删除学科
    onDelSubject = (id) => {
        console.log('删除学科', this.props);
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
                dropSubject({subjectId: id});
                getSubjects({ currentPage, pageSize });
            },
            onCancel: () => {
                console.log('Cancel');
            },
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
            getSubjects({currentPage, pageSize});
        });
    }

    render() {
        const { formData, currentPage, pageSize } = this.state;
        const { subjectsList, totalSubjectCount } = this.props;
        return (
            <div style={{ padding: 10 }} className="subject-list">
                <Card title={
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>自动组卷系统</Breadcrumb.Item>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>试题管理</Breadcrumb.Item>
                        <Breadcrumb.Item>学科管理</Breadcrumb.Item>
                    </Breadcrumb>
                }>
                    <Content
                        className="site-layout-background"
                    >
                        <Button
                            type="primary"
                            onClick={ () => { this.subjectManageModal('add', formData) }}
                        >
                            添加学科
                        </Button>
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