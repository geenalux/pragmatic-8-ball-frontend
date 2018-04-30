import axios from "axios"

// INITIAL STATE
const initialState = {}

// ACTION TYPE CREATPORS
const GET_EIGHTBALL = "GET_EIGHTBALL"

// ACTION CREATORS
const getEightBall = eightBall => {
  return { type: GET_EIGHTBALL, eightBall: eightBall }
}

// THUNK CREATORS
export const fetchEightBall = function(eightBallId) {
  return function thunk(dispatch) {
    return axios
      .get(`http://172.16.21.170:8080/api/eightBalls/${eightBallId}`)
      .then(res => res.data)
      .then(eightBall => {
        return dispatch(getEightBall(eightBall))})
      .catch(err => console.error(err));
  };
};

// EIGHTBALLS SUB-REDUCER
export default function(state = initialState, action) {
  switch(action.type) {
    case GET_EIGHTBALL:
      return action.eightBall
    default:
      return state
  }
}
