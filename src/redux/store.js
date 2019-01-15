import { createStore, compose, applyMiddleware } from 'redux';
import persistState from 'redux-localstorage'
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';


const DEVTOOLS = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__',
  composeEnhancers = global[DEVTOOLS] || compose,
  logger = createLogger({
    predicate: (getState, action) => {
      return true;
    },
  });

export default function configureStore(initialState) {
  console.log("redux configureStore() with initialState: " + JSON.stringify(initialState))
  const enhancers = composeEnhancers(
    // thunk needs to be first in line
    applyMiddleware(thunk),
    applyMiddleware(logger),
    persistState(),
  );

  const store = createStore(reducers, enhancers);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}


export const reduxStore = configureStore();
