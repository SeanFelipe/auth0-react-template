import auth0 from 'auth0-js'
import { authConfig } from './config'
import history from '../history'
import { reduxStore } from '../redux/store'
import * as reduxActions from '../redux/actions'


export default class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth(authConfig)
    this.accessToken = null
    this.idToken = null
    this.expiresAt = null

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
  }

  login() {
    console.log("Auth.js login()")
    this.auth0.authorize()
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        //console.log("handleAuthentication() authResult: " + JSON.stringify(authResult))
        this.setSession(authResult);
        reduxStore.dispatch(reduxActions.setLoggedIn(authResult))
        //alert('Auth handleAuthentication complete')
      } else if (err) {
        console.log("handleAuthentication error: " + JSON.stringify(err))
        history.replace('/home');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    // 16Dec18 SW this is somehow returning true even though setSession isn't being called ?
    // change to different key for now.
    //localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loggedIn', true);

    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    //console.log("setSession with expiresAt: " + this.expiresAt)

    // navigate to the home route
    history.replace('/');
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         this.setSession(authResult);
       } else if (err) {
         this.logout();
         console.log(err);
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
       }
    });
  }

  logout() {
    console.log("Auth.js logout()")

    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // action will kill local store + redirect browser
    reduxStore.dispatch(reduxActions.setLoggedOut())
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    //console.log("Auth.js isAuthenticated with expiresAt: " + this.expresAt)
    return new Date().getTime() < expiresAt;
  }
}
