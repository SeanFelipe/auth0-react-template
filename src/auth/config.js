export const authConfig = {
  domain: <your_auth0_domain>,
  clientID: <your_auth0_clientID>,
  redirectUri: <your_local_or_remote_server>,
  // configure what auth0 services you want here
  //
  responseType: 'token id_token',
  scope: 'openid email'
}
