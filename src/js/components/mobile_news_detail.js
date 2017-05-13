/**
 * Created by 李伟 on 2017/5/10.
 */
import React from 'react';
import {Row, Col, BackTop} from 'antd';
import Mobile_header from './mobile_header'
import Mobile_footer from './mobile_footer'
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
                    document.title = this.state.newsItem.title + "React News | React 驱动的新闻平台";
                }
            );
    }

    createMarkup() {
        return {__html: this.state.newsItem.pagecontent};
    }

    render() {
        return (
            <div id="mobileDetailsContainer">
                <Mobile_header />
                <div class="ucmobileList">
                    <Row>
                        <Col span={24} className="container">
                            <div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                            <hr/>
                            <CommonComment uniquekey={this.props.params.uniquekey}></CommonComment>
                        </Col>
                    </Row>
                </div>
                <Mobile_footer />
                <BackTop />
            </div>
        )

    }

}