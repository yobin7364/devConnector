import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS,SET_CURRENT_USER } from './types';
import jwt_decode from 'jwt-decode';

//Register User
export const registerUser = (userData, history) => dispatch => {
        //client side http request base on promise and http://localhost:5000 is prefiex as proxy in package.json
        axios.post('/api/users/register',userData)
            //'history.push' is for redirection
            .then(res => history.push('/login'))
            //recive error in object using 'err.response.data', redux-thunk allows us to call disptach when ever we want avoiding immidiate call
            .catch(err => dispatch(
                {
                    type: GET_ERRORS,
                    payload: err.response.data
                }
            ));
};


//Login - Get User Token
export const loginUser = userData => dispatch =>{
    axios.post('/api/users/login', userData)
        .then(res => {
            //save to localStorage
            const {token} = res.data;
            // set token to LS and LS always takes string and our token is a string
            localStorage.setItem('jwtToken',token);
            // set token to Auth header
            setAuthToken(token);
            // decode token to get user data
            const decoded = jwt_decode(token);
            // set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => 
            //this dispatched should be sent to reducer
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
            
}

//set logged in user
export const setCurrentUser = (decoded) => {
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//log user out
export const logoutUser = () => dispatch => {
    //remove token from localstorage
    localStorage.removeItem('jwtToken');
    //remove auth header for future requests
    setAuthToken(false);
    //set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};
