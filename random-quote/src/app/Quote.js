import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';


class Quote extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            change: false
        };
    }


    render() {

        const url = `https://twitter.com/intent/tweet?hashtags=quotes&amp;related=freecodecamp&amp;text=${this.props.quote}--${this.props.author}`; 
        return (
           
                <div style={this.props.style} className={this.props.className}>
                    <q>{this.props.quote}</q>
                    <IconButton
                        touch
                        target="_blank"
                        href={url}
                        iconClassName="fa fa-twitter"
                        tooltip="Share on Twitter"
                        tooltipPosition="bottom-center"
                     />
                    <cite>- {this.props.author}</cite>
                </div>
           
        );
    }
}

export default Quote;