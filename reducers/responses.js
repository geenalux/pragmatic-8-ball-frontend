import axios from "axios"
import socket from '../socket';

// INITIAL STATE
const initialState = []

// ACTION TYPE CREATORS
const ADD_RESPONSE = "ADD_RESPONSE"

// ACTION CREATORS
const addResponse = response => {
  return { type: ADD_RESPONSE, response: response }
}

// THUNK CREATORS
export const postLiveResponse = function(response) {
  return function thunk(dispatch) {
    return axios
      .post("http://localhost:8080/api/liveResponses", response)
      .then(res => res.data)
      .then(newResponse => {
        return dispatch(addResponse(newResponse))
        socket.emit('new-liveResponse', newResponse);
      })
      .catch(err => console.error(err));
  };
};

// QUESTIONS SUB-REDUCER
export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_RESPONSE:
      return [...state, action.response]
    default:
      return state
  }
}
