import {GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_EXPERIENCE_ID, REMOVE_EXPERIENCE_ID} from '../actions/types'; 

const initialState = {
    //null is used to indicate empty object 
    profile: null,
    profiles: null,
    experienceId: '',
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            }
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }
        case GET_EXPERIENCE_ID:
            return {
                ...state,
                experienceId: action.payload
            }
        case REMOVE_EXPERIENCE_ID:
            return {
                ...state,
                experienceId: ''
            }
        default:
            return state;
    }
}