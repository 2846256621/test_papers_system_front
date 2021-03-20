import React, { Component } from 'react'
import {
    Table,
    Form,
    Space,
    Breadcrumb,
    Layout,
    Select,
    Input,
    Button,
    Card,
    Modal,
    Pagination,
    message,
} from 'antd';
import './index.scss';
import { connect } from 'react-redux'; 
import { ExclamationCircleOutlined } from '@ant-design/icons';
import points from '../../../../store/actions/points';
import subjects from '../../../../store/actions/subjects';
import WrappedComponent from '../component/wrapComponent';
const { Content } = Layout;
const { Option } = Select;
const { confirm } = Modal;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
};
class app extends Component {
    constructor(props){
        super(props);
        this.state = {
            formData: {
                subjectId: '',
                pointName: '',
            },
            modalFormDate: {},
            check: {},
            pageSize: 10,
            currentPage: 1,
            userId: window.localStorage.getItem('userId'),
            type: window.localStorage.getItem('type'),
        }
    }

    componentDidMount(){
        const { getPoints, getSubjects } = this.props;
        const { pageSize, currentPage } = this.state;
        getPoints({pageSize, currentPage, userId: window.localStorage.getItem('userId')});
        getSubjects();
    }

    getColumns = () => {
        return [
            {
                title: '知识点ID',
                dataIndex: 'pointId',
                key: 'pointId',
            },
            {
                title: '知识点名称',
                dataIndex: 'pointName',
                key: 'pointName',
            },
            {
                title: '知识点所属课程',
                dataIndex: 'subjectName',
                key: 'subjectName',
            },
            {
                title: '知识点所属章节',
                dataIndex: 'chapter',
                key: 'chapter',
            },
            {
                title: '操作',
                key: '',
                render: (text, record) => {
                    const { userId, type } = this.state;
                    return (
                        <Space size="middle">
                            {
                               (+userId === record.userId || type === '1')  ?
                                <>
                                    <a onClick={ () => { this.pointManageModal('modify', record)}}>修改</a>
                                    <a onClick={() => {this.onDelPoint(record.pointId, record.pointName)}}>删除</a>
                                </>
                                : '无'
                            }
                        </Space>
                    )
                } 
              },
          ];
          
    }
    
    handleChangeItem = (filedName, value) => {
        console.log('filedName, value', filedName, value)
        const { formData } = this.state;
        const tempFormDate = Object.assign({}, formData, { [filedName]: value });
        this.setState({
            formData: tempFormDate,
        });
    }


    onSubmit = () => {
        const { currentPage, pageSize, formData } = this.state;
        const { getPoints } = this.props;
        getPoints({...formData,currentPage, pageSize, userId: window.localStorage.getItem('userId')});
    }

    handleChangeModalItem = (filedName, value) => {
        console.log('filedName, value', filedName, value)
        const { modalFormDate } = this.state;
        const tempModalFormDate = Object.assign({}, modalFormDate, { [filedName]: value });
        this.setState({
            modalFormDate: tempModalFormDate,
        });
    }

    // 确认添加或修改
    onOkModify = (type, record) => {
        const { modalFormDate, currentPage, pageSize } = this.state;
        //TODO: 可以返回record，使用id回显
        if(type === 'add') {
            if(!Object.keys(modalFormDate).length || modalFormDate.pointName === '') {
                message.error({
                    content: '未添加，不得保存',
                    className: 'custom-class',
                    style: {marginTop: '30vh'},
                });
            } else {
                const { addPoint, getPoints } = this.props;
                const tempParams = Object.assign({}, modalFormDate, { userId: window.localStorage.getItem('userId')});
                addPoint(tempParams);
                setTimeout(() => {
                    const { pointAddSuccess } = this.props;
                    if (pointAddSuccess) {
                        const { modalFormDate } = this.state;
                        const tempFormData = modalFormDate;
                        tempFormData.pointName = '';
                        tempFormData.subjectId = '';
                        this.setState({
                            modalFormDate: tempFormData,
                        }, getPoints({pageSize, currentPage, userId: window.localStorage.getItem('userId')}));
                    }
                }, 500); 
            }
        }
        if( type === 'modify'){
            if(!Object.keys(modalFormDate).length || modalFormDate.pointName === '') {
                message.error({
                    content: '未修改，不得保存',
                    className: 'custom-class',
                    style: {marginTop: '30vh'},
                });
            } else {
                const tempModalFormDate = Object.assign({}, record, modalFormDate);
                const { updatePoint, getPoints } = this.props;
                updatePoint(tempModalFormDate);
                setTimeout(() => {
                    const { pointUpdateSuccess } = this.props;
                    if (pointUpdateSuccess) {
                        const { modalFormDate } = this.state;
                        const tempFormData = modalFormDate;
                        tempFormData.pointName = '';
                        tempFormData.subjectId = '';
                        this.setState({
                            modalFormDate: tempFormData,
                        }, getPoints({pageSize, currentPage, userId: window.localStorage.getItem('userId')}));
                    }
                }, 500);
            }
        }
    }

