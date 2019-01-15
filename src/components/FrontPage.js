import React from 'react';
import { ConnectedLoginModal } from '../auth/LoginModal'


export class FrontPage extends React.Component {
  render() {
    return (
      <div>
        <ConnectedLoginModal />
        Front Page
      </div>
    )
  }
}
