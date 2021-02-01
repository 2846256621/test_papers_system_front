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
        }
    }

    componentDidMount(){
        const { getPoints, getAllSubjects } = this.props;
        const { pageSize, currentPage } = this.state;
        getPoints({pageSize, currentPage});
        getAllSubjects();
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
                title: '知识点所属学科',
                dataIndex: 'subjectName',
                key: 'subjectName',
            },
            {
                title: '操作',
                key: '',
                render: (text, record) => (
                    <Space size="middle">
                        <a onClick={ () => { this.pointManageModal('modify', record)}}>修改知识点</a>
                        <a onClick={() => {this.onDelPoint(record.pointId)}}>删除知识点</a>
                    </Space>
                ),
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
        getPoints({...formData,currentPage, pageSize});
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
        if(type === 'add') {
            if(!Object.keys(modalFormDate).length || modalFormDate.pointName === '') {
                message.error({
                    content: '未添加，不得保存',
                    className: 'custom-class',
                    style: {marginTop: '30vh'},
                });
            } else {
                const { addPoint, pointAddSuccess, getPoints } = this.props;
                addPoint(modalFormDate);
                if (pointAddSuccess) {
                    const { modalFormDate } = this.state;
                    const tempFormData = modalFormDate;
                    tempFormData.pointName = '';
                    tempFormData.subjectId = '';
                    this.setState({
                        modalFormDate: tempFormData,
                    }, getPoints({pageSize, currentPage}));
                }
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
                const { updatePoint, pointUpdateSuccess, getPoints } = this.props;
                updatePoint(tempModalFormDate);
                if (pointUpdateSuccess) {
                    const { modalFormDate } = this.state;
                    const tempFormData = modalFormDate;
                    tempFormData.pointName = '';
                    tempFormData.subjectId = '';
                    this.setState({
                        modalFormDate: tempFormData,
                    }, getPoints({pageSize, currentPage}));
                }
            }
        }
    }

    // 添加或修改弹窗
    pointManageModal = (type, record) => {
        const { modalFormDate } = this.state;
        const { subjectsAllList } = this.props; 
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
                            label="知识点所属学科"
                            name="subjectId"
                        >
                            <Select
                                placeholder="请选择学科"
                                value={modalFormDate.subjectName}
                                onChange={ (e) => { this.handleChangeModalItem('subjectId', e)}}
                            >
                                {
                                    subjectsAllList.map(item => (
                                        <Option value={item.subjectId}>{item.subjectName}</Option>
                                    ))
                                }
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
    onDelPoint = (id) => {
        confirm({
            title: '系统提示',
            icon: <ExclamationCircleOutlined />,
            content: `确定要知识点${id}吗？`,
            style: { marginTop: 150 },
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                const { dropPoint, getPoints } = this.props;
                const { currentPage, pageSize } = this.state;
                dropPoint({ pointId: id });
                getPoints({ currentPage, pageSize });
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
            getPoints({currentPage, pageSize});
        });
    }

    render() {
        const { formData, modalFormDate, currentPage, pageSize } = this.state;
        const { pointsList, totalPointsCount, subjectsAllList } = this.props;
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
                                label="学科"
                                name="subjectId"
                            >
                                <Select
                                    style={{ width: 180 }}
                                    placeholder="请选择学科"
                                    value={formData.subjectName}
                                    onChange={(e) => { this.handleChangeItem('subjectId', e)}}
                                >
                                    {
                                        subjectsAllList.map(item => (
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
    subjectsAllList: state.subjects.subjectsAllList,
});
const mapDispatchToProps = (dispatch) => ({
    getAllSubjects: (params) => dispatch(subjects.getAllSubjects(params)),
    getPoints: (params) => dispatch(points.getPoints(params)),
    addPoint: (params) => dispatch(points.addPoint(params)),
    updatePoint: (params) => dispatch(points.updatePoint(params)),
    dropPoint: (params) => dispatch(points.dropPoint(params)),
});

export default WrappedComponent(connect(
    mapStateToProps,
    mapDispatchToProps
)(app));