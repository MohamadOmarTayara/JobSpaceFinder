import React, {useState,useEffect} from "react";
import './Modal.css';
import Search from '@material-ui/icons/Search';
import { Link } from "react-router-dom";
import axios from "axios";
import Arrow from '@material-ui/icons/ArrowForwardIosRounded';

function Modal({ setOpenModal }) {
    const [search,setSearch]= useState('');
    const [collected, setCollected] = useState([]);
    const [bool,setBool] = useState(true);
    const [username, setUsername] = useState('')
    const [post,setPost] = useState({});

    // fetch data when input received
    useEffect(() => {
        if(search !== ''){
            if(bool)
                return fetchUsers(search);
            return fetchJobs(search)
        }
        setCollected([])
    }, [search]);

    //toggle between jobs and users
    useEffect(() => {
        setCollected([]);
        if(bool){
            document.getElementById("jobs").style.backgroundColor = "#fbf3e4";
            document.getElementById("users").style.backgroundColor = "#b91646";
        }else{
            document.getElementById("users").style.backgroundColor = "#fbf3e4";
            document.getElementById("jobs").style.backgroundColor = "#b91646";

        }
    }, [bool])

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
                    setUsername(data.username);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchUser();
    }, [post])


    //fetch users
    const fetchUsers = (query)=>{
        fetch('/api/users/search-users',{
                method:'post',
                headers: {
                "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    query
                })
            }
        ).then(res => res.json())
        .then(results => { 
            setCollected(results.user)
        })
        
    }


    //fetch posts
    const fetchJobs = (query)=>{
        fetch('/api/posts/search-posts',{
                method:'post',
                headers: {
                "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    query
                })
            }
        ).then(res => res.json())
        .then(results => { 
            setCollected(results.post)
        })
    }



    return (
    <div className="modalBackground">
        <div className="titleCloseBtn">
            <button
            onClick={() => {
                setOpenModal(false);
            }}
            >
            <p className="exit">X</p>
            </button>
        </div>
        <div className="modalContainer">
            <div className="User-Posts">
                <h1>Search for: </h1>
                <div className="Search-For">
                     
                    <button id='users' className="UsersB" onClick={ () => setBool(true)}>Users</button>
                    /
                    <button id="jobs" className="PostsB" onClick={ () => setBool(false)}>Jobs</button>
                </div>
            </div>
            <div className="header">
                <input type="text" placeholder="Search" value={search} onChange={(e)=> setSearch(e.target.value)}/>
                <button className="SearchB">
                    <Search fontSize="large" className="S-icon"/>
                </button>
            
            </div>
            <div className="modal-body">
                <ul className="collection">
                    {bool ? collected.map(item => {
                        return (
                            <div className="collection-item">
                                
                                <li className="list" key={item.toString()} >
                                    <img src={item.profilePicture} alt="DP" className="profilePic2" /> 
                                    {item.username}
                                
                                    <Link className="toProfile" onClick={() => {setOpenModal(false);}} to={`/p/${item._id}`}>
                                        <Arrow  fontSize="large" className="icon" />
                                    </Link>
                                </li>
                            </div>
                        )
                    }): collected.map(item => {
                        return (
                            <div className="collection-item">
                                {/* {setPost(item)} */}
                                
                                <li className="list" key={item.toString()} >

                                    {item.title}                                
                                    {/* <p>by: </p>  */}
                                    <Link to={`/a/${item._id}`} onClick={() => {setOpenModal(false);}} className="toProfile" >
                                        <Arrow  fontSize="large" className="icon" /> 
                                    </Link>           
                                    {/* <p>{username}</p> */}
                                </li>
                            </div>
                        )
                    }) }
                </ul>
            </div>
        </div>
    </div>
    );
  }


export default Modal;