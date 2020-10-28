//this is an action file, in which we will have a couple of actions
import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    LOAD_USER,
    AUTH_ERROR,
    LOG_OUT
}  from  '../constants/constants';
import axios from 'axios'

import {setToken} from '../setToken'

export const loadUser = () => async dispatch => {
    if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'))
    }
    
    try{
        
        let response = await axios.get('http://localhost:5000/api/users');

        dispatch({
            type: LOAD_USER,
            payload: response.data
        });

    } catch(error){
                
        dispatch({type: AUTH_ERROR, payload: error})
    }
    /*await axios.post('http://localhost:5000/api/users/')
        .then(res => {
            dispatch({
                type: LOAD_USER,
                payload: res.data

            });

            dispatch(loadUser());
        })
        .catch(err => {
            dispatch({ type: AUTH_ERROR, payload: err.response.data })
        })
        */
    
}

export const registerUser = (email, password) => async dispatch => {
    
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({email, password})

        const response = await axios.post('http://localhost:5000/api/users/register', body, config);

        
        
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data,
            
        });

        dispatch(loadUser());

    }catch (error){        
        dispatch({ type: REGISTER_FAIL, payload: error })
    }

    /*const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password })

    await axios.post('http://localhost:5000/api/users/register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,

            });

            dispatch(loadUser());
        })
        .catch(err => { 
            dispatch({ type: REGISTER_FAIL, payload: err.response.data })
        })*/
}

export const loginUser = (email, password) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const body = JSON.stringify({ email, password })

        const response = await axios.post('http://localhost:5000/api/users/login', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        });

        dispatch(loadUser());

    } catch (error) {
        console.log("error:", error)
        dispatch({ type: LOGIN_FAIL, payload: error })
    }

    /*const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password })

    await axios.post('http://localhost:5000/api/users/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });

            dispatch(loadUser());
        })
        .catch(err => {
            dispatch({ type: LOGIN_FAIL, payload: err.response.data })
        })*/
}

export const logOut = () => async dispatch => {
    dispatch({
        type: LOG_OUT
    })
}