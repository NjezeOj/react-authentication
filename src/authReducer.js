import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    LOAD_USER,
    AUTH_ERROR,
    LOG_OUT 
} from './constants/constants';

const initialState = {
    token: localStorage.getItem('token'),
    isLoggedIn: false,
    errors: {}
}

const authReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return{
                ...state,
                isLoggedIn: true 
            }
  
        case LOAD_USER:
            localStorage.getItem('token')
            return{
                ...state,
                isLoggedIn: true
            }

        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return{
                ...state,
                isLoggedIn: false, 
                errors: {"Message": payload}
            }
        
        case LOG_OUT:
            localStorage.removeItem('token')
            return {
                ...state,
                isLoggedIn: false
            }    
        default:
            return state;
    }
}

export default authReducer; 












