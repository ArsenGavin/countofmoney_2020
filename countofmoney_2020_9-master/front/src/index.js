import React from 'react'
import './style/Index.css'
import {render} from 'react-dom'
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from "redux";
import {BrowserRouter} from 'react-router-dom';
import thunk from "redux-thunk";
import rootReducer from './reducer';

// import default style
import 'rsuite/dist/styles/rsuite-default.css'; // or 'rsuite/lib/styles/index.less'
import "antd/dist/antd.css";
import App from './App'

const store = createStore(rootReducer, applyMiddleware(thunk));

render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
)
