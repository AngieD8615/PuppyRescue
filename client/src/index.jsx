import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import List from './components/List.jsx';
import WelcomeBar from './components/Welcome.jsx';
import Typography from '@material-ui/core/Typography';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      puppyInfo: [],
      loading: true
    }
  }

  componentDidMount() {
    axios.get('/puppies')
      .then((res) => {
        this.setState({ puppyInfo: res.data })
      })
      .then(() => {
        this.setState({ loading: false })
        //console.log(this.state)
      })
  }

  render() {
    const { loading, puppyInfo } = this.state;
    return (
      <div>
        <WelcomeBar />
        {loading ? null : (
          <Typography variant="h5" gutterBottom color='primary' align='center'>
            There will be {puppyInfo.length} puppies available for adoption
          </Typography>
        )}
        {loading ? <p>loading</p> : <List puppyInfo={puppyInfo} />}
        {/* <List items={this.state.items}/> */}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));