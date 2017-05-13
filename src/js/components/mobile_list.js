/**
 * Created by 李伟 on 2017/3/26.
 */
/**
 * Created by 李伟 on 2017/3/26.
 */
import React from 'react';
import {Row, Col} from 'antd';
import {Menu, Icon, Tabs, Form, Input, message, Button, Modal, Checkbox, Carousel, Card} from 'antd';
const TabPane = Tabs.TabPane;
import { Router ,Route,hashHistory,Link} from 'react-router'
// import {
//     BrowserRouter as Router,
//     Route,
//     Link
// } from 'react-router-dom'

export default class Mobilelist extends React.Component {
    constructor() {
        super();
        this.state = {
            news: ''
        }
    }

    componentWillMount() {
        var myFetchOptions = {
            method: 'GET'
        }
        fetch("http://newsapi.gugujiankong.com/handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions).then(response => response.json())
            .then(json => this.setState({news: json}));
    }

    render() {
        const {news} = this.state;
        const newsList = news.length ? news.map((newsItem, index) => (
                <section key={index} className="m_article list-item special_section clearfix">
                    <Link to={`details/${newsItem.uniquekey}`}>
                        <div className="m_article_img">
                            <img src={newsItem.thumbnail_pic_s} alt={newsItem.title}/>
                        </div>
                        <div className="m_article_info">
                            <div className="m_article_title">
                                <span> {newsItem.title}</span>
                            </div>
                            <div className="m_article_desc clearfix">
                                <div className="m_article_desc_l">
                                    <span className="m_article_channel">{newsItem.realtype}</span>
                                    <span className="m_article_time">{newsItem.date}</span>
                                </div>
                            </div>

                        </div>
                    </Link>
                </section>
        )) : '没有加载任何数据';
        return (
            <div>
                <Row>
                    <Col span={24}>
                        {newsList}
                    </Col>
                </Row>

            </div>
        )
    }
}
