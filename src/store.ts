import createHistory from 'history/createBrowserHistory';
import { History } from 'history';
import { createStore, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { routerMiddleware } from 'connected-react-router';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native


import rootReducer from './reducers';

export const history = createHistory({
  basename: process.env.PUBLIC_URL,
});

export interface IProps {
  preloadedState: any;
  history: History;
}

const configureStore = ({preloadedState, history}: IProps) => {
  const persistConfig = {
    key: 'root',
    storage,
    blacklist: [
      'auth',
      'authClientLoad',
      'authClientInit',
    ]
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer(history))

  const middlewares = [
    routerMiddleware(history),
    thunk,
  ];

  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [
    middlewareEnhancer,
  ];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(
    persistedReducer,
    preloadedState,
    composedEnhancers
  );
  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;
