import axios from "axios"

// INITIAL STATE
const initialState = {}

// ACTION TYPE CREATORS
const ADD_QUESTION = "ADD_QUESTION"
const GET_QUESTION = "GET_QUESTION"

// ACTION CREATORS
const addQuestion = question => {
  return { type: ADD_QUESTION, question: question }
}

const getQuestion = question => {
  return { type: GET_QUESTION, question: question }
}

// THUNK CREATORS
export const postQuestion = function(question) {
  return function thunk(dispatch) {
    return axios
      .post("http://localhost:8080/api/questions", question)
      .then(res => res.data)
      .then(newQuestion => {
        return dispatch(addQuestion(newQuestion))})
      .catch(err => console.error(err));
  };
};

export const fetchQuestion = function(questionId) {
  console.log("Question Id", questionId)
  return function thunk(dispatch) {
    return axios
      .get(`http://localhost:8080/api/questions/${Number(questionId)}`)
      .then(res => res.data)
      .then(question => {
        return dispatch(getQuestion(question))})
      .catch(err => console.error(err));
  };
};

// QUESTIONS SUB-REDUCER
export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_QUESTION:
      return Object.assign({}, state, action.question)
    case GET_QUESTION:
      return Object.assign({}, state, action.question)
    default:
      return state
  }
}
