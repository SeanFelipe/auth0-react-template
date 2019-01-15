import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import { connect } from 'react-redux'

import Auth from './auth/Auth';
import Callback from './auth/Callback';
import { SplashPage } from './auth/SplashPage'
import { ConnectedMainPage } from './components/MainPage'

import history from './history';


class App extends Component {
  constructor(props) {
    super(props)
    this.auth = new Auth()

    this.handleAuthenticationCallback = this.handleAuthenticationCallback.bind(this)
    this.loginRoutes = this.loginRoutes.bind(this)
  }

  handleAuthenticationCallback({location}) {
    if (/access_token|id_token|error/.test(location.hash)) {
      console.log("router handleAuthentication(), passing to auth")
      this.auth.handleAuthentication();
    }
  }

  loginRoutes() {
    return (
      <Router history={history}>
        <div>
          <Route path="/" render={(props) => <SplashPage />} />
          <Route path="/auth" render={(props) => {
            this.handleAuthenticationCallback(props);
            return <Callback {...props} />
          }}/>
        </div>
      </Router>
    )
  }

  render() {
    return (
      <div className="App">
        { this.props.loggedIn
            ? <ConnectedMainPage />
            : this.loginRoutes()
        }
      </div>
    );
  }
}

export const ConnectedApp = connect((store) => ({
  idToken: store.app.idToken,
  loggedIn: store.app.loggedIn,
  dispatch: store.dispatch,
}))(App)
