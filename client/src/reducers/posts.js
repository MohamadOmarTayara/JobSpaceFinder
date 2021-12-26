import { CREATE, GET_USER_POSTS, GET_ALL_POSTS } from "../actions/user";
import { DELETE_POST } from '../actions/posts'


export default function postReducer(state = [], action){
    switch(action.type){
        case GET_ALL_POSTS:
            return action.payload
        case GET_USER_POSTS: 
            return action.payload
        case CREATE: 
            return [...state, action.payload]
        case DELETE_POST:
            return state.filter((post) => post._id !== action.payload)
        default:
            return state;
    }
}