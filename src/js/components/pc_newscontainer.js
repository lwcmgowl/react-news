/**
 * Created by 李伟 on 2017/3/26.
 */
import React from 'react';
import {Row, Col} from 'antd';
import {Menu, Icon, Tabs, Form, Input, message, Button, Modal, Checkbox,Carousel } from 'antd';
const TabPane = Tabs.TabPane;
import PcNewsBlock from './pc_news_block'
import NewsImgBlock from './pc_news_img_block'
export default class NewsContainer extends React.Component{
    render() {
        const setting={
            dots:true,
            infinite:true,
            speed:500,
            slidesToShsow:1,
            autoplay:true
        }
        return (
            <div>
                <Row>
                    <Col span={2}/>
                    <Col span={20} class="container">
                        <div class="leftcontainer">
                            <div class="carousel">
                                <Carousel {...setting}>
                                    <div><img src="./src/images/city.jpeg" alt=""/></div>
                                    <div><img src="./src/images/football.jpeg" alt=""/></div>
                                    <div><img src="./src/images/tangwei.jpeg" alt=""/></div>
                                    <div><img src="./src/images/tesla.jpeg" alt=""/></div>
                                </Carousel>
                            </div>
                            <NewsImgBlock count={6} type="guoji" width="400px" cartTitle="国际头条" imageWidth="112px"></NewsImgBlock>
                        </div>
                        <Tabs class="tabs_news">
                            <TabPane tab="头条新闻" key="1">
                              <PcNewsBlock count={14} type="top" bordered="false"/>
                            </TabPane>
                            <TabPane tab="国际" key="">
                                <PcNewsBlock count={14} type="guoji" bordered="false"/>
                            </TabPane>
                        </Tabs>
                        <div>
                            <NewsImgBlock count={8} type="guonei" width="100%" cartTitle="国内头条" imageWidth="130px"></NewsImgBlock>
                            <NewsImgBlock count={16} type="yule" width="100%" cartTitle="娱乐头条" imageWidth="130px"></NewsImgBlock>
                        </div>
                    </Col>
                    <Col span={2}/>
                </Row>
            </div>
        )
    }
}
