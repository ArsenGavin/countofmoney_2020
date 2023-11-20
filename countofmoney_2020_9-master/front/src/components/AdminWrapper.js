import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

const AdminWrapper = ({children}) => {
    const user = useSelector(store => store.user);
    if (!user) {
        return <Redirect to={'/dashboard'} />
    }
    else if (user && user.role !== 'Admin') {
        return <Redirect to={'/dashboard'} />
    } else {
        return(children);
    }
};

export default AdminWrapper;
