import { combineReducers } from "redux";

import eightBalls from "./eightBalls";
import question from "./question"

const rootReducer = combineReducers({
  eightBalls,
  question
})

export * from "./eightBalls";
export * from "./question"

export default rootReducer;
