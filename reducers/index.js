import { combineReducers } from "redux";

import eightBalls from "./eightBalls";
import questions from "./questions"

const rootReducer = combineReducers({
  eightBalls,
  questions
})

export * from "./eightBalls";
export * from "./questions"

export default rootReducer;
