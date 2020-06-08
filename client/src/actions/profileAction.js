import axios from 'axios';

import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE} from './types';

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