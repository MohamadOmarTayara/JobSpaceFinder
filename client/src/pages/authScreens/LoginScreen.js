import { useState, useEffect } from 'react'
import './style.css'
import logo from '../../components/logo.png'
import axios from 'axios'



const LoginScreen = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    // add error UI
    console.log(error);

    useEffect(() => {
        if(localStorage.getItem('authToken')){
            window.location = '/'
        }
    }, [history])

    

    const loginHandler = async(e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const { data } = await axios.post('/api/auth/login', { email, password }, config);
            localStorage.setItem('authToken', data.token)
            localStorage.setItem('userId', data.user)
            window.location = '/'
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);   
        }
    }

    return (
        <div className="page" >
            <div className='top'>
                <div className="image">
                    <img src={logo} alt="Logo" />
                </div>
                <h1 className='name'>JobSpaceFinder</h1>
            </div>
            <div className='bot'>
                <div className="form">
                    <div>
                        <form action="submit" onSubmit={loginHandler}>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="Email"
                                onChange={(e) => {setEmail(e.target.value)}}/>

                            <input 
                                type="password" 
                                id="password" 
                                placeholder="Password"
                                onChange={(e) => {setPassword(e.target.value)}}/>
                            <button>Login</button>
                        </form>
                        <p style={{color:'#105652'}}>You Don't Have An Account?  <a href="/signup"> <span className='sign-up'> Sign Up..</span></a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen
