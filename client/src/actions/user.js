import axios from 'axios'

export const GET_USER_POSTS = 'GET_USER_POSTS'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const CREATE = 'CREATE'


const config = {
    headers: {
        "Content-Type": "application/json"
    }
}

export const getUserPosts = (uid) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/posts/profile/${uid}`, config);
            dispatch({type:  GET_USER_POSTS, payload: data})
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const getFeedPosts = (uid) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/posts/timeline/${uid}`, config);
            dispatch({type:  GET_ALL_POSTS, payload: data})
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const createPost = (post) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('/api/posts', post, config);
            dispatch({ type: CREATE, payload: data})
        } catch (error) {
            console.log(error.message);
        }
    }
}