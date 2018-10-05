import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './views/Dashboard/Dashboard';
import Login from './views/Login/Login';
import Signup from './views/Signup/Signup';
import Favourite from './views/Signup/Favcollectibles';
import LandingPage from './views/LandingPage/LandingPage';
import Filters from './views/Sidebar/Filters';
import ForgotPassword from './views/ForgotPassword/ForgotPassword.jsx';
import ResetPassword from './views/ResetPassword/ResetPassword';
import RecoveryUsername from './views/RecoveryUsername/RecoveryUsername';
import CreateNewDeck from './modal/CreateNewDeck';
import Discovery from './views/DiscoveryFilterSearch/Discovery';
import EditDeck from './views/Dashboard/EditDeck';
import ListViewdeck from './views/Dashboard/ListViewdeck' ;
import AccountSettings from './views/Settings/AccountSettings';
import ViewStats from "./views/ViewStats/ViewStats";
import Footer from "./components/Footer";
import SocialShareedit from '../src/modal/SocialShareedit'
import Authenticator from '../src/components/Authenticator';

import socialDetails from "./views/ViewStats/SocialDetails";
import EditSocialDetails from "./views/ViewStats/EditSocialDetails";

import './asserts/css/style.css';

class App extends React.Component {

  render() {
  
    return (
      <Authenticator>
        <Router>
          <Switch>
            <Redirect exact path="/" to="/LandingPage"/>
             <Route path="/landingPage" component={LandingPage}/>
              <Route path='/dashboard' component={Dashboard} />
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/favourite" component={Favourite}/>
              <Route path="/filters" component={Filters}/>
              <Route path="/recoveryusername" component={RecoveryUsername}/>
              <Route path="/viewStats" component={ViewStats}/> 
              <Route path="/resetpassword" component={ResetPassword}/>
              <Route path="/forgotpassword" component={ForgotPassword}/>
              <Route path="/createnewdeck" component={CreateNewDeck} />
              <Route path="/discovery" component={Discovery} /> 
              <Route path="/editDeck" component={EditDeck} /> 
              <Route path="/listViewdeck" component={ListViewdeck} /> 
              <Route path="/accountSettings" component={AccountSettings}/>
              <Route path="/footer" component={Footer} />
              <Route path="/socialshareedit" component={SocialShareedit} />
              <Route path="/socialDetails" component={socialDetails} />
              <Route path="/editSocialDetails" component={EditSocialDetails} />
          </Switch>
        </Router>
      </Authenticator>
    );

  }
}
export default App;

