import React from "react";

function Signup(props) {
    return (
    <form method='POST' action='/signup'>
        <input className="userFields" name="username" type="text" placeholder="Username"></input>
        <input className="userFields" name="password" type="password" placeholder="Password"></input>
        <input className="formButton" type="submit" value="Create User"></input>
    </form>
    );
};

export default Signup;