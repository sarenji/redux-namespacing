// a function that takes a namespace and turns a given reducer into a namespaced reducer
const namespaceReducerFactory = (namespace) => (reducerFunction) => (state, action) => {
  const isInitializationCall = (state === undefined);
  if(action.namespace !== namespace && !isInitializationCall) return state;

  return reducerFunction(state, action);
};

// a function that takes a namespace and turns a given action creator into a namespaced action creator
const namespaceActionFactory = (namespace) => (actionCreator) => (...actionArgs) => {
  const action = actionCreator(...actionArgs);
  return { ...action, namespace };
};

// a function that takes a namespace and turns a given dispatch into a namespaced dispatch
const namespaceDispatchFactory = (namespace) => (dispatch) => (action) =>
  dispatch({ ...action, namespace });

// What about when you need to call an action from a diff component
// How does this work with combineReducers
export const namespaceModule = ({ actions, reducer, Component }) => (namespace) => {
  const namespaceAction = namespaceActionFactory(namespace);
  const namespaceReducer = namespaceReducerFactory(namespace);
  const namespaceDispatch = namespaceDispatchFactory(namespace);
  return {
    actions: mapObject(actions, namespaceAction),
    reducer: namespaceReducer(reducer),
    Component: ({ dispatch, ...args }, context) =>
      Component({ dispatch: namespaceDispatch(dispatch), ...args }, context)
  };
};

// Helper fn
const mapObject = (fn, obj) =>
  Object.keys(obj).reduce((newObj, key) => ({ ...newObj, [key]: fn(obj[key]) }), {});
