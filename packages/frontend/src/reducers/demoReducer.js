import {YOUR_ACTION} from '../constants/actionTypes';

const initialState = {}
export default function demoReducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case YOUR_ACTION:
      newState = objectAssign({}, state);   //never change original state...keep it mutated
      // modify state here
      return newState;

    
    default:
      return state;
  }
}