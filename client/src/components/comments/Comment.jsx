import './comment.css'
import { Link } from 'react-router-dom'

const Comment = ({ userId, username, comment, postedOn,profilePicture} ) => {
    return (
        <div className="comment-container">
            <div className='user-comment'>
                <img className="profilePic" src={profilePicture} alt="Profile"/>
                <p className='user'><Link to={`/p/${userId}`} className="comment-link">{username}</Link> - {postedOn}</p>
            </div>
            <div className='comment' >
                <h5>{comment}</h5>
            </div>
        </div>
    )
}

export default Comment