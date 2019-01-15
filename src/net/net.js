import { reduxStore } from '../redux/store'
const Promise = require('bluebird')


//const REMOTE = 'http://alsi-parliament.herokuapp.com'
const LOCAL = 'http://localhost:9292'
const futbolHost = LOCAL
//const futbolHost = REMOTE
const newEvent = `${futbolHost}/event/new`
const studentData = `${futbolHost}/student/data`

function getIdToken() {
  console.log("redux getState(): " + Object.getOwnPropertyNames(reduxStore.getState()))
  const token = reduxStore.getState().app.idToken
  console.log("getIdToken(): " + JSON.stringify(token))
  if (! token) {
    throw new Error('no auth0 idToken found in redux store')
  } else {
    console.log("getIdToken: " + token)
    return token
  }
}

function clientIdent() {
  return {
    'jubula-ident': getIdToken()
  }
}

export function sendEvent(data) {
  console.log("net sendEvent() with data: " + JSON.stringify(data))
  const url = newEvent
  return new Promise((resolve) => {
    fetch(url, {
      method: 'POST',
      headers: Object.assign({
        'Content-Type': 'application/json',
      }, clientIdent()),
      body: JSON.stringify(data)
    })
    .then((response) => {
      //alert('sent')
      return response
    })
    .then((response) => response.json())
    .then((json) => {
      console.log("sendEvent response: " + json);
      //alert('done')
      resolve(json)
    })
  })
}

export function sendStudentData(dataAsString) {
  console.log("net sendStudentData() with data: " + dataAsString)
  const url = studentData
  return new Promise((resolve) => {
    fetch(url, {
      method: 'POST',
      headers: Object.assign({
        'Content-Type': 'application/json',
      }, clientIdent()),
      body: JSON.stringify({ studentData: dataAsString })
    })
    .then((response) => {
      //alert('sent')
      return response
    })
    .then((response) => response.json())
    .then((json) => {
      console.log("sendEvent response: " + json);
      //alert('done')
      resolve(json)
    })
  })
}
