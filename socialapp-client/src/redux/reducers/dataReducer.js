import {SET_SCREAMS, DELETE_SCREAM, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, POST_SCREAM, SET_SCREAM, SUBMIT_COMMENT} from '../types';

const initialState = {
    screams: [],
    scream: {},
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type){
        case LOADING_DATA :
            return {
                ...state,
                loading: true,
            }
        case SET_SCREAMS :
            return {
                ...state,
                screams: action.payload,
                loading: false
            }
        case LIKE_SCREAM : 
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            if(state.scream.screamId === action.payload.screamId) {
                const comments = state.scream.comments;
                state.scream = action.payload;
                state.scream.comments = comments;
            }
            return {
                ...state
            }
        case DELETE_SCREAM:
            let index_ = state.screams.findIndex((scream) => scream.screamId === action.payload);
            state.screams.splice(index_, 1);
            return {
                ...state
            }
        case POST_SCREAM:
            return {
                ...state,
                screams: [ 
                    action.payload,
                    ...state.screams
                ]
            }
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload
            }
        case SUBMIT_COMMENT:
            return {
                ...state,
                scream: {
                    ...state.scream,
                    comments: [action.payload, ...state.scream.comments]
                }
            }
        default:
            return state;
    }
};