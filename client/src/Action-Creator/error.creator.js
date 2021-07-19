import { GET_ERRORS, CLEAR_ERRORS} from '../Types/action.types';

export const returnError = (msg, status, id = null) => ({
    type: GET_ERRORS,
    payload: {msg, status, id}
})

export const clearError = () => ({
    type: CLEAR_ERRORS
})


