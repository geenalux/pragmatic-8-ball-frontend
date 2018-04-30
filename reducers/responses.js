import axios from "axios"
import socket from '../socket';

// INITIAL STATE
const initialState = []

// ACTION TYPE CREATORS
const ADD_RESPONSE = "ADD_RESPONSE"
const GET_RESPONSES = "GET_RESPONSES"

// ACTION CREATORS
const addResponse = response => {
  return { type: ADD_RESPONSE, response: response }
}

const getLiveResponses = responses => {
  return { type: GET_RESPONSES, responses: responses}
}

// THUNK CREATORS
export const postLiveResponse = function(response) {
  return function thunk(dispatch) {
    return axios
      .post("http://172.16.21.170:8080/api/liveResponses", response)
      .then(res => res.data)
      .then(newResponse => {
        socket.emit('new-liveResponse', newResponse);
        return dispatch(addResponse(newResponse))
      })
      .catch(err => console.error(err));
  };
};

export const fetchLiveResponses = function() {
  return function thunk(dispatch) {
    return axios
      .get("http://172.16.21.170:8080/api/liveResponses")
      .then(res => res.data)
      .then(liveResponses => {
        return dispatch(getLiveResponses(liveResponses))})
      .catch(err => console.error(err));
  };
};

// QUESTIONS SUB-REDUCER
export default function(state = initialState, action) {
  switch(action.type) {
    case GET_RESPONSES:
      return action.responses
    case ADD_RESPONSE:
      return [...state, action.response]
    default:
      return state
  }
}
