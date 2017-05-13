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

export default class NewsImageBlock extends React.Component {
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
        const styleImage={
            display:'block',
            width:this.props.imageWidth,
            height:'90px'
        };
        const styleH3={
            width:this.props.imageWidth,
            whiteSpace:'nowrap',
            overflow:'hidden',
            textOverflow:"ellipsis"
        }
        const {news}=this.state;
        const newsList = news.length ? news.map((newsItem, index) => (
                    <div key={index} class="imageblock">
                        <Link to={`details/${newsItem.uniquekey}`} target="_blank">
                            <div class="custom-image">
                                <img src={newsItem.thumbnail_pic_s} alt="" style={styleImage}/>
                            </div>
                            <div class="custom-card">
                                <h3 style={styleH3}>{newsItem.title}</h3>
                                <p>{newsItem.author_name}</p>
                            </div>
                        </Link>
                    </div>
            )) : '没有加载任何数据';
        return (
            <div class="topNewsList">
                <Card title={this.props.cartTitle} bordered={true} style={{width:this.props.width}}>
                    {newsList}
                </Card>

            </div>
        )
    }
}