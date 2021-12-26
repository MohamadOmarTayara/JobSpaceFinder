import "./post.css";
import logo from '../logo.png'
import moment from 'moment'
import axios from 'axios'
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'

import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/CardHeader';
import CardImg from 'react-bootstrap/CardImg';
import CardBody from 'react-bootstrap/CardHeader';

import Carousel from 'react-bootstrap/Carousel';
import CarouselCaption from 'react-bootstrap/CarouselCaption';
import CarouselItem from 'react-bootstrap/CarouselItem';

import Comment from '@material-ui/icons/ChatBubble'
import Delete from '@material-ui/icons/Delete';

import Fav from '@material-ui/icons/FavoriteBorder';
import FavOutlined from '@material-ui/icons/Favorite';

import { deletePost } from '../../actions/posts';
import { Link } from "react-router-dom";


const Post = ({ post }) => {
    const [current, setCurrent] = useState('');
    const owner = post.userId === current ? true : false;
    const dispatch = useDispatch();
    const [ user, setUser ] = useState({});

    useEffect(() => {
        setCurrent(localStorage.getItem('userId'))
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json"  
                }
            }
    
            try {
                const { data } = await axios.get(`/api/users/${post.userId}`, config);
                if(data._id)
                    setUser({userId: data._id , username: data.username});
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchUser();
    }, [post.userId])

    const [ likes, setLikes ] = useState(post.likes.length)
    const [ liked, setLiked ] = useState(false);

    useEffect(() => {
        setLiked(post.likes.includes(current))
    }, [current, post.likes])

    const likeHandler = async () => {
        try {
            await axios.put(`/api/posts/${post._id}/like`, {userId: current}, {headers: {"Content-Type": "application/json"}})
        } catch (error) {
            return console.log(error);
        }
        setLikes(liked ? likes - 1 : likes + 1)
        setLiked(!liked);
        
    }

    // useEffect(() => {
    //     if(liked){
    //         document.getElementById("Fav").style.display='none';
    //         document.getElementById("FavOutlined").style.display = "inline";
    //         document.getElementById("FavOutlined").style.color = "#b91646";

    //     }else{
    //         document.getElementById("Fav").style.color='#b91646';
    //         document.getElementById("Fav").style.display='inline';
    //         document.getElementById("FavOutlined").style.display = "none";
    //     }
    // }, [liked])
    
    return (  
        
        <div className="post">
            <Card style={{width: '25rem' }}>
                <CardHeader>
                    <h3><Link to={`/a/${post._id}`} className="user-link" >{post.title}</Link></h3>
                </CardHeader>
               
                <Carousel interval={null}>
               
                <CarouselItem className="item image-video">
                    <CardImg className="image-video" variant="top" src={post.img ? post.img : logo} alt="First slide"/>
                    <CarouselCaption>
                        <h3 className="caption">Workspace</h3>
                    </CarouselCaption>
                </CarouselItem>

                <CarouselItem className="item desc">
                <div className='post-desc'>{post.desc}</div>
                     
                 </CarouselItem>
                </Carousel>
                    
                <CardBody>
                <Card.Title>
                    <h3 className="post-user"><Link to={`/p/${post.userId}`} className="user-link username">{user.username}</Link> </h3>
                </Card.Title>

                </CardBody>


                <div className="buttons">
                    <button id ='like' onClick={ likeHandler } >{!liked?
                        <Fav id='Fav' /> :
                        <FavOutlined id='FavOutlined'  /> }
                        <span> | {likes}</span>
                    </button>

                    <a title="Comment" className="Go-to-comment" href={`/a/${post._id}`}><Comment/></a>

                    {owner ? (<button id="delete" onClick={() => dispatch(deletePost(post._id, current))}><Delete/></button>) : null}
                    
                    
                </div>
                <footer className="blockquote-footer">
                <p>- {moment(post.createdAt).fromNow()} -</p>
                </footer>
            </Card>
        </div>
    )
}

export default Post