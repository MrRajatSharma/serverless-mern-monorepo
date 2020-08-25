import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import demoReducer from "./demoReducer";

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  // your reducer here
  demoReducer     // remove this
});

export default rootReducer;
