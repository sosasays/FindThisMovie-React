import React from "react";

function Login(props) {
    return (
    <form method="POST" action='/login'>
        <input className="userFields" name="username" type="text" placeholder="Username"></input>
        <input className="userFields" name="password" type="password" placeholder="Password"></input>
        <input className="formButton" type='submit' value="Login"/>
    </form>
    );
};

export default Login;