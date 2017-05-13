import React from 'react';
import {Row, Col} from 'antd';


export default class PcFooter extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} class='footer'>
                        &copy;&nbsp;2017 IT News. All Rights Reserved.
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    }
}
