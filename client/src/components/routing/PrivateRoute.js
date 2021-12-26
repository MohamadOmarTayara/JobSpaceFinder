import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <>
            <NavBar />
            <Route
                {...rest}
                render={
                    (props) => localStorage.getItem("authToken") ? (
                        <Component {...props} />
                    ) : (
                            <Redirect to="/login" />
                        )
                }
            />
        </>
    )
}

export default PrivateRoute