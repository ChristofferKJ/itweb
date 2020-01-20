import React from 'react';
import './Square.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
    }

    render() {
        return (
            <button className={this.props.className} disabled >
                {this.props.value}
            </button >
        );
    }
}

export default Square;