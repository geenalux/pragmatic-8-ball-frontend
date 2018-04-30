import { combineReducers } from "redux";

import eightBalls from "./eightBalls";
import question from "./questions"
import eightBall from "./eightBall";
import responses from "./responses";
import liveQuestion from "./liveQuestion"
import liveQuestions from "./liveQuestions"

const rootReducer = combineReducers({
  eightBalls,
  question,
  eightBall,
  responses,
  liveQuestion,
  liveQuestions
})

export * from "./eightBalls"
export * from "./questions"
export * from "./eightBall"
export * from "./responses"
export * from "./liveQuestion"
export * from "./liveQuestions"

export default rootReducer;
