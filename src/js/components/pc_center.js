/**
 * Created by 李伟 on 2017/5/11.
 */
import React from 'react';
import {Row, Col} from 'antd';
import Pc_header from './pc_header'
import Pc_footer from './pc_footer'
import {
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    CheckBox,
    Modal,
    Card,
    notification,
    Upload
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Router, Route, Link, browserHistory} from 'react-router'


export default class PcUserCenter extends React.Component {
    constructor(){
        super()
        this.state = {
            usercollection: '',
            usercomments: '',
            previewImage: '',
            previewVisible:false
        }
    }
    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        };

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
            .then(response=>response.json())
            .then(json=>{
                this.setState({usercollection:json});
            });

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
            .then(response=>response.json())
            .then(json=>{
                this.setState({usercomments:json});
            });

    };
    render() {
        const props={
            action:"http://newsapi.gugujiankong.com/handler.ashx",
            headers: {
                "Access-Control-Allow-Origin": '*',
            },
            listType:'picture-card',
            defaultFileList:[
                {
                    uid:-1,
                    name:'xxx.png',
                    state:'done',
                    url:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                }
            ],
            onPreview:(file)=>{
                this.setState({previewImage:file.url,previewVisible:true})
            }
        }
        const {usercollection,usercomments} = this.state;
        const usercollectionList = usercollection.length ?
            usercollection.map((uc,index)=>(
                <Card key={index} title={uc.uniquekey} extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`}>查看</a>}>
                    <p>{uc.Title}</p>
                </Card>
            ))
            :
            '您还没有收藏任何的新闻，快去收藏一些新闻吧。';

        const usercommentsList = usercomments.length ?
            usercomments.map((comment,index)=>(
                <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`} extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>查看</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :
            '您还没有发表过任何评论。';
        return (
            <div>
                <Pc_header/>
                <Row>
                    <Col span={2}>
                    </Col>
                    <Col span={20}>
                        <Tabs>
                            <TabPane tab="我收藏的列表" key="1">
                                {usercollectionList}
                            </TabPane>
                            <TabPane tab="我评论的列表" key="2">
                                {usercommentsList}
                            </TabPane>
                            <TabPane tab="我的头像" key="3">
                                <div class="clearfix">
                                    <Upload {...props}>
                                        <Button>
                                            <Icon type="upload" /> 上传照片
                                        </Button>
                                    </Upload>
                                    <Modal title="图片预览" visible={this.state.previewVisible}
                                           onOk={this.handleOk} onCancel={this.handleCancel} footer={null}
                                    >
                                        <img src={this.state.previewImage} alt="预览"/>
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}>
                    </Col>
                </Row>
                <Pc_footer/>
            </div>
        )
    }
}