import { combineReducers } from 'redux';

const initialState = {
  requireLogin: true,
  loggedIn: false,
  loading: false,
  idToken: null,
}


function appReducer (state=initialState, action) {
  switch (action.type) {

    case 'LOG_IN':
      console.log("reducer login action with action props: " + Object.getOwnPropertyNames(action))
      return { ...state,
        loggedIn: true,
        idToken: action.idToken,
      }

    case 'LOG_OUT':
      console.log("reducer logout action")
      return { ...state,
        loggedIn: false,
        idToken: null,
      }

    case 'SET_SCREEN':
      return { ...state,  activeScreen: action.screen };

    default:
      return state;

  }
};

export default combineReducers({
  app: appReducer
});
