import './settings.css';
import FileBase from 'react-file-base64'
import { useState } from 'react';
import axios from 'axios';


const Settings = () => {
    const current = localStorage.getItem('userId');


    const [user, setUser] = useState({
        userId: current,
    });

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitted');

        // handle password and confirm password
        try {
            console.log(user);
            await axios.put(`/api/users/${current}`, { ...user }, config);
        } catch (error) {
            console.log(error);
        }
    }

    const showAlert = async () => {
        alert("You're good to go!");
    }

    return (
        <div className='settings-background'>
            <form className='settings-form' onSubmit={handleSubmit}>                
                <input
                    className='settings-input'
                    type='text'
                    placeholder="Username"
                    autoComplete="off"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })} />

                <textarea
                    className='settings-input settings-bio'
                    type='text'
                    placeholder="Bio"
                    autoComplete="off"
                    value={user.bio}
                    minLength='40px'
                    onChange={(e) => setUser({ ...user, bio: e.target.value })} />


                        <p style={{margin:'auto'}}>Change Profile Image ?</p>
                    <button className="addPhoto">
                        <FileBase
                            className='settings-file'
                            type='file'
                            multiple={false}
                            onDone={({ base64 }) => setUser({ ...user, profilePicture: base64 })} />
                    </button>
                <div>
                    <button onClick={showAlert} className='settings-btn' type='submit'>Save Changes</button>
                </div>
            </form>
        </div>
    )
}

export default Settings
