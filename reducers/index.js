import { combineReducers } from "redux";

import eightBalls from "./eightBalls";
import question from "./questions"
import eightBall from "./eightBall";


const rootReducer = combineReducers({
  eightBalls,
  question,
  eightBall,
})

export * from "./eightBalls"
export * from "./questions"
export * from "./eightBall"

export default rootReducer;
