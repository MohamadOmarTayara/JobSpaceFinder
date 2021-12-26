import './profile.css';
import Post from '../../components/post/Post';
import Info from '../../components/profileInfo/Info';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserPosts } from '../../actions/user';
import { useParams } from 'react-router-dom' 
import axios from 'axios';

import Accordion from 'react-bootstrap/Accordion';


const Profile = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);
    const params = useParams();
    const [user, setUser] = useState({followers: []});

    useEffect(() => {
        dispatch(getUserPosts(params.id));
    }, [params.id, dispatch]);

    const uid = params.id;

    useEffect(() => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get(`/api/users/${uid}`, config)
                setUser(data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }, [uid])
    

    return (
        <div className="container">
            <div className="profile">
        
            <Info className="infoContainer" user={user}/>
            <Accordion className='acc'>
                    <Accordion.Item  eventKey="0">
                    <Accordion.Header>Jobs posted by__<span style={{fontWeight:'bold'}}> {user.username}</span></Accordion.Header>
                        <Accordion.Body>

                <div className="posts">
                    {posts.map((p) => (
                        <Post key={p._id} post={p} />
                    ))}
                </div>

                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

            </div>
        </div>
    )
}

export default Profile