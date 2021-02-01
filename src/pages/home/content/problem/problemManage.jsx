import React, { Component } from 'react';
import {
    Form,
    Button,
    Input,
    Tag,
    Row,
    Col,
    Breadcrumb,
    Layout,
    Radio,
    Card,
} from 'antd';
import './index.css';
import WrappedComponent from '../component/wrapComponent';
import SearchProblem from './problemSearch';
import BaseForm from '../component/BaseForm';

const { TextArea } = Input;
const { Content } = Layout;
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const questionExample = {
    choice:'输入题目，形如--人体最大的细胞是()。注意需要考生答题部分用括号表示。',
    judgement: '输入题目，形如--计算机网络是一门很有意思的课程。注意需要考生答题部分用括号表示。',
    blank: '输入题目，形如--从计算机网络系统组成的角度看，计算机网络可以分为____和____。注意需要考生答题部分用下划线表示。',
    showAnswer: '输入题目，形如--你为什么喜欢计算机网络这门课程呢？'
}

class app extends Component {
    constructor(props){
        super(props);
        this.state = {
            formData: {
                problemType: 'choice',
                subject: '',
                difficultyLevel: '',
                knowledgePoints: '',
                problemText: '',
                answer: '',
                choiceOptionA: '',
                choiceOptionB: '',
                choiceOptionC: '',
                choiceOptionD: '',
                score:'',
            },
            check: {},
            disable: false,
            required: true,
            type: this.props.match.params.type,
        }
    }

    formRef = React.createRef();
    // 单选
    renderChoice = () => {
        const { formData, check, disable, required} = this.state;
        return(
            <div className="problems_layout">
                <Form.Item
                    label=""
                    name="choiceOptionD"
                    className="problems_layout"
                    {...layout}
                >
                    <BaseForm
                        warning={check.choiceOptionA}
                        required={required}
                    >
                        <Tag color="green">选项</Tag>：输入选项内容
                        <div key='A' className="problems_option_layout">
                            <Tag color="blue">A</Tag>
                            <Input
                                className="problems_input_layout"
                                placeholder={`请输入选项A的内容`}
                                value={formData.choiceOptionA}
                                onChange={(e) => {
                                    this.handleChangeItem(`choiceOptionA`, e.target.value);
                                }}
                                disabled={disable}
                            />
                        </div>
                    </BaseForm>
                    
                    <BaseForm
                        warning={check.choiceOptionB}
                        required={required}
                    >
                        <div key='B' className="problems_option_layout">
                            <Tag color="blue">B</Tag>
                            <Input
                                className="problems_input_layout"
                                placeholder={`请输入选项B的内容`}
                                value={formData.choiceOptionB}
                                onChange={(e) => {
                                    this.handleChangeItem(`choiceOptionB`, e.target.value);
                                }}
                                disabled={disable}
                            />
                        </div>
                    </BaseForm>
                    
                    <BaseForm
                        warning={check.choiceOptionC}
                        required={required}
                    >
                        <div key='C' className="problems_option_layout">
                            <Tag color="blue">C</Tag>
                            <Input
                                className="problems_input_layout"
                                placeholder={`请输入选项C的内容`}
                                value={formData.choiceOptionC}
                                onChange={(e) => {
                                    this.handleChangeItem(`choiceOptionC`, e.target.value);
                                }}
                                disabled={disable}
                            />
                        </div>
                    </BaseForm>
                    
                    <BaseForm
                        warning={check.choiceOptionD}
                        required={required}
                    >
                        <div key='D' className="problems_option_layout">
                            <Tag color="blue">D</Tag>
                            <Input
                                className="problems_input_layout"
                                placeholder={`请输入选项D的内容`}
                                value={formData.choiceOptionD}
                                onChange={(e) => {
                                    this.handleChangeItem(`choiceOptionD`, e.target.value);
                                }}
                                disabled={disable}
                            />
                        </div>
                    </BaseForm>
                </Form.Item>
                <Form.Item
                    label=""
                    name="answer"
                    {...layout}
                >
                    <BaseForm
                        warning={check.answer}
                        required={required}
                    >
                        <Tag color="green">正确答案</Tag>：
                        <Radio.Group
                            tyle={{ marginLeft: 10 }}
                            className="problems_input_layout"
                            placeholder={`请输入的此题答案`}
                            value={formData.answer}
                            onChange={(e) => {
                                this.handleChangeItem('answer', e.target.value);
                            }}
                            disabled={disable}
                        >
                            <Radio value="A">A</Radio>
                            <Radio value="B">B</Radio>
                            <Radio value="C">C</Radio>
                            <Radio value="D">D</Radio>
                        </Radio.Group>
                    </BaseForm>
                </Form.Item>
            </div>
        )
    }

