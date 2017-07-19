import React from 'react';
import { namespaceModule } from './namespacers';

// -------- STATE (hue-box/state.js) -----------

const initialState = {
  hue: 10,
}

// -------- ACTION CREATORS (hue-box/actions.js) -----------

const onUpdateHue = (hue) => {
  return { type: 'UPDATE_HUE', hue }
}

const onResetHue = () => {
  return { type: 'RESET_HUE' }
}

const actions = { onUpdateHue, onResetHue };

// -------- REDUCER (hue-box/reducer.js) -----------

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_HUE':
      return {
         ...state,
         hue: action.hue + 30
      };
    case 'RESET_HUE':
      return {
        ...state,
        hue: 10
      }
    default:
      return state;
  }
}

// -------- COMPONENT AND WRAPPER (hue-box/box.js) -----------

export const HueBoxWrapper = ({ state, dispatch }) => {
  return (
    <HueBoxDisplay
      state={state}
      updateHue={(currentHue) => dispatch(onUpdateHue(currentHue))}
      resetHue={() => dispatch(onResetHue())}
    />
  );
};

export const HueBoxDisplay = ({
  state,
  updateHue,
  resetHue
}) => {
  return (
    <div
      onMouseEnter={updateHue.bind(null, state.hue)}
      onClick={resetHue}
      style={{
        width:'20px',
        height:'20px',
        backgroundColor: `hsla(${state.hue}, 100%, 50%, 1)`
      }}
    />
  );
}

export default namespaceModule({ actions, reducer, Component: HueBoxWrapper });
