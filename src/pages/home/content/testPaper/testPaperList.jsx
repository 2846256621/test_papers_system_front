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
    Input,
    Form,
    Select,
    Button,
    DatePicker,
    Pagination,
    Tooltip,
    message
} from 'antd';
import { ExclamationCircleOutlined, EyeOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import WrappedComponent from '../component/wrapComponent';
import papers from "../../../../store/actions/papers";
import subjects from '../../../../store/actions/subjects';
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

class app extends Component {
    constructor(props){
        super(props);
        this.state = {
            formData: {
                testPaperName: '',
                subject: '',
            },
            check: {},
            modalFormDate: {
                examName: "",
                startTime: "",
                endTime: "",
            },
            userId: window.localStorage.getItem('userId'),
            type: window.localStorage.getItem('type'),
            pageSize: 10,
            currentPage: 1,
        }
    }

    componentDidMount(){
        const { getPaperList, getSubjects } = this.props;
        const { formData, pageSize, currentPage } = this.state;
        getPaperList({...formData, pageSize, currentPage});
        getSubjects();
    }

    getColumns = () => {
        return [
            {
                title: '试卷ID',
                dataIndex: 'id',
                key: 'id',
                width:50,
            },
            {
                title: '试卷名称',
                dataIndex: 'testPaperName',
                key: 'testPaperName',
                width:100,
            },
            {
                title: '所属课程',
                dataIndex: 'subject',
                key: 'subject', 
                width:100,
            },
            {
                title: '开始时间',
                dataIndex: 'startTime',
                key: 'startTime',
                width:100,
            },
            {
                title: '结束时间',
                key: 'endTime',
                dataIndex: 'startTime',
                width:100,
            },
            {
                title: '总分',
                key: 'score',
                dataIndex: 'score',
                width:60,
            },
            {
                title: '难度',
                key: 'difficulty',
                dataIndex: 'difficulty',
                width:60,
            },
            {
                title: '包含知识点',
                dataIndex: 'knowledgePoints',
                key: 'knowledgePoints',
                width:370,
                render: tags => {
                   return (
                        tags.length > 10 ?
                        <Tooltip
                            placement="topLeft" 
                            title={
                                tags.map((tag, index) => {
                                    return (
                                        <Tag color='purple' key={`${tag}`}>
                                            {tag}
                                        </Tag>
                                    );
                                })
                            }
                            arrowPointAtCenter
                        >
                            {
                                tags.slice(0,10).map((tag, index) => {
                                    return (
                                        <Tag color='purple' key={`${tag}`}>
                                            {tag}
                                        </Tag>
                                    );
                                }) 
                            }
                            <span>......</span>
                        </Tooltip> : 
                        tags.map((tag, index) => {
                            return (
                                <Tag color='purple' key={`${tag}`}>
                                    {tag}
                                </Tag>
                            );
                        })
                   )
                },
            },
            {
                title: '操作',
                key: '',
                fixed: 'right',
                width: 100,
                render: (text, record) => {
                    const { userId, type } = this.state;
                    return (
                        <Space size="middle">
                            <Link to={`/testPaperDetails?id=${record.id}`} replace>
                                <Button
                                    type="primary"
                                    shape="circle" 
                                    icon={<EyeOutlined />}
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
        const { getPaperList } = this.props;
        const { formData, pageSize, currentPage } = this.state;
        getPaperList({...formData, pageSize, currentPage});
    }

    // 删除试卷
    onDelTestPaper = (id) => {
        if (!window.localStorage.getItem('userId')) {
            message.error({
                content: '请先登录，再进行添加操作！',
                className: 'custom-class',
                style: {marginTop: '30vh'},
            });
        } else {
            confirm({
                title: '系统提示',
                icon: <ExclamationCircleOutlined />,
                content: `确定要删除此试卷吗？`,
                style: { marginTop: 150 },
                okText: '确认',
                okType: 'danger',
                cancelText: '取消',
                onOk: () => {
                    const { dropPaper, getPaperList } = this.props;
                    const { formData, pageSize, currentPage } = this.state;
                    dropPaper({examId: id, userId: window.localStorage.getItem('userId')});
                    getPaperList({...formData, pageSize, currentPage});
                },
                onCancel: () => {
                console.log('Cancel');
                },
            });
        }
    }

    // 修改试卷
    onModifyTestPaper = (record) => {
        let tempRecord = record;
        tempRecord.startTime = moment(record.startTime,'YYYY-MM-DD HH:mm:ss');
        tempRecord.endTime = moment(record.endTime,'YYYY-MM-DD HH:mm:ss');
        if (!window.localStorage.getItem('userId')) {
            message.error({
                content: '请先登录，再进行添加操作！',
                className: 'custom-class',
                style: {marginTop: '30vh'},
            });
        } else {
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
                            name="examName"
                        >
                            <Input
                                placeholder="请输入试卷名称"
                                value={tempRecord.examName}
                                onChange={ (e) => { this.handleChangeModalItem('examName', e.target.value)}}
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
        const { modifyPaper } = this.props;
        modifyPaper({...modalFormDate, examId: record.id});
        setTimeout(() => {
            const { modifyPaperSuccess } = this.props;
            if(modifyPaperSuccess){
                const { getPaperList } = this.props;
                const { currentPage, pageSize } = this.state;
                getPaperList({currentPage, pageSize});
                this.setState({
                    modalFormDate: {
                        examName: "",
                        startTime: "",
                        endTime: "",
                    }
                });
            }
        }, 500);

    }

    onChangePage = (page, pageSize) => {
        this.setState({
            currentPage: page,
            pageSize,
        }, () => {
            const { getPaperList } = this.props;
            const { currentPage, pageSize } = this.state;
            getPaperList({currentPage, pageSize});
        });
    }

    render() {
        const { formData, currentPage, pageSize } = this.state;
        const { paperList, totalPaperCount, subjectsList } = this.props;
        return (
            <div style={{ padding: 10 }} className="test-paper-list">
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
                                name="examName"
                            >
                                <Input
                                    placeholder="请输入试卷名称"
                                    style={{ width: 180 }}
                                    value={formData.examName}
                                    onChange={(e) => this.handleChangeItem('examName', e.target.value)}
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
                                    {
                                        subjectsList.map((item) => {
                                            return (
                                                <Option value={item.subjectId}>{item.subjectName}</Option>
                                            )
                                        })
                                    }
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
                            dataSource={paperList}
                            scroll={{ x: 1800 }}
                            pagination={false}
                        />
                        <Pagination
                            style={{ float: 'right', marginTop: 20}}
                            showQuickJumper
                            showSizeChanger={true}
                            current={currentPage}
                            total={totalPaperCount}
                            pageSize={pageSize}
                            onChange={this.onChangePage}
                        />
                    </Content>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    paperList: state.papers.paperList,
    totalPaperCount: state.papers.totalPaperCount,
    modifyPaperSuccess: state.papers.modifyPaperSuccess,
    subjectsList: state.subjects.subjectsList,
});
 
const mapDispatchToProps = dispatch => ({
    getSubjects: params => dispatch(subjects.getSubjects(params)),
    getPaperList: (params) => dispatch(papers.getPaperList(params)),
    dropPaper: (params) => dispatch(papers.dropPaper(params)),
    modifyPaper: (params) => dispatch(papers.modifyPaper(params)),
});
 
export default WrappedComponent(connect(
    mapStateToProps,
    mapDispatchToProps,
)(app));