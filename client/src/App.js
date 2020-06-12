import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authAction';
import {clearCurrentProfile} from './actions/profileAction';
import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';


// check for token to avoid loss of state when logged in and reloaded , also this logic is runned for every request to check user is logged in or not
if(localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token, Date.now() gives current time in millisecond so convert it to sec
  const currentTime = Date.now() / 1000;
  //decoded.exp provides expiration time in sec i.e if token set to 3 pm then exp is 4pm in sec
  if (decoded.exp < currentTime){
    //logout user
    store.dispatch(logoutUser());
    //clear current profile
    store.dispatch(clearCurrentProfile());
    //redirect to login
    window.location.href = '/login';
  }

}


function App() {
  return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar/>
            <Route exact path="/" component={Landing}/>
            <div className="container">
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              {/* switch component is for redirecting in privateroute */}
              
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              </Switch>

              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
              </Switch>

              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
              </Switch>

              <Switch>
                <PrivateRoute exact path="/add-experience" component={AddExperience}/>
              </Switch>

              <Switch>
                <PrivateRoute exact path="/add-education" component={AddEducation}/>
              </Switch>

            </div>
            <Footer/>
          </div>
        </Router>
      </Provider>
  );
}

export default App;