    // 填空
    renderBlank = () => {
        const { formData, check, disable, required } = this.state;
        return(
            <div className="problems_layout">
                <Form.Item
                    label=""
                    name="answer"
                    {...layout}
                >
                    <BaseForm
                        warning={check.answer}
                        required={required}
                    >
                        <Tag color="green">正确答案</Tag>：请输入正确答案
                        <Input
                            style={{ marginTop: 5 }}
                            className="problems_input_layout"
                            placeholder={`请输入的此题答案，多个答案请以逗号隔开`}
                            value={formData.answer}
                            onChange={(e) => {
                                this.handleChangeItem('answer', e.target.value);
                            }}
                            disabled={disable}
                        />
                    </BaseForm>
                </Form.Item>
            </div>
        )
    }

    // 判断
    renderJudgement = () => {
        const { formData, check, disable, required } = this.state;
        return(
            <div className="problems_layout">
                <Form.Item
                    label=""
                    name="answer"
                    {...layout}
                >
                    <BaseForm
                        warning={check.answer}
                        required={required}
                    >
                        <Tag color="green">正确答案</Tag>：
                        <Radio.Group
                            style={{ marginTop: 5 }}
                            className="problems_input_layout"
                            placeholder={`请输入的此题答案`}
                            value={formData.answer}
                            onChange={(e) => {
                                this.handleChangeItem('answer', e.target.value);
                            }}
                            disabled={disable}
                        >
                            <Radio value="true">对</Radio>
                            <Radio value="false">错</Radio>
                        </Radio.Group>
                    </BaseForm>   
                </Form.Item>
            </div>
        )
    }

