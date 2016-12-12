import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class Quote extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            change: false
        };
    }


    render() {

        // console.log("state",this.state.change);
        // console.log("props", this.props.quote);
        return (
           
                <div style={this.props.style} className={this.props.className}>
                    <q>{this.props.quote}</q>
                    <cite>- {this.props.author}</cite>
                </div>
           
        );
    }
}

export default Quote;