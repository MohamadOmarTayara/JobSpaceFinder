import React from 'react'
import { Route } from 'react-router-dom';

import LoginScreen from '../../pages/authScreens/LoginScreen';
import SignupScreen from '../../pages/authScreens/SignupScreen';

const Auth = () => {
    return (
        <>
            <Route exact path="/login" component={LoginScreen}/>
            <Route exact path="/signup" component={SignupScreen}/>
        </>
    )
}

export default Auth