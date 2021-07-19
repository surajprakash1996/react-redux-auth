import {
  AUTH_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADING
} from '../Types/action.types';

import {checkAuth} from '../checkAuth';
import { useSelector } from 'react-redux';
import {returnError, clearError} from './error.creator';
import axios from 'axios';

//1. Load User Action-Creator.

export const loadUser =  () => {
  return async (dispatch) => {
    dispatch({type: USER_LOADING });
    const { token } = useSelector(state => state.auth);
    try {
      const res = await axios.get('http://localhost:4000/user', checkAuth(token));
      dispatch({type: USER_LOADED, payload: res.data});
    } catch (error) {
      dispatch(returnError(error.response.data, error.response.status));
      dispatch({type:AUTH_FAIL});
    }
  }
}

//2. Login User Action-Creator.

export const login = ({email,password}) =>  {
  return async (dispatch) => {
    try {
      const config = {
        url:'http://localhost:4000/user/login',
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        data: JSON.stringify({email,password})
      }
      const res = await axios(config);
      dispatch(clearError());
      dispatch({type: LOGIN_SUCCESS, payload: res.data});
      loadUser();
    } catch(error) {
      dispatch(returnError(error.response.data, error.response.status,'Login Fail.'))
      dispatch({type:LOGIN_FAIL});
    }
  }
}

// 3. Register User Action Creator.

export const registerForm = ({name,gender,phone,email,password}) => {
  return async (dispatch) => {
    try {
      const config = {
        url:'http://localhost:4000/user/register',
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        data: JSON.stringify({name,gender,phone,email,password})
      }
      const res = await axios(config);
      dispatch(clearError());
      dispatch({type: REGISTER_SUCCESS, payload: res.data});
      loadUser();
    } catch(error) {
      dispatch(returnError(error.response.data, error.response.status,'Register Fail.'))
      dispatch({type:REGISTER_FAIL});
    }
  }
}

//4. Logout User Action Creator.

export const logout = () => {
  return (dispatch) => {
    dispatch({type:LOGOUT_SUCCESS})
  }
}