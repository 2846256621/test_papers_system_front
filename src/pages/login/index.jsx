import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import login from '../../store/actions/login';
import {
    Card,
    Form,
    Input,
    Button,
    Radio,
    Row,
    Col,
    Divider,
    message,
 } from 'antd';
import './index.css';
import APIS from '../../constants/api';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const tailLayout = {
    wrapperCol: { offset: 6, span: 10 },
};

const rules = {
    userName: [{
        required: true,
        message: '请输入用户名',
    }],
    passWord: [{
        required: true,
        message: '请输入密码',
    }],
    loginType: [{
        required: true,
        message: '请选择登录方式',
    }],
    verificationCode: [{
        required: true,
        message: '请输入验证码',
    }]
}

class app extends Component {

    constructor(props){
        super(props);
        this.state = {
            formData: {},
            verificationCode: '',
            date: new Date(),
        };
    }

    formRef = React.createRef();

    handleChangeItem = (filde, value) => {
        this.setState({
            verificationCode: value,
        });
    }
    onFinish = (values) => {
        const { verificationCode } = this.state;
        this.setState({
            formData: {...values, type: 0, verificationCode},
        }, this.handleLogin);
    }

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error({
            content: '请输入完整信息',
            className: 'custom-class',
            style: {marginTop: '30vh'},
        });
    };

    onReset = () => {
        this.formRef.current.resetFields();
    };

    handleLogin = () => {
        const { onLogin } = this.props;
        const { formData } = this.state;
        onLogin({ formData, props: this.props });
    }
    render() {
        const { formData, date, verificationCode } = this.state;
        return (
            <Card
                title="欢迎登录自动组卷系统"
                extra={<Link to='/signIn'>去注册</Link>}
                id="login-container"
            >
                 <Form
                    {...layout}
                    name="basic"
                    initialValues={formData}
                    ref={this.formRef}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="用户名"
                        name="usernName"
                        rules={rules.userName}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="passWord"
                        rules={rules.passWord}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" />
                    </Form.Item>

                    <Form.Item
                        label="账号类型"
                        name="type"
                        rules={rules.loginType}
                    >
                        <Radio.Group
                            label="Radio.Group"
                            name="radio-group"
                        >
                            <Radio value={1}>用户</Radio>
                            <Radio value={2}>管理员</Radio>
                        </Radio.Group>
                    </Form.Item>
                    
                    <Form.Item
                        label="验证码"
                        name="verificationCode"
                    >
                        <Input
                            style={{width: 85}}
                            placeholder="验证码"
                            value={verificationCode || undefined}
                            onChange={(e) => this.handleChangeItem('verificationCode', e.target.value)}
                        />
                        <img
                            style={{width: 100, marginLeft: 10, height: 32 }}
                            src={`${APIS.verificationCode}?${date}`}
                        />
                    </Form.Item>
                    
                    <Divider dashed />

                    <Form.Item {...tailLayout}>
                        <Row>
                            <Col span={4}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                >
                                    登录
                                </Button>
                            </Col>
                            <Col span={4} offset={16}>
                                <Button htmlType="button" onClick={this.onReset}>
                                    重置
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

const mapStateToProps = state => ({
    username: state.login.username,
});
 
const mapDispatchToProps = dispatch => ({
    onLogin: (params) => dispatch(login.onLogin(params)),
});
 
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(app);