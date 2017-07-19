import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { combineReducers, install } from 'redux-loop';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import createHueBox from './hue-box';

// const { reducer: hueBoxOne, Component: HueBoxOne } = createHueBox('HUE_BOX_1');
// const { reducer: hueBoxTwo, Component: HueBoxTwo } = createHueBox('HUE_BOX_2');

// Reducers
const { reducer: hueBoxOne } = createHueBox('HUE_BOX_1');
const { reducer: hueBoxTwo } = createHueBox('HUE_BOX_2');
const reducer = combineReducers({ hueBoxOne, hueBoxTwo });

// Rendering
const render = () =>
  ReactDOM.render(
    <App state={store.getState()} dispatch={store.dispatch}/>,
    document.getElementById('root')
  );

// Store
const store = createStore(reducer, install());
store.subscribe(render);

// Display to screen
render();
registerServiceWorker();
