import {Navbar, Nav, Dropdown, Icon} from 'rsuite';
import logo from '../../img/logoCrypto3.png';
import {logout} from "../../actions/auth";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {Link, NavLink} from "react-router-dom";
import {openNotification} from "../../actions/notifications";
import './NavBar.css';

const logoStyle = {
    height: "45px",
    margin: "5px 5px 5px 10px",
}

export const NavBarContainer = () => {
    const dispatch = useDispatch();
    const {isAuth} = useSelector(store => store.user);
    const user = useSelector(store => store.user);

    const logoutFunction = () => {
            logout()(dispatch)
            .then(({isAuth}) => setTimeout(() => {
                if (!isAuth) {
                    openNotification({
                        type: 'success',
                        message: 'Successfully logout',
                    });
                } else {
                    openNotification({
                        type: 'error',
                        message: 'Failed to logout',
                    });
                }
            }, 1000));
    }

    return (
        <>
            <Navbar appearance="inverse" className="navcontainer" style={{backgroundColor: "#434443", zIndex : "13", position : "relative"}}>
                <Navbar.Header>
                    <Link to="/"><img src={logo} alt="logo" style={logoStyle}/></Link>
                </Navbar.Header>
                <Navbar.Body>
                    <Nav>
                        <Link to="/dashboard">
                            <Nav.Item icon={<Icon icon="home"/>}>
                                Dashboard
                            </Nav.Item>
                        </Link>
                        {user.role === "Admin" && <Link to="/admin">
                            <Nav.Item icon={<Icon icon="lock"/>}>
                                Admin
                            </Nav.Item>
                        </Link>}
                    </Nav>
                    <Nav pullRight>
                        <div className={"leftNavContainer"}>
                            {isAuth && <div className="username">{user.name}</div>}
                            {isAuth && <Dropdown className="pullRight" placement="bottomEnd" icon={<Icon icon="user"/>} title="Profile"
                                                 style={{backgroundColor: "#434443"}}>
                                <Link to="/users/1">
                                    <Dropdown.Item>
                                        Account
                                    </Dropdown.Item>
                                </Link>
                                <Dropdown.Item onClick={() => logoutFunction()} icon={<Icon icon="off"/>}>
                                    Disconnect
                                </Dropdown.Item>
                            </Dropdown>}
                            {!isAuth && <Link to="/login">
                                    <Nav.Item icon={<Icon icon="sign-in"/>}>
                                        Login
                                    </Nav.Item>
                                </Link>}
                        </div>
                    </Nav>
                </Navbar.Body>
            </Navbar>
        </>
    )
}
