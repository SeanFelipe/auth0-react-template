import { sendLogout } from '../net/authCalls'

function actionLogin(idToken) {
  return {
    type: 'LOG_IN',
    idToken
  }
}

function actionLogout() {
  return {
    type: 'LOG_OUT',
  }
}

function actionSetScreen(screen) {
  return {
    type: 'SET_SCREEN',
    screen
  }
}

export function setScreen(screen) {
  console.log("setScreen(): " + screen)
  return (dispatch) => {
    dispatch(actionSetScreen(screen))
  }
}

export function setLoggedIn(data) {
  console.log("setLoggedIn() with data: " + JSON.stringify(data))
  console.log("idToken: " + data.idToken)

  return (dispatch) => {
    dispatch(actionLogin(data.idToken))
  }
}

export function setLoggedOut() {
  console.log("redux actions setLoggedOut()")
  // window.location.replace(logoutUrl);
  //localStorage.removeItem('loggedIn');
  sendLogout()
  return (dispatch) => {
    dispatch(actionLogout())
  }
}
