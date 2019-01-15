import { authConfig } from '../auth/config'

//const Promise = require('bluebird')
const logoutUrl = `http://${authConfig.domain}/v2/logout`
const returnToUrl = '?returnTo=http%3A%2F%2Flocalhost%3A3000'

export function sendLogout() {
  const url = `${logoutUrl}${returnToUrl}`
  window.location.replace(url)
  /*
  console.log("authCalls sendLogout()")
  return new Promise((resolve) => {
    fetch(logOutUrl, {
      method: 'GET',
      mode: 'no-cors',
    })
    .then((response) => {
      console.log("sendLogout() response: " + JSON.stringify(response))
      resolve(response)
    })
  })
  */
}
