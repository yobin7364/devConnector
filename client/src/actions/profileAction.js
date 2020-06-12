import axios from 'axios';

import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER} from './types';

//get current profile
export const getCurrentProfile = () => dispatch => {
    //for loading sign
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
            )
        .catch(err => 
            //when no profile is found then send empty object to display no profile
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
            );
}

//create profile
export const createProfile = (profileData, history) => dispatch => {
    axios.post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            );
}

//Add experience 
export const addExperience = (expData, history) => dispatch => {
    axios
        .post('/api/profile/experience',expData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            );
}

//Add education 
export const addEducation = (eduData, history) => dispatch => {
    axios
        .post('/api/profile/education',eduData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            );
}

//Delete Experience
export const deleteExperience = (id) => dispatch => {
    axios
        .delete(`/api/profile/experience/${id}`)
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
            )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            );
}

//Delete education
export const deleteEducation = (id) => dispatch => {
    axios
        .delete(`/api/profile/education/${id}`)
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
            )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            );
}


// delete account & profile
export const deleteAccount = () => dispatch => {
    if(window.confirm('Are you sure? This cannot be undone')){
        axios
            .delete('/api/profile')
            .then(res => 
                dispatch({
                    //make isAuthorized false to logout user as user is deleted
                    type: SET_CURRENT_USER,
                    payload: {}
                })
                )
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
                );
    }
}

//profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};

//clear profile, which means set profile object to null 
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};