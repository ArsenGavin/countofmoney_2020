import {LOGIN, LOGOUT} from "../types";
import {openNotification} from "./notifications";

export const auth = () => async dispatch => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/`, {
        method: 'GET',
        credentials: "include",
    })
        .then(async (res) => {
            if (res.status === 200) return res.json();
            throw await res.json();
        })
        .then((res) => {
            if (res.isAuth) {
                dispatch({
                    type: LOGIN,
                    payload: res.user
                });
                return res;
            }
            dispatch({
                type: LOGOUT,
            });
            return res;

        })
        .catch((err) => {
            throw err;
        })
};

export const login = (email, password) => async dispatch => {
    if (!email.length || !password.length) {
        openNotification({
            type: 'error',
            message: 'all fields are mandatory'
        });
        throw {};
    }
    return fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: 'POST',
        credentials: "include",
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(async (res) => {
            if (res.status === 200) {
                openNotification({
                    type: 'success',
                    message: 'Authentication succeed',
                });
                return res.json()
            };
            throw await res.json();
        })
        .then((res) => {
            return dispatch({
                type: LOGIN,
                payload: res.data
            })
        })
        .catch((err) => {
            openNotification({
                type: 'error',
                message: err.message
            });
            throw err;
        })
}

export const register = (email, password, name) => async dispatch => {
    if (!email.length || !password.length || !name.length) {
        openNotification({
            type: 'error',
            message: 'all fields are mandatory'
        });
        throw {};
    }

    if (password.length < 6) {
        openNotification({
            type: 'error',
            message: 'password must be at least 6 characters '
        });
        throw Error();
    }
    if (!(/\S+@\S+\.\S+/.test(email))) {
        openNotification({
            type: 'error',
            message: 'Email badly formated'
        });
        throw Error();
    }

    return fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
        method: 'POST',
        credentials: "include",
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            email,
            password,
            name
        })
    })
        .then(async (res) => {
            if (res.status === 201) {
                openNotification({
                    type: 'success',
                    message: 'Registration succesful',
                });
                return res.json()
            };
            throw await res.json();
        })
        .then(() => login(email, password)(dispatch))
        .then(() => openNotification({
            type: 'success',
            message: 'Account successfully created'
        }))
        .catch((err) => {
            openNotification({
                type: 'error',
                message: err.message
            });
            throw err;
        });
};

export const logout = () => dispatch => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/logout`, {
        method: 'GET',
        credentials: "include",
    })
        .then(async (res) => {
            if (res.status === 200) return res.json();
            throw await res.json();
        })
        .then((res) => {
            dispatch({
                type: LOGOUT,
            });
            return res

        })
        .catch((err) => {
            throw err;
        })
};