    // 简答
    renderShotAnswer = () => {
        const { formData, check, disable, required } = this.state;
        return(
            <div className="problems_layout">
                <Form.Item
                    label=""
                    name="answer"
                    {...layout}
                >
                    <BaseForm
                        warning={check.answer}
                        required={required}
                    >
                        <Tag color="green">正确答案</Tag>：请输入正确答案
                        <TextArea
                            style={{ marginTop: 5 }}
                            className="problems_input_layout"
                            placeholder={`请输入的此题答案`}
                            autoSize={{ minRows: 3, maxRows: 6 }}
                            value={formData.answer}
                            onChange={(e) => {
                                this.handleChangeItem('answer', e.target.value);
                            }}
                            disabled={disable}
                        />
                    </BaseForm>
                </Form.Item>
            </div>
            
        )
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            type: newProps.match.params.type,
        }, () => {
            this.handleTypeInit(this.state.type);
        })
    }

    componentDidMount() {
        const { type } = this.state;
        this.handleTypeInit(type);
    }

    // 初始化
    handleTypeInit = (type) => {
        switch (type) {
            case 'add':
                this.setState({
                    disable: false,
                });
                break;
            case 'modify':
                this.setState({
                    disable: false,
                }, this.handleGetDetails);
                break;
            case 'view':
                this.setState({
                    disable: true,
                }, this.handleGetDetails);
                break;
            default:
                break;
        }
    }

    // 获取表单详情
    handleGetDetails = () => {
        console.log('获取表单。获取表单');
    }

    // 更新对应模板
    onValuesChange = (changedValues, allValues) =>{
        console.log('更新字段', changedValues, allValues);
        this.setState({
            formData: allValues,
        }, this.renderFormItem);
    }

    // 更新字段
    handleChangeItem = (filedName, value) => {
        console.log('filedName, value', filedName, value)
        const { formData } = this.state;
        const tempFormDate = Object.assign({}, formData, { [filedName]: value });
        this.setState({
            formData: tempFormDate,
        });
    }

    // 字段校验
    onCheck = () => {
        const { formData, check } = this.state;
        const {
            answer,
            problemText,
            problemType,
            choiceOptionA,
            choiceOptionB,
            choiceOptionC,
            choiceOptionD,
            subject,
            difficultyLevel,
            knowledgePoints,
            score,
        } = formData;
        check.answer = !answer ? '请输入此题答案' : '';
        check.problemText = !problemText ? '请输入题目内容' : '';
        check.subject = !subject ? '请选择学科' : '';
        check.difficultyLevel = !difficultyLevel ? '请选择难度等级' : '';
        check.problemType = !problemType ? '请选择题目类型' : '';
        check.knowledgePoints = !knowledgePoints ? '请选择包含的知识点' : '';
        check.problemType = !problemType ? '请选择题目类型' : '';
        check.score = !score ? '请选择题目分数' : '';
        if (problemType === 'choice') {
            check.choiceOptionA = !choiceOptionA ? '请输入选项A的内容' : '';
            check.choiceOptionB = !choiceOptionB ? '请输入选项B的内容' : '';
            check.choiceOptionC = !choiceOptionC ? '请输入选项C的内容' : '';
            check.choiceOptionD = !choiceOptionD ? '请输入选项D的内容' : '';
        }
        this.setState({
            check,
        });
        return check;
    };

    // 提交
    onSubmit = () => {
        const check = this.onCheck();
        if (Object.values(check).filter((item) => !!item).length > 0) return null;
        this.formRef.current.submit();
        console.log('submit提交表单',this.state.formData);
    }
    
    // 渲染不同模板
    renderFormItem = () => {
        const { formData } = this.state;
        const { problemType } = formData;
        switch(problemType) {
            case 'choice':
                return this.renderChoice();
            case 'judgement':
                return this.renderJudgement();
            case 'blank':
                return this.renderBlank();
            case 'showAnswer':
                return this.renderShotAnswer();
            default:
                return null;
        }
    }

    render() {
        const { formData, check, disable, required, type } = this.state;
        const { problemType } = formData;
        return (
            <div className="problem_container">
                <Card title={
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>自动组卷系统</Breadcrumb.Item>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>试题管理</Breadcrumb.Item>
                        <Breadcrumb.Item>{type === 'add' ? '增加试题' : '修改试题'}</Breadcrumb.Item>
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
                            disabled={disable}
                            type={type}
                            require={required}
                        />
                        <Form
                            name="basic_template"
                            layout="vertical"
                            ref={this.formRef}
                            initialValues={formData}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                            className="problems_form_layout"
                        >
                            <Form.Item
                                    label=""
                                    name="problemText"
                                    {...layout}
                                >
                                <BaseForm warning={check.problemText}>
                                    <Tag color="green">题目</Tag>：
                                    <span>{questionExample[problemType]}</span>
                                    <TextArea
                                        placeholder="请输入题目内容"
                                        autoSize={{ minRows: 3, maxRows: 6 }}
                                        style={{ marginTop: 5 }}
                                        value={formData.problemText}
                                        onChange={(e) => {
                                            this.handleChangeItem('problemText', e.target.value);
                                        }}
                                        disabled={disable}
                                    />
                                </BaseForm>
                            </Form.Item>
                            {
                                this.renderFormItem()
                            }
                            <Row>
                                <Col span={2} offset={19}>
                                    <Form.Item className="problems_layout">
                                        <Button
                                            type="primary"
                                            onClick={this.onSubmit}
                                            disabled={disable}
                                        >
                                            保存
                                        </Button>
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item className="problems_layout">
                                        <Button
                                            type="primary"
                                            disabled={disable}
                                        >
                                            取消
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Content>
                </Card>
            </div>
        )
    }
}

export default WrappedComponent(app);
// export default app;