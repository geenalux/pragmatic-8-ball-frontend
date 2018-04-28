import { combineReducers } from "redux";

import eightBalls from "./eightBalls";
import question from "./question"
import eightBall from "./eightBall";


const rootReducer = combineReducers({
  eightBalls,
  question,
  eightBall
})

export * from "./eightBalls"
export * from "./question"
export * from "./eightBall"


export default rootReducer;
