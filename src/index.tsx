import React from 'react';
import {render} from 'react-dom';

import './index.css';

import Root from './components/Root';
import configureStore, {history} from './store';

import * as serviceWorker from './serviceWorker';

const preloadedState = {};

render(
  <Root
    store={configureStore({preloadedState, history})}
    history={history}
  />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
