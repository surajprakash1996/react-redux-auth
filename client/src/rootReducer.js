import { combineReducers } from 'redux';
import authReducer from './reducers/Auth.Reducer';
import errorReducer from './reducers/Error.Reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer
})

export default rootReducer;