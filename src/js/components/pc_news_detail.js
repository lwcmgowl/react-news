/**
 * Created by 李伟 on 2017/5/10.
 */
import React from 'react';
import {Row, Col,BackTop} from 'antd';
import Pc_header from './pc_header'
import Pc_footer from './pc_footer'
import NewsImgBlock from './pc_news_img_block'
import CommonComment from './common_compunents'
export default class PcNewsDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            newsItem: ''
        }
    }

    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        }
        fetch("http://newsapi.gugujiankong.com/handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey, myFetchOptions).then(response => response.json())
            .then(json => {
                    this.setState({newsItem: json});
                    document.title = this.state.newsItem.title+"React News | React 驱动的新闻平台";
                }
            );
    }

    createMarkup() {
        return {__html: this.state.newsItem.pagecontent};
    }

    render() {
        return (
            <div>
                <Pc_header />
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} className="container">
                        <div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <CommonComment uniquekey={this.props.params.uniquekey}></CommonComment>
                    </Col>
                    <Col span={6}>
                        <NewsImgBlock count={40} type="top" width="100%" cardTitle="相关新闻" imageWidth="120px"/>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <Pc_footer />
                <BackTop />
            </div>
        )

    }

}