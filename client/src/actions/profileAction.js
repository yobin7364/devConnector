import axios from 'axios';

import {GET_PROFILE,
        PROFILE_LOADING, 
        CLEAR_CURRENT_PROFILE,
        GET_ERRORS, 
        SET_CURRENT_USER, 
        GET_PROFILES,
        GET_EXPERIENCE_ID,
        REMOVE_EXPERIENCE_ID
        } from './types';

//get current profile
export const getCurrentProfile = () => dispatch => {
    //for loading sign and the load value of this disptach will be changed when axios dispatch occurs
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


//get profile by handle
export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/api/profile/handle/${handle}`)
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
            )
        .catch(err => 
            dispatch({
                type: GET_PROFILE,
                payload: null
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


//Update Experience
export const updateExperience = (id, updateExpData, history) => dispatch => {
    axios
        .put(`/api/profile/experience/${id}`, updateExpData)
        .then(res => history.push('/dashboard'))
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

//Get all profiles
export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('/api/profile/all')
        .then(res => 
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
            )
        .catch(err => 
            //we dont want any errors we want to display empty profile
            dispatch({
                type: GET_PROFILES,
                payload: null
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

//get experience id
export const getExperienceId = (id) => {
    return {
        type: GET_EXPERIENCE_ID,
        payload: id
    };
};

//remove experience id
export const removeExperienceId = () => {
    return {
        type: REMOVE_EXPERIENCE_ID
    }
}