    // 添加或修改弹窗
    pointManageModal = (type, record) => {
        console.log(record);
        const { modalFormDate } = this.state;
        const { subjectsList } = this.props;
        return (
            confirm({
                title: type === 'modify' ? '修改知识点' : '增加知识点',
                icon: <ExclamationCircleOutlined />,
                content: (
                    <Form
                        {...layout}
                        name="basic"
                        layout="Horizontal"
                        initialValues={record}
                    >
                        <Form.Item
                            label="知识点所属课程"
                            name="subjectId"
                        >
                            <Select
                                placeholder="请选择课程"
                                value={modalFormDate.subjectName}
                                onChange={(e) => { this.handleChangeModalItem('subjectId', e)}}
                            >
                                {
                                    subjectsList.map(item => (
                                        <Option value={item.subjectId}>{item.subjectName}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="所属章节"
                            name="chapter"
                        >
                            <Select
                                placeholder="请选择所属章节"
                                value={modalFormDate.chapter}
                                onChange={ (e) => { this.handleChangeModalItem('chapter', e)}}
                            >
                                <Option value={1}>第一章</Option>
                                <Option value={2}>第二章</Option>
                                <Option value={3}>第三章</Option>
                                <Option value={4}>第四章</Option>
                                <Option value={5}>第五章</Option>
                                <Option value={6}>第六章</Option>
                                <Option value={7}>第七章</Option>
                                <Option value={8}>第八章</Option>
                                <Option value={9}>第九章</Option>
                                <Option value={10}>第十章</Option>
                                <Option value={11}>第十一章</Option>
                                <Option value={12}>第十二章</Option>
                                <Option value={13}>第十三章</Option>
                                <Option value={14}>第十四章</Option>
                                <Option value={15}>第十五章</Option>
                                <Option value={16}>第十六章</Option>
                                <Option value={17}>第十七章</Option>
                                <Option value={18}>第十八章</Option>
                                <Option value={19}>第十九章</Option>
                                <Option value={20}>第二十章</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="知识点名称"
                            name="pointName"
                        >
                            <Input
                                placeholder="请输入知识点名称"
                                value={modalFormDate.pointName}
                                onChange={ (e) => { this.handleChangeModalItem('pointName', e.target.value)}}
                            />
                        </Form.Item>
                    </Form>
                ),
                style: { marginTop: 150 },
                okText: '保存',
                okType: 'danger',
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

    // 删除知识点
    onDelPoint = (id, name) => {
        confirm({
            title: '系统提示',
            icon: <ExclamationCircleOutlined />,
            content: `确定要知识点${name}吗？`,
            style: { marginTop: 150 },
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                const { dropPoint, getPoints } = this.props;
                const { currentPage, pageSize } = this.state;
                dropPoint({ pointId: id });
                getPoints({ currentPage, pageSize, userId: window.localStorage.getItem('userId') });
            },
            onCancel: () => {
                console.log('Cancel');
            },
        });
    }

    onChangePage = (page, pageSize) => {
        this.setState({
            currentPage: page,
            pageSize,
        }, () => {
            const { getPoints } = this.props;
            const { currentPage, pageSize } = this.state;
            getPoints({currentPage, pageSize, userId: window.localStorage.getItem('userId')});
        });
    }

    render() {
        const { formData, modalFormDate, currentPage, pageSize } = this.state;
        const { pointsList, totalPointsCount, subjectsList } = this.props;
        return (
            <div style={{ padding: 10 }}>
                <Card title={
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>自动组卷系统</Breadcrumb.Item>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>试题管理</Breadcrumb.Item>
                        <Breadcrumb.Item>知识点管理</Breadcrumb.Item>
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
                                label="课程"
                                name="subjectId"
                            >
                                <Select
                                    style={{ width: 180 }}
                                    placeholder="请选择学科"
                                    value={formData.subjectName}
                                    onChange={(e) => { this.handleChangeItem('subjectId', e)}}
                                >
                                    {
                                        subjectsList.map(item => (
                                            <Option value={item.subjectId} key={item.subjectId}>
                                                {item.subjectName}
                                            </Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="知识点"
                                name="pointName"
                            >
                                <Input
                                    style={{ width: 180 }}
                                    placeholder="请输入知识点名称"
                                    value={formData.pointName}
                                    onChange={(e) => { this.handleChangeItem('pointName', e.target.value)}}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={this.onSubmit}>
                                    查询
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    onClick={ () => { this.pointManageModal('add', modalFormDate)}}
                                >
                                    添加知识点
                                </Button>
                            </Form.Item>
                        </Form>
                    
                        <Table
                            style={{ marginTop: 20 }}
                            bordered
                            columns={this.getColumns()}
                            dataSource={pointsList}
                            hideOnSinglePage={true}
                            pagination={false}
                        />
                        <Pagination
                            style={{ float: 'right', marginTop: 20}}
                            showQuickJumper
                            showSizeChanger={true}
                            current={currentPage}
                            total={totalPointsCount}
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
    pointsList: state.points.pointsList,
    totalPointsCount: state.points.totalPointsCount,
    subjectsList: state.subjects.subjectsList,
    pointUpdateSuccess: state.points.pointUpdateSuccess,
    pointAddSuccess: state.points.pointAddSuccess,
});
const mapDispatchToProps = (dispatch) => ({
    getSubjects: params => dispatch(subjects.getSubjects(params)),
    getPoints: (params) => dispatch(points.getPoints(params)),
    addPoint: (params) => dispatch(points.addPoint(params)),
    updatePoint: (params) => dispatch(points.updatePoint(params)),
    dropPoint: (params) => dispatch(points.dropPoint(params)),
});

export default WrappedComponent(connect(
    mapStateToProps,
    mapDispatchToProps
)(app));