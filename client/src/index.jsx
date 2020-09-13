import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import List from './components/List.jsx';
import WelcomeBar from './components/Welcome.jsx';
import Typography from '@material-ui/core/Typography';
import FosterForm from './components/FosterFormMUI.jsx'
import FosterFormStep2 from './components/fosterForms/FosterFormStep2.jsx'
import FosterFormResult from './components/fosterForms/FosterFormResult.jsx'



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      puppyInfo: [],
      loading: true,
      viewPage: 'home',
    }
    this.getPuppyDataAndGoHome = this.getPuppyDataAndGoHome.bind(this)
    this.handleStartFosterForm = this.handleStartFosterForm.bind(this);
  }

  componentDidMount() {
    this.getPuppyDataAndGoHome()
  }

  getPuppyDataAndGoHome (){
    axios.get('/puppies')
      .then((res) => {
        this.setState({ puppyInfo: res.data })
      })
      .then(() => {
        this.setState({ loading: false, viewPage: 'home' })
        //console.log(this.state)
      });
  }
  
  handleStartFosterForm (e){
    this.setState({viewPage: 'FosterForm'})
    console.log("form clicked")
  }

  render() {
    const { loading, puppyInfo, viewPage } = this.state;
    return (
      <div>
        <WelcomeBar onFosterClick={this.handleStartFosterForm}/>
        {loading ? null : (
          <>
          <Typography variant="h5" gutterBottom color='primary' align='center'>
            There will be {puppyInfo.length} puppies available for adoption
          </Typography>
          {(viewPage === 'home') ? <List puppyInfo={puppyInfo} /> : (
            (viewPage === 'FosterForm') ? <FosterForm returnHome={this.getPuppyDataAndGoHome} /> : null
          )}
          </>
        )}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));