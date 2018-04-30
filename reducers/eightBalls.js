import axios from "axios"

// INITIAL STATE
const initialState = []

// ACTION TYPE CREATPORS
const GET_EIGHTBALLS = "GET_EIGHTBALLS"

// ACTION CREATORS
const getEightBalls = eightBalls => {
  return { type: GET_EIGHTBALLS, eightBalls: eightBalls }
}

// THUNK CREATORS
export const fetchEightBalls = function() {
  return function thunk(dispatch) {
    return axios
      .get("http://172.16.21.170:8080/api/eightBalls")
      .then(res => res.data)
      .then(eightBalls => {
        return dispatch(getEightBalls(eightBalls))})
      .catch(err => console.error(err));
  };
};

// EIGHTBALLS SUB-REDUCER
export default function(state = initialState, action) {
  switch(action.type) {
    case GET_EIGHTBALLS:
      return action.eightBalls
    default:
      return state
  }
}
