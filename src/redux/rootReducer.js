import { combineReducers } from "@reduxjs/toolkit";

// ** Reducers Imports
import auth from "./authentication";

const rootReducer = combineReducers({
  auth,
});

const rootReducers = (state, action) => {
  return rootReducer(state, action);
};

export default rootReducers;
