import React, {useEffect} from 'react'
import './style/App.css'
import {Route, Switch, Redirect} from 'react-router-dom'

import 'rsuite/dist/styles/rsuite-dark.css';
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import UserProfile from './pages/UserProfile'
import NotFound from './pages/NotFound'
import Cookies from 'universal-cookie';
import {NavBarContainer} from './pages/containers/NavBarContainer';
import {auth} from "./actions/auth";
import {useDispatch, useSelector} from "react-redux";
import {openNotification} from "./actions/notifications";
import AdminWrapper from "./components/AdminWrapper";
import './App.css';

const cookies = new Cookies();

export default function App() {
    const {isAuth} = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (cookies.get('sess')) {
            auth()(dispatch)
                .then(({isAuth}) => setTimeout(() => {
                    if (!isAuth) {
                        openNotification({
                            type: 'error',
                            message: 'Authentication failed',
                            description: 'Can\`t reconnect to session, try to relog your account.'
                        });
                    }
                }, 1000));
        }

    }, []);
    return (
        //Articles
        //Liste de crypto
        //Graphiques crypto
        <>
            <NavBarContainer/>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/dashboard"/>
                </Route>
                <Route path="/dashboard">
                    <Dashboard/>
                </Route>
                <Route path="/users/:id">
                    <UserProfile/>
                </Route>
                <Dashboard path="/dashboard"/>
                <Login path="/login"/>
                <Register path="/register"/>
                    <AdminWrapper>
                        <Admin path="/admin"/>
                    </AdminWrapper>
                <NotFound default/>
            </Switch>
        </>
    )
}
