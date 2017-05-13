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

export default class NewsBlock extends React.Component {
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
        const {news}=this.state;
        const newsList = news.length ? news.map((newsItem, index) => (
                    <li key={index}>

                        <Link to={`/details/${newsItem.uniquekey}`} target="_blank" replace={true}>
                            {newsItem.title}
                        </Link>
                    </li>
            )) : '没有加载任何数据';
        return (
            <div class="topNewsList">
                <Card>
                    <ul>
                        {newsList}
                    </ul>
                </Card>

            </div>
        )
    }
}