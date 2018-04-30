import axios from "axios"
import socket from '../socket';

// INITIAL STATE
const initialState = {}

// ACTION TYPE CREATORS
const ADD_LIVE_QUESTION = "ADD_LIVE_QUESTION"
const GET_LIVE_QUESTION = "GET_LIVE_QUESTION"

// ACTION CREATORS
const addLiveQuestion = liveQuestion => {
  return { type: ADD_LIVE_QUESTION, liveQuestion: liveQuestion }
}

const getLiveQuestion = liveQuestion => {
  return { type: GET_LIVE_QUESTION, liveQuestion: liveQuestion }
}

// THUNK CREATORS
export const postLiveQuestion = function(liveQuestion) {
  return function thunk(dispatch) {
    return axios
      .post("http://localhost:8080/api/liveQuestions", liveQuestion)
      .then(res => res.data)
      .then(newLiveQuestion => {
        socket.emit('new-liveQuestion', newLiveQuestion);
        return dispatch(addLiveQuestion(newLiveQuestion))
      })
      .catch(err => console.error(err));
  };
};

export const fetchLiveQuestion = function(liveQuestionId) {
  return function thunk(dispatch) {
    return axios
      .get(`http://localhost:8080/api/liveQuestions/${Number(liveQuestionId)}`)
      .then(res => res.data)
      .then(liveQuestion => {
        return dispatch(getLiveQuestion(liveQuestion))})
      .catch(err => console.error(err));
  };
};

// QUESTIONS SUB-REDUCER
export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_LIVE_QUESTION:
      return Object.assign({}, state, action.liveQuestion)
    case GET_LIVE_QUESTION:
      return Object.assign({}, state, action.liveQuestion)
    default:
      return state
  }
}
