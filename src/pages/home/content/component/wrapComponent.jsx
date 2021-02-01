import React, { Component } from 'react'
import { Layout } from 'antd';
import Nav from '../../nav';
import Head from '../../header';
const { Header, Sider } = Layout;

export default (WrappedComponent) => {
    return class extends Component {
        constructor(props){
            super(props);
        }
        render() {
            return (
                <Layout>
                    <Header style={{ paddingLeft: 10, paddingRight: 10, height: 70 }}>
                        <Head />
                    </Header>
                    <Layout>
                        <Sider width={200} style={{ backgroundColor: '#fff'}}>
                            <Nav />
                        </Sider>
                        <Layout>
                            <WrappedComponent {...this.props}/>
                        </Layout>
                    </Layout>
                </Layout>
            );
        }
    };
}
