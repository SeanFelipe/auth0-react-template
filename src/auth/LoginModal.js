import React from 'react'
import Auth from './Auth'
import { authConfig } from './config'
import { connect } from 'react-redux'


class LoginModal extends React.Component {
  constructor(props) {
    super(props)

    this.auth = new Auth(authConfig)

    this.loginButton = this.loginButton.bind(this)
    this.logoutButton = this.logoutButton.bind(this)
  }

  loginButton () {
    this.auth.login();
  }

  logoutButton () {
    this.auth.logout();
  }

  render() {
    return (
      <div style={{ flex: 1, justifyContent: 'center', borderWidth: 5}}>
        {
          this.props.loggedIn && (
            <div style={{ marginTop: '20px'}}>
              You are logged in!
              <div onClick={this.logoutButton}>Logout</div>
            </div>
          )
        }
        {
          !this.props.loggedIn && (
            <div style={{backgroundColor: '#55bb55'}} onClick={this.loginButton}>Log in with the Auth0 service</div>
          )
        }
      </div>
    );
  }
}

export const ConnectedLoginModal = connect((store) => ({
  loggedIn: store.app.loggedIn,
  dispatch: store.dispatch,
}))(LoginModal)
