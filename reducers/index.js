import { combineReducers } from "redux";

import eightBalls from "./eightBalls";
import question from "./questions"
import eightBall from "./eightBall";
import response from "./responses";


const rootReducer = combineReducers({
  eightBalls,
  question,
  eightBall,
  response
})

export * from "./eightBalls"
export * from "./questions"
export * from "./eightBall"
export * from "./responses"

export default rootReducer;
