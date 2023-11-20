import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

const AuthWrapper = ({children}) => {
    const {isAuth} = useSelector(store => store.user);

    if (!isAuth) {
        return <Redirect to={'/login'} />
    }
    return(children);
};

export default AuthWrapper;
