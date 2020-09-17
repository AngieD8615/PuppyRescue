import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import List from './components/List.jsx';
import WelcomeBar from './components/Welcome.jsx';
import Typography from '@material-ui/core/Typography';
import FosterForm from './components/FosterForm.jsx';
import AdminIntakeForm from './components/AdminIntakeForm.jsx';
import AddFoster from './components/AddFoster.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      puppyInfo: [],
      loading: true,
      viewPage: 'home',
      fosters: [],
    }
    this.getPuppyDataAndGoHome = this.getPuppyDataAndGoHome.bind(this)
    this.getFosterData = this.getFosterData.bind(this)
    this.handleStartFosterForm = this.handleStartFosterForm.bind(this);
    this.handleStartAdminIntakeForm = this.handleStartAdminIntakeForm.bind(this);
    this.handleAddFoster = this.handleAddFoster.bind(this);
  }

  componentDidMount() {
    this.getPuppyDataAndGoHome()
    this.getFosterData()
  }

  getFosterData() {
    axios.get('/fosters')
      .then((res) => {
        this.setState({ fosters: res.data })
      });
  }
  getPuppyDataAndGoHome() {
    axios.get('/puppies')
      .then((res) => {
        this.setState({ puppyInfo: res.data })
      })
      .then(() => {
        // console.log(this.state.puppyInfo)
        this.setState({ loading: false, viewPage: 'home' })
      });
      this.getFosterData()
  }

  handleStartFosterForm(e) {
    this.setState({ viewPage: 'FosterForm' })
  }
  handleStartAdminIntakeForm(e) {
    this.setState({ viewPage: 'AdminIntakeForm' })
  }
  handleAddFoster(e) {
    this.setState({ viewPage: 'addFoster' })
  }

  render() {
    const { loading, puppyInfo, viewPage, fosters } = this.state;
    return (
      <div>
        <WelcomeBar 
          toHome={this.getPuppyDataAndGoHome}
          toFosterForm={this.handleStartFosterForm} 
          toAddPuppy={this.handleStartAdminIntakeForm}
          toAddFoster={this.handleAddFoster}
        />
        {loading ? null : (
          <>
            <Typography variant="h5" gutterBottom color='primary' align='center'>
              There will be {puppyInfo.length} puppies available for adoption
            </Typography>
            {(viewPage === 'home') ? <List puppyInfo={puppyInfo} /> : (
              (viewPage === 'FosterForm') ? <FosterForm returnHome={this.getPuppyDataAndGoHome} allFosters={fosters} puppyInfo={puppyInfo}/> : (
                (viewPage === 'AdminIntakeForm') ? <AdminIntakeForm returnHome={this.getPuppyDataAndGoHome} allFosters={fosters} nextPupIndex={puppyInfo.length+1}/> : (
                  (viewPage === 'addFoster') ? <AddFoster returnHome={this.getPuppyDataAndGoHome} allFosters={fosters} /> : null
            )))}
          </>
        )}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));