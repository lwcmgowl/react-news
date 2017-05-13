import React from 'react';
import ReactDOM from 'react-dom';
import { Router ,Route,hashHistory} from 'react-router'
import PCIndex from './components/pc_index';
import PcNewsDetails from './components/pc_news_detail';
import MobileNewsDetails from './components/mobile_news_detail';
import MobileIndex from './components/mobile_index.js'
import PcUserCenter from './components/pc_center'
import MobileUserCenter from './components/mobile_center'
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive'


export default class Root extends React.Component {
    render() {
        return (
            <div>
                <MediaQuery query='(min-device-width: 1224px)'>
                    <Router history={hashHistory}>
                        <Route path="/" component={PCIndex}></Route>
                        <Route path="/details/:uniquekey" component={PcNewsDetails}></Route>
                        <Route path="/usercenter" component={PcUserCenter}></Route>
                    </Router>

                </MediaQuery>
                <MediaQuery query='(max-device-width: 1224px)'>
                    <Router history={hashHistory}>
                        <Route path="/" component={MobileIndex}></Route>
                        <Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
                        <Route path='/usercenter' component={MobileUserCenter}></Route>
                    </Router>
                </MediaQuery>

            </div>
        )
    }
}

ReactDOM.render(<Root/>, document.getElementById('maincontent'));
