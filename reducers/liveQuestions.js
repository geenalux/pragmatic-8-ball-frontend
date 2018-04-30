import axios from "axios"

// INITIAL STATE
const initialState = []

// ACTION TYPE CREATPORS
const ADD_LIVE_QUESTION = "ADD_LIVE_QUESTION"
const GET_LIVE_QUESTIONS = "GET_LIVE_QUESTIONS"

// ACTION CREATORS
export const addLiveQuestion = liveQuestion => {
  return { type: ADD_LIVE_QUESTION, liveQuestion: liveQuestion }
}

export const getLiveQuestions = liveQuestions => {
  return { type: GET_LIVE_QUESTIONS, liveQuestions: liveQuestions }
}

// THUNK CREATORS
export const postLiveQuestion = function(liveQuestion) {
  return function thunk(dispatch) {
    return axios
      .post("http://172.16.21.170:8080/api/liveQuestions", liveQuestion)
      .then(res => res.data)
      .then(newLiveQuestion => {
        socket.emit('new-liveQuestion', newLiveQuestion);
        return dispatch(addLiveQuestion(newLiveQuestion))
      })
      .catch(err => console.error(err));
  };
};

export const fetchLiveQuestions = function() {
  return function thunk(dispatch) {
    return axios
      .get("http://172.16.21.170:8080/api/liveQuestions")
      .then(res => res.data)
      .then(liveQuestions => {
        return dispatch(getLiveQuestions(liveQuestions))})
      .catch(err => console.error(err));
  };
};

// EIGHTBALLS SUB-REDUCER
export default function(state = initialState, action) {
  switch(action.type) {
    case GET_LIVE_QUESTIONS:
      return action.liveQuestions
    case ADD_LIVE_QUESTION:
      return [...state, action.liveQuestion]
    default:
      return state
  }
}
