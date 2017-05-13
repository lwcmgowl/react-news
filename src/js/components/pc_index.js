import React from 'react';
import Pc_header from './pc_header'
import Pc_footer from './pc_footer'
import PcNewsContainer from './pc_newscontainer'
export default class PcIndex extends React.Component {
    render() {
        return (
            <div>
                <Pc_header />
                <PcNewsContainer />
                <Pc_footer />
            </div>
        )
    }
}
