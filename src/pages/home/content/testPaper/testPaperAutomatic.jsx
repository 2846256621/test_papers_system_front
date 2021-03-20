import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Breadcrumb,
    Layout,
    Card,
    Form,
    Input,
    Button,
    Select,
    Table,
    Space,
    DatePicker,
    message,
} from 'antd';
import BaseForm from '../component/BaseForm';
import points from '../../../../store/actions/points';
import subjects from '../../../../store/actions/subjects';
import WrappedComponent from '../component/wrapComponent';
import './index.css';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
const { Content } = Layout;
const { Option }  = Select;

const data = [{
    key: 1,
    problemType: 'choice',
    problemTypeText: `选择题`,
    problemTypeNum: '',
    problemTypeScore: '',
},{
    key: 2,
    problemType: 'judgement',
    problemTypeText: `判断题`,
    problemTypeNum: '',
    problemTypeScore: '',
},{
    key: 3,
    problemType: 'multiple',
    problemTypeText: `多选题`,
    problemTypeNum: '',
    problemTypeScore: '',
},{
    key: 4,
    problemType: 'blank',
    problemTypeText: `填空题`,
    problemTypeNum: '',
    problemTypeScore: '',
},{
    key: 5,
    problemType: 'shotAnswer',
    problemTypeText: `简答题`,
    problemTypeNum: '',
    problemTypeScore: '',
}];
class app extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedRowKeys: [],
            testPaperInfo: {},
            problemTypeInfo: [],
            check: {},
        }
    }

    componentDidMount(){
        const { getSubjects } = this.props;
        getSubjects();
    }

    myForm = React.createRef('myForm');

    getColumns = () => {
        const { check } = this.state;
        return [
            {
                title: '题型',
                dataIndex: 'problemTypeText',
                width: 50,
            },
            {
                title: '题目数量',
                dataIndex: 'problemTypeNum',
                width: 150,
                render: (text, record) => {
                    const { selectedRowKeys } = this.state;
                    return (
                        <BaseForm
                            warning={check.problemTypeNum}
                            required={selectedRowKeys.indexOf(record.key) !== -1}
                        >
                            <Input
                                placeholder="请输入题目数量"
                                onChange={(e) => this.onChangeProblemItem('problemTypeNum', record, e.target.value)}
                                disabled={selectedRowKeys.indexOf(record.key) === -1}
                            />
                        </BaseForm>
                    )
                }
            },
            {
                title: '每题分数',
                dataIndex: 'problemTypeScore',
                width: 150,
                render: (text, record) => {
                    const { selectedRowKeys } = this.state;
                    return(
                        <BaseForm
                            warning={check.problemTypeScore}
                            required={selectedRowKeys.indexOf(record.key) !== -1}
                        >
                            <Input
                                placeholder="请输入此类题型的分数"
                                onChange={(e) => this.onChangeProblemItem('problemTypeScore', record, e.target.value)}
                                disabled={selectedRowKeys.indexOf(record.key) === -1}
                            />
                        </BaseForm>
                    )
                }
            },
        ];
    }

    // 题目与分数的关联
    onChangeProblemItem = (filed, record, value) => {
        const { problemTypeInfo } = this.state;
        const tempProblemTypeInfo = problemTypeInfo;
        tempProblemTypeInfo.forEach(item => {
            if (item.key === record.key) {
                if (filed === 'problemTypeNum') {
                    item.problemTypeNum = value;
                }
                if (filed === 'problemTypeScore'){
                    item.problemTypeScore = value;
                }
            }
        });
        this.setState({
            problemTypeInfo: tempProblemTypeInfo,
        });
    }

    // 选择题型
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
        const tempProblemTypeInfo = [];
        data.forEach((item) => {
            selectedRowKeys.forEach(val => {
                if (item.key === val) {
                    tempProblemTypeInfo.push(item);
                }
            })
        });
        this.setState({
            problemTypeInfo: tempProblemTypeInfo,
        });
    };

    // 处理单个字段变更
    onFieldsChange = (filedName, value) => {
        console.log('filed, value', filedName, value);
        const { testPaperInfo } = this.state;
        const tempTestPaperInfo = Object.assign({}, testPaperInfo, { [filedName]: value });
        if(filedName === 'subjectId'){
            tempTestPaperInfo.points = [];
            const { getAllPoints } = this.props;
            getAllPoints({subjectId: value});
        }
        this.setState({
            testPaperInfo: tempTestPaperInfo,
        });
    }

    // 重置
    resetForm = () => {
        this.myForm.current.resetFields();
        this.setState({
            check: {},
            selectedRowKeys: [],
        })
    }

    onCheck = () => {
        const { check, testPaperInfo, selectedRowKeys } = this.state;
        const {
            examName,
            startTime,
            endTime,
            subjectId,
            points,
            difficulty,
            problemTypeInfo,
        } = testPaperInfo;
        check.examName = !examName ? '请输入试卷名称' : '';
        check.startTime = !startTime ? '请选择考试开始时间' : '';
        check.endTime = !endTime ? '请输入考试结束时间': '';
        check.subject = !subjectId ? '请选择课程' : '';
        check.points = !points ? '请选择选择包含知识点' : '';
        check.difficulty = !difficulty ? '请输入试卷难度' : '';
        problemTypeInfo.forEach((item) => {
            selectedRowKeys.forEach(val => {
                if (item.key === val) {
                    check.problemTypeNum = !item.problemTypeNum ? '请输入题目数量' : '';
                    check.problemTypeScore = !item.problemTypeScore ? '请输入此类题目的分数' : '';
                }
            })
        });
        this.setState({
            check,
        });
        return check;
    }

    // 开始组卷
    startAutomatic = () => {
        console.log('开始组卷');
        const { testPaperInfo, problemTypeInfo } = this.state;
        const tempTestPaperInfo = testPaperInfo;
        tempTestPaperInfo.problemTypeInfo = problemTypeInfo;
        this.setState({
            testPaperInfo: tempTestPaperInfo,
        }, () => {
            const check = this.onCheck();
            const { testPaperInfo } = this.state;
            if (Object.values(check).filter((item) => !!item).length > 0) return null;
            console.log('表单信息======',this.state.testPaperInfo );
            if (testPaperInfo.problemTypeInfo.length === 0) {
                message.error({
                    content: '请先选择试卷包含题型，再开始组卷!',
                    className: 'custom-class',
                    style: {marginTop: '30vh'},
                });
            }
            this.props.history.push('/testPaperDetails');
        });
    }

    render() {
        const { selectedRowKeys, check, testPaperInfo } = this.state;
        const { pointsList, subjectsList } = this.props;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return (
            <div style={{ padding: 10 }}>
                <Card title={
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>自动组卷系统</Breadcrumb.Item>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>试题管理</Breadcrumb.Item>
                        <Breadcrumb.Item>自动组卷</Breadcrumb.Item>
                    </Breadcrumb>
                }>
                    <Content
                        className="site-layout-background test-paper-automatic"
                    >
                       <Card title="开始组卷"  extra={
                           <Link to="/testPaperList">历史组卷列表</Link>
                       }>
                            <Form
                                ref={this.myForm}
                                className="test-paper-form"
                            >
                                 <Form.Item
                                    label="考试名称"
                                    name="examName"
                                    required
                                >
                                    <BaseForm
                                        warning={check.examName}
                                        required={true}
                                    >
                                        <Input
                                            placeholder="请输入考试名称"
                                            alue={testPaperInfo.examName}
                                            onChange={(e) => { this.onFieldsChange('examName', e.target.value)}}
                                        />
                                    </BaseForm>
                                </Form.Item>
                                
                                <Form.Item
                                    label="考试开始时间"
                                    name="startTime"
                                    required
                                >
                                    <BaseForm
                                        warning={check.startTime}
                                        required={true}
                                    >
                                        <DatePicker
                                            showTime
                                            locale={locale}
                                            format="YYYY-MM-DD HH:mm:ss"
                                            placeholder="请选择考试开始时间"
                                            style={{ width: '100%' }}
                                            onChange={(time, timeString) => { this.onFieldsChange('startTime', timeString)}}
                                        />
                                    </BaseForm>
                                </Form.Item>

                                <Form.Item
                                    label="考试结束时间"
                                    name="endTime"
                                    required
                                >
                                    <BaseForm
                                        warning={check.endTime}
                                        required={true}
                                    >
                                        <DatePicker
                                            showTime
                                            locale={locale}
                                            format="YYYY-MM-DD HH:mm:ss"
                                            placeholder="请选择考试结束时间"
                                            style={{ width: '100%' }}
                                            onChange={(time, timeString) => { this.onFieldsChange('endTime', timeString)}}
                                        />
                                    </BaseForm>
                                </Form.Item>

                                <Form.Item
                                    label="选择课程"
                                    name="subjectId"
                                    required
                                >
                                    <BaseForm
                                        warning={check.subject}
                                        required={true}
                                    >
                                        <Select
                                            placeholder="请选择课程"
                                            value={testPaperInfo.subjectId}
                                            onChange={(e) => { this.onFieldsChange('subjectId', e)}}
                                        >
                                            {
                                                subjectsList.map(item => (
                                                    <Option value={item.subjectId} key={item.subjectId}>
                                                        {item.subjectName}
                                                    </Option>
                                                ))
                                            }
                                        </Select>
                                    </BaseForm>
                                </Form.Item>
                                <Form.Item
                                    label="选择包含知识点"
                                    name="points"
                                    required
                                >
                                    <BaseForm
                                        warning={check.points}
                                        required={true}
                                    >
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            placeholder="请选择试卷所包含的知识点"
                                            value={testPaperInfo.points}
                                            onChange={(e) => { this.onFieldsChange('points', e)}}
                                            disabled={!testPaperInfo.subjectId ? true : false}
                                        >
                                            {
                                                pointsList.map(item => {
                                                    return (
                                                        <Option value={item.id}>{item.pointName}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </BaseForm>
                                </Form.Item>
                                <Form.Item
                                    label="期望试卷难度"
                                    name="difficulty"
                                    required
                                >
                                    <BaseForm
                                        warning={check.difficulty}
                                        required={true}
                                    >
                                        <Input
                                            value={testPaperInfo.difficulty}
                                            placeholder="请输入试卷难度（0~1）"
                                            onChange={(e) => { this.onFieldsChange('difficulty', e.target.value)}}
                                        />
                                    </BaseForm>
                                </Form.Item>
                                <Form.Item
                                    label="试卷包含题型"
                                    name="problemType"
                                    required
                                >
                                    <Table
                                        rowSelection={rowSelection}
                                        columns={this.getColumns()}
                                        dataSource={data}
                                        pagination={false}
                                        bordered
                                    />
                                </Form.Item>

                                <Form.Item wrapperCol={{ offset: 8 }} style={{ marginTop: 30 }}>
                                    <Space size={50}>
                                        <Button
                                            onClick={() => { this.resetForm()}}
                                        >
                                            重置
                                        </Button>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            onClick={ () => { this.startAutomatic()}}
                                        >
                                            开始组卷
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </Form>
                       </Card>
                    </Content>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    pointsList: state.points.pointsList,
    subjectsList: state.subjects.subjectsList,
});
 
const mapDispatchToProps = dispatch => ({
    getPoints: (params) => dispatch(points.getPoints(params)),
    getSubjects: (params) => dispatch(subjects.getSubjects(params)),
});
 
export default WrappedComponent(connect(
    mapStateToProps,
    mapDispatchToProps,
)(app));