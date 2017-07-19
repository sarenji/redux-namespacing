import React from 'react';
import logo from './logo.svg';
import './App.css';
import createHueBox from './hue-box';

const { Component: HueBoxOne } = createHueBox('HUE_BOX_1');
const { Component: HueBoxTwo } = createHueBox('HUE_BOX_2');

const App = ({ state, dispatch }) => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
    <p className="App-intro">
      <HueBoxOne state={state.hueBoxOne} dispatch={dispatch}/>
      <HueBoxTwo state={state.hueBoxTwo} dispatch={dispatch}/>
    </p>
  </div>
);

export default App;
