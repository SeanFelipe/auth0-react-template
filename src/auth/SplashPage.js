import React from 'react'
import { ConnectedLoginModal } from './LoginModal'


export class SplashPage extends React.Component {
  render() {
    return (
      <div>
        Auth Splash Page
        <ConnectedLoginModal />
      </div>
    );
  }
}
