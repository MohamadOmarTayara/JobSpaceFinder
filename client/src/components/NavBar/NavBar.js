import {useState} from 'react';

import './NavBar.css'
import logo from '../logo.png'

import ExitToAppIconOutlined from '@material-ui/icons/MeetingRoom';
import ExitToAppIcon from '@material-ui/icons/MeetingRoomOutlined';


import HomeIconOutlined from '@material-ui/icons/HomeOutlined';
import HomeIcon from '@material-ui/icons/Home';

import PersonIconOutlined from '@material-ui/icons/AccountCircleOutlined';
import PersonIcon from '@material-ui/icons/AccountCircle';

import PageviewOutlined from '@material-ui/icons/PageviewOutlined';
import Pageview from '@material-ui/icons/Pageview';

import Modal from '../Modal/Modal'
import { Link } from 'react-router-dom';


const NavBar = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const uid = localStorage.getItem('userId');

    const logoutHandler = () => {
        localStorage.clear();
        window.location = '/'
    }

    return (
        <section>
            <div className="nav">
                <div className="nav-left">
                    <a title="Home" href="/"><img src={logo} alt="Logo" className="logo" /></a>
                    <h1 className='name2'>JobSpaceFinder</h1>
                </div>                  

                <div className="nav-right">
                    <div className="icons">
                        
                        <button title='Search for users' href='#' onClick={() => { setModalOpen(true);}} className='lock0' >
                            <PageviewOutlined  fontSize="large" className="icon icon0-unlock" />
                            <Pageview  fontSize="large" className="icon icon0-lock" />
                        </button>

                        <Link title="Home" to='/' className = 'lock' >
                            <HomeIconOutlined fontSize="large" className="icon icon-unlock" />
                            <HomeIcon fontSize="large" className="icon icon-lock" />
                        </Link>

                       
                        
                        <Link title="Profle" to={`/p/${uid}`} className='lock3' >
                            <PersonIconOutlined  fontSize="large" className="icon icon3-unlock" />
                            <PersonIcon  fontSize="large" className="icon icon3-lock" />
                        </Link>
                        
                        <Link title="Logout" to='/login' className='lock5'>
                            <ExitToAppIcon onClick={logoutHandler} className="icon icon5-unlock" fontSize="large" />
                            <ExitToAppIconOutlined  onClick={logoutHandler} className="icon icon5-lock" fontSize="large" />
                        </Link>
                    </div>
                </div>


            </div>
                {modalOpen && <Modal setOpenModal={setModalOpen} className='modal' />}
        </section>
    )
}

export default NavBar