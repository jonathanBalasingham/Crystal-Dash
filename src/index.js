import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore } from 'redux';
import store from './store';
import {Provider, useSelector} from 'react-redux';
import {LoginPage} from './Login';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {getAccessToken} from "./features/auth/authSlice";

function Index({}) {
    const token = useSelector(getAccessToken)

    if(!token) {
        console.log('Token is ' + token)
        return <LoginPage  setToken={null}/>
    }

    return (
        <div className="wrapper">
            <BrowserRouter>
                <Switch>
                    <Route path="/">
                        <App />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <Index/>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();