
import React, {Component} from 'react';
import 'whatwg-fetch';
import Paper from 'material-ui/Paper'
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import IconButton from 'material-ui/IconButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Quote from './Quote';
require('es6-promise').polyfill();



const chevronColors = ['rgb(237, 22, 22)',
                       'rgb(22, 237, 183)',
                       'rgb(22, 141, 237)',
                       'rgb(237, 219, 22)',
                       'rgb(156, 22, 237)',
                       'rgb(231, 22, 237)'];


const styles = {
  container: {
    textAlign: 'center',
    height: '100%',
    position: 'relative'
  },
  quoteContainer: {
    display: 'flex',
    alignItems: 'center'
  }
  
};

const muiTheme = getMuiTheme({
  palette: {
    
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    sessionStorage.clear();
    this.state = {
      quote : "",
      author: "",
      gradient: 1,
      currentKey: 0,
      op : {
        opacity: 1
      }
    };
  }
  prevQuote() {
    this.setState({op: {
      opacity: 0,
      transform: 'translateX(-150px)'
    }});
    if (sessionStorage.getItem(this.state.currentKey - 1)) {
      let data = JSON.parse(sessionStorage.getItem(this.state.currentKey - 1));
      this.setState({ gradient: Math.floor(Math.random() * 6) })
      setTimeout(()=>{
        this.setState({
          quote: data.quote,
          author: data.author,
          currentKey: this.state.currentKey - 1,
          op: {
            opacity: 1,
          }
        });
      }, 500);
 
    }

  }

  nextQuote() {

    this.setState({op: {
      opacity: 0,
      transform: 'translateX(-150px)'
    }});

    if(sessionStorage.getItem(this.state.currentKey + 1)) {
        let data = JSON.parse(sessionStorage.getItem(this.state.currentKey + 1));
        this.setState({ gradient: Math.floor(Math.random() * 6) });
        setTimeout(()=>{
        this.setState({
          quote: data.quote,
          author: data.author,
          currentKey: this.state.currentKey + 1,
          op: {
            opacity: 1,
          }
        });
      }, 500);
    }
    else {
      let url = "http://www.quotzzy.co/api/quote";
      fetch(url, {
        method: 'get'
      })
      .then((res) => {
          return res.json();
        })
      .then((data) => {
          // console.log(data);
          let quote = data.text;
          let author = "Anonymous";
          if (data.author !== null)
            author = data.author.name;
          this.setState({ quote: quote, author: author });
          this.setState({ gradient: Math.floor(Math.random() * 6) })
          this.setState({op: {
            opacity: 1,
          }});
          this.setState({currentKey: this.state.currentKey + 1});
          // Save the fetch quote to session storage
          sessionStorage.setItem(this.state.currentKey, JSON.stringify({
            'quote': this.state.quote,
            'author': this.state.author
          }));
        });
    }
    

  }

  componentWillMount() {
    this.nextQuote();
  }


  render() {
    let backButton;

    if(this.state.currentKey > 1) {
      backButton = (<IconButton tooltip="" 
                        onClick={this.prevQuote.bind(this)}>
                      <NavigationChevronLeft  color={chevronColors[this.state.gradient]} />
                    </IconButton>)
    }
    else {
      backButton = (<div className={"smallIcon"}>
                    </div>
                    )
    }
  
    
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container} className={"blend-gradient-" + this.state.gradient}>
        <h1 className="header">Random Quote</h1>
          <Paper style={styles.quoteContainer} zDepth={4} className="quoteContainer">

            {backButton}
          
            <Quote quote={this.state.quote} author={this.state.author} style={this.state.op} 
            className={"quotebox"}/>
         
            <IconButton tooltip="" 
                        onClick={this.nextQuote.bind(this)}
            >
              <NavigationChevronRight  color={chevronColors[this.state.gradient]} />
            </IconButton>

          </Paper>
          <p className="bytext">By Shouvik Roy</p>
          
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
