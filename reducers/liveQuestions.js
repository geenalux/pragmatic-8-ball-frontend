import axios from "axios"

// INITIAL STATE
const initialState = []

// ACTION TYPE CREATPORS
const GET_LIVE_QUESTIONS = "GET_LIVE_QUESTIONS"

// ACTION CREATORS
const getLiveQuestions = liveQuestions => {
  return { type: GET_LIVE_QUESTIONS, liveQuestions: liveQuestions }
}

// THUNK CREATORS
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
    default:
      return state
  }
}
