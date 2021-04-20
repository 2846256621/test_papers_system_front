import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import papers from "../../../../store/actions/papers";
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
            modalFormDate: {},
        }
    }
    componentDidMount(){
        const { detailsPaper } = this.props;
        const examId = this.props.history.location.search.slice(4);
        detailsPaper({examId});
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
        const { paperAttribute, problemList, paperDetails } = this.props;
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
                        <Alert message="由于组卷过程较慢，请等待组卷结果。" type="warning" showIcon closable />
                        <Card
                            style={{ marginTop: 20}}
                            title="组卷结果"
                        >
                                <Table
                                    columns={this.getResultColumns()}
                                    dataSource={[].concat(paperAttribute)}
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
                                    onClick={() => this.onModifyTestPaper(paperDetails)}
                                >
                                    修改试卷信息
                                </Button>
                            </Space>
                        }>
                                <Table
                                    columns={this.getTestPaPaerColumns()}
                                    dataSource={[].concat(paperDetails)}
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
                                    problemList.map((item, index) => {
                                        return(
                                            <Form.Item
                                                label=""
                                                name={item.answer}
                                                key={item.problemText}
                                            >
                                                {index + 1}.{item.problemText} ({item.score}分)
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

const mapStateToProps = state => ({
    paperAttribute: state.papers.paperAttribute,
    paperDetails: state.papers.paperDetails,
    problemList: state.papers.problemList,
});
 
const mapDispatchToProps = dispatch => ({
    detailsPaper: (params) => dispatch(papers.detailsPaper(params)),
});
 
export default WrappedComponent(connect(
    mapStateToProps,
    mapDispatchToProps,
)(app));