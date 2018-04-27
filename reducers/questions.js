import axios from "axios"

// INITIAL STATE
const initialState = {}

// ACTION TYPE CREATPORS
const ADD_QUESTION = "ADD_QUESTION"

// ACTION CREATORS
const addQuestion = question => {
  return { type: ADD_QUESTION, question: question }
}

// THUNK CREATORS
export const postQuestion = function(question) {
  return function thunk(dispatch) {
    console.log("Inside postQuestion thunk")
    console.log("QUESTION:", question)
    return axios
      .post("http://localhost:8080/api/questions", question)
      .then(res => res.data)
      .then(newQuestion => {
        console.log("QUESTION:", newQuestion)
        return dispatch(addQuestion(newQuestion))})
      .catch(err => console.error(err));
  };
};

// EIGHTBALLS SUB-REDUCER
export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_QUESTION:
      return action.question
    default:
      return state
  }
}
