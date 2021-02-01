import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {
    Card,
    Form,
    Input,
    Button,
    Row,
    Col,
    Divider,
    message,
 } from 'antd';
import $ajax from '../../utils/ajax';
import APIS from '../../constants/api';
import './index.css';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const tailLayout = {
    wrapperCol: { offset: 6, span: 10 },
};

const rules = {
    username: [{
        required: true,
        message: '请输入用户名',
    }],
    password: [{
        required: true,
        message: '请输入密码',
    }],
    againPassword: [{
        required: true,
        message: '请再次输入密码',
    }]
}

export default class app extends Component {

    constructor(props){
        super(props);
        this.state = {
            formData: {},
            message: '',
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
        }, this.onRegister);
    };
    
    onRegister = () => {
        const { formData } = this.state;
        if( formData.againPassword !== formData.passWord) {
            message.error({
                content: '密码输入不一致！请重新输入',
                className: 'custom-class',
                style: {marginTop: '30vh'},
            });
        } else {
            $ajax.common({
                method: 'post',
                api: APIS.userRegister,
                params: formData,
                contentType: 'json',
            }).then(res => {
                if (res.code === 10018 && res.success === true) { 
                    message.success(res.message);
                    this.setState({
                        message: <p style={{ marginLeft: 30, color: 'green'}}> { res.message }</p>,
                    });
                } else {
                    this.setState({
                        message: <p style={{ marginLeft: 30, color: 'red'}}> { res.message }</p>,
                    });
                }
            }).catch(err => {
                console.log(err);
            });
        }
        
    }

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    onReset = () => {
        this.formRef.current.resetFields();
    };

    render() {
        const { formData, message, verificationCode, date } = this.state;
        return (
            <Card
                title="欢迎注册"
                extra={<Link to='/login'>去登录</Link>}
                id="signIn-container"
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
                        name="userName"
                        rules={rules.username}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="passWord"
                        rules={rules.password}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" />
                    </Form.Item>

                    <Form.Item
                        label="确认密码"
                        name="againPassword"
                        rules={rules.againPassword}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请再次输入密码" />
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
                    { message }
                    <Divider dashed />

                    <Form.Item {...tailLayout}>
                        <Row>
                            <Col span={4}>
                                <Button type="primary" htmlType="submit">
                                    注册
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
