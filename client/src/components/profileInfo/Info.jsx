import './info.css';
import person from '../person.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';


const Info = ({ user }) => {
    const current = localStorage.getItem('userId');
    const [followers, setFollowers ] = useState(0)
    const [isFollowed, setIsFollowed] = useState(false);

    useEffect(() => {
        setFollowers(user.followers.length)
        setIsFollowed(user.followers.includes(current))
    }, [current, user]);

    const followHandler = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            if(isFollowed){
                await axios.put(`/api/users/${user._id}/unfollow`, {userId: current}, config);
                setIsFollowed(!isFollowed);
                setFollowers(followers - 1 );
            } else {
                await axios.put(`/api/users/${user._id}/follow`, {userId: current}, config);
                setIsFollowed(!isFollowed);
                setFollowers(followers + 1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    

    return (
        <div className="info">
            <div className="infoContent">

                <div className="first">
                    <div > 
                        <img className="Pic" src={user.profilePicture ? user.profilePicture : person} alt="Profile"/> 
                    </div>
                    <div className="second">
                        <div className="username"> 
                            <span><h4>@{user.username}</h4></span>
                        </div>
                        <div className='folowers'>
                            <p className="details">Followers<span> {followers}  </span></p>
                            <p className="details">Followings<span> {user.followings ? user.followings.length : 0} </span></p>
                        </div>
                        <div>
                            {user._id === current ? <Link to='/settings' ><button className="info-btn">Edit Profile</button></Link>:<button className="info-btn" onClick={ followHandler }>{isFollowed ? 'Unfollow':'Follow'}</button>}
                            <Accordion className='acc2'>
                                <Accordion.Item  eventKey="0">
                                    <Accordion.Header>More about__  <span style={{fontWeight:'bold'}}>{user.username}</span></Accordion.Header>
                                        <Accordion.Body>
                                            <p className="bio" > {user.bio}</p>
                                        </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            
                        </div>
                    </div>
                   
                </div>
                
            </div>
        </div>
    )
}

export default Info