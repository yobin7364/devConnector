import {ADD_POST, GET_POST, GET_POSTS, POST_LOADING, DELETE_POST, FROM_POST, REVERT_POST} from '../actions/types';

const initialState = {
    posts: [],
    post: {},
    loading: false,
    fromPost: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case POST_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false
            };
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case DELETE_POST:
            //remove post from state, so no reload of page
            return {
                ...state,
                //action.payload contains id of post to be deleted sent from ProfileItem.jsx
                posts: state.posts.filter(post => post._id !== action.payload)
            };
        case FROM_POST:
            return{
                ...state,
                fromPost: true
            }
        case REVERT_POST:
            return{
                ...state,
                fromPost: false
            }
        default:
            return state;
    }
}