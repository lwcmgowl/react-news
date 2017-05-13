import React from 'react';
import {Row, Col} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'
import {Menu, Icon, Tabs, Form, Input, message, Button, Modal, Checkbox} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

class PcHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userName: '李伟',
            userId: 0,
            formLayout: 'horizontal'
        }
    }

    handleClick(e) {
        if (e.key == 'register') {
            this.setState({current: 'register'});
            this.setModalVisible(true);
        } else {
            {
                this.setState({current: e.key})
            }
        }
    }

    handlleSubmit(e) {
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        }
        var formData = this.props.form.getFieldsValue()
        fetch("http://newsapi.gugujiankong.com/handler.ashx?action=" + this.state.action
            + "&username=" + formData.l_userName + "&password=" + formData.l_password
            + "&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.confirmPassword, myFetchOptions).then(response => response.json()).then(json => {
            this.setState({userNickName: json.NickUserName, userId: json.UserId})
            localStorage.userid= json.UserId;
            localStorage.userNickName = json.NickUserName;
        })
        if (this.state.action=="login") {
            this.setState({hasLogined:true});
        }
        message.success('请求成功');
        this.setModalVisible(false)
    }

    setModalVisible(value) {
        this.setState({modalVisible: value})
    }

    setNull(key) {
        if (key == "register") {
            this.setState({action: 'register'})

        } else if (key == "login") {
            this.setState({action: 'login'})

        }

    }
    logout(){
        localStorage.userid= '';
        localStorage.userNickName = '';
        this.setState({hasLogined:false});
        message.success('退出成功');
    };

    render() {
        let {getFieldDecorator} = this.props.form;
        const usershow = this.state.hasLogined ? <Menu.Item key="loginout" class="register">
                    <Button type="primary" htmlType="button">{this.state.userName}</Button>
                    &nbsp;&nbsp;
                    <Link to={`/usercenter`} target="_blank"><Button type="dashed" htmlType="button">个人中心</Button></Link>
                    &nbsp;&nbsp;
                    <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
                </Menu.Item> :
                <Menu.Item key="register" class="register">
                    <Icon type="login"/>注册/登录
                </Menu.Item>
            ;
        return (
            <Row>
                <Col span={2}></Col>
                <Col span={4}>
                    <a href='/' class="logo">
                        <img src="./src/images/logo.png" alt='logo'/>
                        <span>IT News</span>
                    </a>
                </Col>
                <Col span={16}>
                    <Menu mode="horizontal" selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)}>
                        <Menu.Item key="top">
                            <Icon type="appstore"/>头条
                        </Menu.Item>
                        <Menu.Item key="society">
                            <Icon type="video-camera"/>社会
                        </Menu.Item>
                        <Menu.Item key="china">
                            <Icon type="coffee"/>国内
                        </Menu.Item>
                        <Menu.Item key="international">
                            <Icon type="global"/>国际
                        </Menu.Item>
                        <Menu.Item key="sports">
                            <Icon type="flag"/>体育
                        </Menu.Item>
                        <Menu.Item key="happy">
                            <Icon type="credit-card"/>娱乐
                        </Menu.Item>
                        <Menu.Item key="technology">
                            <Icon type="code"/>科技
                        </Menu.Item>
                        {usershow}
                    </Menu>
                    <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible}
                           onCancel={() => this.setModalVisible(false)} onOk={() => this.setModalVisible(false)}
                           okText="关闭">
                        <Tabs defaultActiveKey="login" onChange={this.setNull.bind(this)}>
                            <TabPane tab={<span><Icon type="user"/>注册</span>} key="register">
                                <Form layout={this.state.formLayout} onSubmit={this.handlleSubmit.bind(this)}>
                                    <FormItem label='账户'>
                                        {getFieldDecorator('r_userName', {
                                            rules: [{required: true, message: 'Please input your username!'}],
                                        })(
                                            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                   placeholder="请输入用户名"/>
                                        )}
                                    </FormItem>
                                    <FormItem label='密码'>
                                        {getFieldDecorator('r_password', {
                                            rules: [{
                                                required: true, message: 'Please input your password!',
                                            }, {
                                                validator: this.checkConfirm,
                                            }],
                                        })(
                                            <Input type="password" placeholder="请输入密码"/>
                                        )}
                                    </FormItem>
                                    <FormItem label='确认密码'>
                                        {getFieldDecorator('confirmPassword', {
                                            rules: [{
                                                required: true, message: 'Please confirm your password!',
                                            }, {
                                                validator: this.checkPassword,
                                            }],
                                        })(
                                            <Input type="password" placeholder="请再次输入密码"/>
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        <Button type="primary" htmlType="submit" size="large">注册</Button>
                                    </FormItem>
                                </Form>
                            </TabPane>
                            <TabPane tab={<span><Icon type="login"/>登录</span>} key="login">
                                <Form horizontal onSubmit={this.handlleSubmit.bind(this)}>
                                    <FormItem label='账户'>
                                        <Input placeholder="请输入账号" {...getFieldDecorator('l_userName')}/>
                                    </FormItem>
                                    <FormItem label='密码'>
                                        <Input placeholder="请输入密码" {...getFieldDecorator('l_password')}/>
                                    </FormItem>
                                    <FormItem >
                                        <Button type="primary" htmlType="submit" size="large">登录</Button>
                                    </FormItem>
                                </Form>
                            </TabPane>
                        </Tabs>

                    </Modal>
                </Col>
                <Col span={2}></Col>
            </Row>

        );
    }
}
export default PcHeader = Form.create()(PcHeader)
