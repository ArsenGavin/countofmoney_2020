import React, {useState} from "react";
import { Form, FormGroup, ControlLabel, FormControl, Button, ButtonToolbar, HelpBlock, Alert } from 'rsuite';
import '../style/ProfilUser.css'
import {useDispatch, useSelector} from "react-redux";
// import { useParams } from "react-router-dom";

const fakeData = {
    email : "toto@hotmail.fr",
    password : "totomdp",
    userName: "Arsen"
}

export default function UserProfile() {
    const {isAuth} = useSelector(store => store.user);
    const user = useSelector(store => store.user);

    const [email, setemail] = useState(user.email);
    const [name, setname] = useState(user.name);
    const [password, setpassword] = useState(user.password);

    
    const editProfil = () => {
        setemail();
        setname();
        setpassword();
    }

    return (
        <div className="user-profil">
            <Form layout="vertical" >
            <FormGroup>
                <ControlLabel>User name</ControlLabel>
                <FormControl name="name" onChange={e => setname(e)} placeholder={name} />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl name="password" onChange={e => setpassword(e)} placeholder='New Password'/>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl name="email" onChange={e => setemail(e)} type="email"  />
                <HelpBlock>Required</HelpBlock>
            </FormGroup>
            <FormGroup>
                <ButtonToolbar>
                <Button appearance="primary" onClick={editProfil}>Edit</Button>
                {/* () => Alert.success('The profile has been edited')} */}
                </ButtonToolbar>
            </FormGroup>
            </Form>
            <span className="overlay-profil"></span>
        </div>
        );
    
}