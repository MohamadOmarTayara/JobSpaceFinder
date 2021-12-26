import './comments.css'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment'


import Fav from '@material-ui/icons/FavoriteBorder';
import FavOutlined from '@material-ui/icons/Favorite';

import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/posts';
import Comment from '../../components/comments/Comment';
import PostComment from '../../components/comments/PostComment';
import Accordion from 'react-bootstrap/Accordion'

const Comments = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const [post, setPost] = useState({
        userId: localStorage.getItem('userId'),
        likes: [],
        comments: []
    });
    const [user, setUser] = useState({});
    const [ liked, setLiked ] = useState(false);
    const [ owner, setOwner ] = useState(false)
    const [ likes, setLikes ] = useState(0)
    
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const {data} = await axios.get(`/api/posts/${params.id}`, {headers: {"Content-Type": "application/json"}})
                setPost(data)
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPost();
    }, [params.id])



    useEffect(() => {
        const fetchUser = async () => {

            try {
                const { data } = await axios.get(`/api/users/${post.userId}`, {headers: {"Content-Type": "application/json"}});
                setUser(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }, [post])


    const current = localStorage.getItem('userId');


    useEffect(() => {
        setOwner(localStorage.getItem('userId') === post.userId ? true : false)
    }, [post.userId])
    
    useEffect(() => {
        setLikes(post.likes.length)
        setLiked(post.likes.includes(current))
        console.log(post);
    }, [current, post.likes])

    const likeHandler = async() => {
        try {
            await axios.put(`/api/posts/${post._id}/like`, {userId: localStorage.getItem('userId')}, {headers: {"Content-Type": "application/json"}})
        } catch (error) {
            console.log(error);
        }
        setLikes(liked ? likes - 1 : likes + 1)
        setLiked(!liked);
    }

    const handleDelete = () => {
        window.location = '/'
        return dispatch(deletePost(post._id, current))
    }


    return (
        <section className='container'>
            <div className='Comments-container'>
                <h1 className='title font'>{post.title}</h1>
                <p className='font'>
                    <Link className='link' to={`/p/${post.userId}`}>
                    <img className="profilePic" src={user.profilePicture} alt="Profile"/>
                    {user.username}
                    </Link> 
                     - {moment(post.createdAt).fromNow()}
                </p>

                <img className='space' src={post.img} alt="Workspace" /> 

                <Accordion className='ComAcc'>
                    <Accordion.Item  eventKey="0">
                        <Accordion.Header className='Acc-header' >Job description and qualifications</Accordion.Header>
                            <Accordion.Body>
                                <p className='content'>{post.desc}</p>                
                            </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <div className='buttons-sec'>

                    <button className='btns' onClick={ likeHandler  } >
                        {!liked?
                        <Fav id='Fav' /> :
                        <FavOutlined id='FavOutlined'  /> }
                        <span> | {likes}</span>
                    </button>
                    {owner ? (<button className='btns' onClick={handleDelete}><DeleteIcon /></button>) : null}
                    
                </div>
                <hr />
                <div className='comments-section'>
                {post.comments.map((comment) => (<Comment 
                    userId={comment.userId}
                    username={comment.username} 
                    comment={comment.comment}
                    postedOn={moment(comment.timestamp).fromNow()}
                    key = {comment._id}
                    profilePicture={comment.profilePicture}

                />))}
                </div>
                <PostComment postId={params.id} />
            </div>
        </section>
    )
}

export default Comments;