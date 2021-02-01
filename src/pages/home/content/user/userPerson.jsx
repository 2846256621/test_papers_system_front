import React, { Component } from 'react'
import {
    Table,
    Form,
    Space,
    Breadcrumb,
    Layout,
    Tag,
    Input,
    Button,
    Card,
    Modal,
} from 'antd';
import WrapComponent  from '../component/wrapComponent';
const { Content } = Layout;
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

class app extends Component {
    constructor(props){
        super(props);
        this.state = {
            usernameDisabled: true,
            passwordDisabled: true,
        }
    }

    formRef = React.createRef();

    onFinish = (values) => {
        console.log('Success:', values);
      };
    
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // 保存修改
    savePersonChange = () => {

    }

    // 取消保存
    cancalSavePersonChange = () => {
        this.formRef.current.resetFields();
        this.setState({
            usernameDisabled: true,
            passwordDisabled: true,
        })
    }

    render() {
        const { usernameDisabled, passwordDisabled } = this.state;
        return (
            <div style={{ padding: 10 }}>
                <Card
                    title={
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>自动组卷系统</Breadcrumb.Item>
                            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                            <Breadcrumb.Item>账号管理</Breadcrumb.Item>
                            <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                        </Breadcrumb>
                    }
                >
                    <Content
                        className="site-layout-background"
                    >
                        <Card
                            style={{ width: '80%' }}
                            title="修改个人信息"
                            extra={
                                <Space>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            this.setState({
                                                usernameDisabled: false,
                                            });
                                        }}
                                    >
                                        修改用户名
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            this.setState({
                                                passwordDisabled: false,
                                            });
                                        }}
                                    >
                                        修改密码
                                    </Button>
                                </Space>
                            }
                        >
                            <Form
                                {...layout}
                                name="basic"
                                layout="horizontal"
                                style={{ width: '70%' }}
                                className="person-form"
                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}
                                ref={this.formRef}
                            >
                                <Form.Item
                                    label="用户名"
                                    name="username"
                                    rules={[{ required: !this.state.usernameDisabled, message: '请输入新用户名' }]}
                                >
                                    <Input
                                        placeholder="请输入新用户名"
                                        disabled={usernameDisabled}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="密码"
                                    name="password"
                                    rules={[{ required: !this.state.passwordDisabled, message: '请输入新密码' }]}
                                >
                                    <Input
                                        placeholder="请输入新密码"
                                        disabled={passwordDisabled}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="确认密码"
                                    name="againPassword"
                                    rules={[{ required: !this.state.passwordDisabled, message: '请再次输入新密码' }]}
                                >
                                    <Input
                                        placeholder="请再次输入新密码"
                                        disabled={passwordDisabled}
                                    />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 8 }}>
                                    <Space size={50}>
                                        <Button
                                            disabled={usernameDisabled && passwordDisabled}
                                            onClick={() => { this.cancalSavePersonChange()}}
                                        >
                                            取消
                                        </Button>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            onClick={ () => { this.savePersonChange()}}
                                            disabled={usernameDisabled && passwordDisabled}
                                        >
                                            保存
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
export default WrapComponent(app);