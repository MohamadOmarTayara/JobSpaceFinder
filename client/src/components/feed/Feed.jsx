import './feed.css'
import Share from '../share/Share'
import Post from '../post/Post'
import { useSelector, useDispatch } from 'react-redux'
import { getFeedPosts } from '../../actions/user'
import { useEffect } from 'react'

const Feed = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer)
    const uid = localStorage.getItem('userId');

    useEffect(() => {
        dispatch(getFeedPosts(uid))
    }, [uid, dispatch]);

    return (
        <div className="container">
            <div className="feed">
                <Share />
                <div className="posts">
                    {posts.map((p) => (
                        <Post key={p._id} post={p}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Feed