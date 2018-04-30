import axios from "axios"
import socket from '../socket';

// INITIAL STATE
const initialState = {}

// ACTION TYPE CREATORS
const GET_LIVE_QUESTION = "GET_LIVE_QUESTION"

// ACTION CREATORS


export const getLiveQuestion = liveQuestion => {
  return { type: GET_LIVE_QUESTION, liveQuestion: liveQuestion }
}

// THUNK CREATORS


export const fetchLiveQuestion = function(liveQuestionId) {
  return function thunk(dispatch) {
    return axios
      .get(`http://172.16.21.170:8080/api/liveQuestions/${Number(liveQuestionId)}`)
      .then(res => res.data)
      .then(liveQuestion => {
        return dispatch(getLiveQuestion(liveQuestion))})
      .catch(err => console.error(err));
  };
};

// QUESTIONS SUB-REDUCER
export default function(state = initialState, action) {
  switch(action.type) {
    case GET_LIVE_QUESTION:
      return Object.assign({}, state, action.liveQuestion)
    default:
      return state
  }
}
