import './style.css'
import logo from '../../components/logo.png'
import { useState } from 'react';
import axios from 'axios';

const SignupScreen = ({ history }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

   

    const signupHandler = async (e) => {
        e.preventDefault();
                
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        if(username === '' || email === '' || password === '' || confirmPassword === ''){
            console.log(username)
            console.log(email)
            console.log(password)
            console.log(confirmPassword)
            setError('Please fill all the fields below.')
            console.log(error)
            return alert(error)
        }else if(password === confirmPassword){
            if(password.length <= 5){
                setError('Please enter a password of minimum length 6')
            return alert('Please enter a password of minimum length 6')
            }
        }else if(password !== confirmPassword){
            alert('Passwords Do Not Match');
            document.getElementById('password').value ='';
            document.getElementById('confirmpassword').value ='';
            setPassword('');
            setConfirmPassword('');
            
            return setError('Passwords Do Not Match')
        }

        try {
            const { data } = await axios.post('/api/auth/signup', { username, email, password }, config);
            localStorage.setItem('authToken', data.token);
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
            <div className="image2">
                <img src={logo} alt="Logo" />
            </div>
            <div className="line"></div>
            <div className="form">
                <h1>Create Account</h1>
                <div>
                    <form action="submit" onSubmit={signupHandler}>
                        <input 
                            type="text" 
                            id="username" 
                            placeholder="Username"
                            onChange={(e) => {setUsername(e.target.value)}} />

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

                        <input 
                            type="password" 
                            id="confirmpassword" 
                            placeholder="Confirm Password" 
                            onChange={(e) => {setConfirmPassword(e.target.value)}} />

                        <button type="submit" >Sign Up</button>
                    </form>
                    <p style={{color:'#105652'}}>You Already Have An Account? <a href="/login"><span className='sign-up'>Login..</span></a></p>
                </div>
            </div>
        </div>
    )
}

export default SignupScreen
