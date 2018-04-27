import axios from "axios"

// INITIAL STATE
const initialState = []

// ACTION TYPE CREATPORS
const GET_EIGHTBALLS = "GET_EIGHTBALLS"

// ACTION CREATORS
const getEightBalls = eightBalls => { type: GET_EIGHTBALLS, eightBalls }

// THUNK CREATORS
export const fetchEightBalls = function() {
  return function thunk(dispatch) {
    return axios
      .get("/api/eightBalls")
      .then(res => res.data)
      .then(eightBalls => dispatch(getEightBalls(eightBalls)))
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
