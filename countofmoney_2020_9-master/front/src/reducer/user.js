import {LOGIN, LOGOUT, REGISTER} from "../types";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const initialState = {
    isAuth: false,
    user: {}
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            cookies.set('sess',true, {path: '/'});
            let user = JSON.parse(JSON.stringify(action.payload));
            return({
                isAuth: true,
                ...user
            });
        case LOGOUT:
            cookies.remove('sess',{path: '/'});
            return initialState;

        default:
            return state
    }
};

export default user;
