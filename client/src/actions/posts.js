import axios from 'axios'

export const DELETE_POST = 'DELETE_POST'



export const deletePost = (id, userId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/api/posts/${id}`, {headers: {"Content-Type": "application/json"}, data: {userId}});
            dispatch({type: DELETE_POST, payload: id})
        } catch (error) {
            console.log(error.message);
        }
    }
}