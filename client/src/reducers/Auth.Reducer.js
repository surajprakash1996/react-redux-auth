import {
  AUTH_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADING
} from "../Types/action.types";

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null
}
 const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading:true
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.docs));
      return {
        ...state,
        user: JSON.parse(localStorage.getItem('user')),
        isAuthenticated:true,
        isLoading: false,
        token:localStorage.getItem('token')
      }
    case AUTH_FAIL:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        token: null,
        isAuthenticated:false,
        isLoading:false,
        user: null
      }
    default:
      return state;
  }
}

export default authReducer;
