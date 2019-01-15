import React from 'react';
import { connect } from 'react-redux'
import { ConnectedLoginModal } from '../auth/LoginModal'


class MainPage extends React.Component {
  render() {
   return (
      <div>
        <ConnectedLoginModal />
      </div>
    );
  }
}

export const ConnectedMainPage = connect((store) => ({
  loggedIn: store.app.loggedIn,
}))(MainPage)
