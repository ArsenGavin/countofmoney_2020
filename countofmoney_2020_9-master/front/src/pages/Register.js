import React, {useState, useEffect} from 'react'
import '../style/Login-Register.css'
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Nav, Icon, Input} from 'rsuite';
import {register} from "../actions/auth";
import logoGit from '../img/github3.png'
import logoGoogle from '../img/google.png'
import {Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button, ButtonToolbar} from 'rsuite';

export default function Register() {
    const {isAuth} = useSelector(store => store.user);
    const [email, setemail] = useState("");
    const [name, setname] = useState("");
    const [password, setpassword] = useState("");
    const dispatch = useDispatch();

    const submitRegister = () => {
        register(email, password, name)(dispatch)
            .then(()=> {
                setemail("");
                setname("");
                setpassword("");
            })
            .catch(() => {
                setemail("");
                setname("");
                setpassword("");
            })
    }

    if (isAuth) {
        return <Redirect to={'/dashboard'} />
    }

    return (
        <div className="login-g">
            <h2 className="register-title">Register</h2>
            <Form>
                <FormGroup>
                    <div className="required">
                        <ControlLabel>Email</ControlLabel>
                        <HelpBlock>Required</HelpBlock>
                    </div>
                    <Input value={email} onChange={e => setemail(e)} name="email" type="email" />
                </FormGroup>
                <FormGroup>
                    <div className="required">
                        <ControlLabel>Name</ControlLabel>
                        <HelpBlock>Required</HelpBlock>
                    </div>
                    <Input value={name} onChange={e => setname(e)} name="name" type="email"/>
                </FormGroup>
                <FormGroup>
                    <div className="required">
                        <ControlLabel>Password</ControlLabel>
                        <HelpBlock>Required</HelpBlock>
                    </div>
                    <Input value={password} onChange={e => setpassword(e)} name="password" type="password"/>
                </FormGroup>
                <FormGroup>
                    <ButtonToolbar>
                        <Button onClick={() => submitRegister()} appearance="primary">Submit</Button>
                        <Button appearance="default">Cancel</Button>
                    </ButtonToolbar>
                </FormGroup>
            </Form>
            <div className="login-git-google">
                <p className="login-git-google-text">Or register with </p>
                <a href="/login"><img className="logo-git" src={logoGit}
                                      alt="github logo for this connection"></img></a>
                <p className="login-git-google-text">or </p>
                <a href="/login"><img className="logo-google" src={logoGoogle}
                                      alt="google logo for this connection"></img></a>
            </div>
            <Link to="/login">
                <Nav.Item icon={<Icon icon="sign-in"/>}>
                    Login
                </Nav.Item>
            </Link>
        </div>
    );
}
