import React, {useState} from 'react'
import '../style/Login-Register.css'
import {Link, Redirect} from "react-router-dom";
import {Nav, Icon, Input} from 'rsuite';
import {useDispatch, useSelector} from "react-redux";
import logoGit from '../img/github3.png'
import logoGoogle from '../img/google.png'
import {Form, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar} from 'rsuite';
import {login} from "../actions/auth";


export default function Login() {
    const {isAuth} = useSelector(store => store.user);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const dispatch = useDispatch();

    const submitLogin = () => {
        if (email && password) {
            login(email, password)(dispatch)
                .catch((e)=> console.log(e))
        }
    }

    if (isAuth) {
        return <Redirect to={'/dashboard'} />
    }

    return (
        <div className="login-g">
            <Form>
                <FormGroup>
                    <ControlLabel>Email</ControlLabel>
                    <Input value={email} onChange={e => setemail(e)} name="email" type="email" />
                    {/*<FormControl name="email" type="email"/>*/}
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Password</ControlLabel>
                    <Input value={password} onChange={e => setpassword(e)} name="email" type="password" />
                    {/*<FormControl name="password" type="password"/>*/}
                </FormGroup>
                <FormGroup>
                    <ButtonToolbar>
                        <Button onClick={() => submitLogin()} appearance="primary">Submit</Button>
                        <Button appearance="default">Cancel</Button>
                    </ButtonToolbar>
                </FormGroup>
            </Form>
            <div className="login-git-google">
                <p className="login-git-google-text">Login with </p>
                <a href="/login"><img className="logo-git" src={logoGit}
    alt="github logo for this connection"/></a>
                <p className="login-git-google-text">or </p>
                <a href="/login"><img className="logo-google" src={logoGoogle}
    alt="google logo for this connection"/></a>
            </div>
            <Link to="/register">
                <Nav.Item icon={<Icon icon="sign-in"/>}>
                    Not register
                </Nav.Item>
            </Link>
        </div>
    );
}
