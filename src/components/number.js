import React, {Component} from 'react';

export default class Number extends Component {
    render() {
        const {zero, num, click} = this.props;
        return (
            <div onClick={click} value={num} className={`number ${zero}`}>{num}</div>
        )
    }
}