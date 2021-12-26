import './postComment.css'
import axios from 'axios';
import { useState,useEffect } from 'react';

const PostComment = ({ postId }) => {
    const current = localStorage.getItem('userId');

    const [ comment, setComment ] = useState('');
    const [ username, setUsername] = useState('');
    const [ profilePicture, setPic ] = useState('');

    
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    
    useEffect(() => {
        const fetchUsername = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
    
            try {
                const { data } = await axios.get(`/api/users/${current}`, config);
                setUsername(data.username);
                setPic(data.profilePicture);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchUsername();
    }, [current])

    const onCommentSubmit = async (e) => {
        e.preventDefault();
        const commentObj = {
            userId: current,
            username,
            comment,
            profilePicture //maybe add profile pic
        }
        await axios.put(`/api/posts/${postId}/comment`, commentObj, config)
        window.location = `/a/${postId}`
    }


    return (
        <div className='post-comment-container' >
            <form action="submit" onSubmit={onCommentSubmit}>
                <textarea placeholder='Comment' className='post-comment-input' onChange={(e) => setComment(e.target.value)}></textarea>
                <div className="post-comment-add">
                    <button type='submit'>
                        <span className="addPostSpan">Add</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PostComment
