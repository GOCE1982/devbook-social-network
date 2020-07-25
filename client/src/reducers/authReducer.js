import isEmpty from "../validation/is-empty";

import { SET_CURRENT_USER, REGISTER_SUCCESS } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem("token"),
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        user: action.payload,
        isAuthenticated: true,
      };
    default:
      return state;
  }
}
