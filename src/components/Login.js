import React from 'react';
import {GoogleOutlined,FacebookOutlined} from '@ant-design/icons';
import "firebase/app";
import {auth} from '../firebase';
import firebase from 'firebase/app';

const Login = () => {
    return (
    <div id= "login-page">
        <center><h1>CMS Teams</h1></center>
       <div id = "login-card">
        <h2>Login</h2>
        <div
        className = "login-button google"
onClick ={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
>
<GoogleOutlined/> Sign In with Google
</div>
</div>
</div>
);
}
export default Login;