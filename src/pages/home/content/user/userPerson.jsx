import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    message,
    Alert,
} from 'antd';
import user from '../../../../store/actions/user';
import WrappedComponent from '../component/wrapComponent';
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
        const { passwordDisabled } = this.state;
        if(!passwordDisabled && (values.againPassword !== values.passWord)){
            message.error({
                content: '输入密码不一致，请重新输入',
                className: 'custom-class',
                style: {marginTop: '30vh'},
            });
            values = "";
        }
        this.savePersonChange(values);
      };
    
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // 保存修改
    savePersonChange = (values) => {
        const { modifyUser } = this.props;
        console.log("values,|||", values);
        if (values) {
            modifyUser({...values, id: window.localStorage.getItem('userId')});
            setTimeout( () => {
                const { userModifySuccess } = this.props;
                if(userModifySuccess) {
                    this.setState({
                        usernameDisabled: true,
                        passwordDisabled: true,
                    })
                }
                window.localStorage.removeItem('username');
                window.localStorage.removeItem('userId');
                window.localStorage.removeItem('type');
                this.props.history.push('/login');
            }, 500);
        }
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
            <div style={{ padding: 10 }} className="user-content">
                <Card
                    title={
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>自动组卷系统</Breadcrumb.Item>
                            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                            <Breadcrumb.Item>账号管理</Breadcrumb.Item>
                            <Breadcrumb.Item>个人中心</Breadcrumb.Item>
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
                            <Alert
                                message="注意修改个人信息之后，会退出系统需重新登录"
                                type="warning"
                                showIcon
                                closable
                            />
                            <Form
                                {...layout}
                                name="basic"
                                layout="Vertical"
                                style={{ width: '70%', marginTop: 40 }}
                                className="person-form"
                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}
                                ref={this.formRef}
                            >
                                <Form.Item
                                    label="用户名"
                                    name="userName"
                                    rules={[{ required: !this.state.usernameDisabled, message: '请输入新用户名' }]}
                                >
                                    <Input
                                        placeholder="请输入新用户名"
                                        defaultValue={window.localStorage.getItem('username')}
                                        disabled={usernameDisabled}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="密码"
                                    name="passWord"
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
const mapStateToProps = (state) => {
    return ({
        userModifySuccess: state.users.userModifySuccess,
    })
}

const mapDispatchToProps = (dispatch) => ({
    modifyUser: params => dispatch(user.modifyUser(params)),
})

export default WrappedComponent(connect(
    mapStateToProps,
    mapDispatchToProps,
)(app));