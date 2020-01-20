import React from 'react';
import './Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null
        };
    }

    handleLogin(event) {
        event.preventDefault()
        let username;
        let password;

        username = event.target.usernameId.value;
        password = event.target.passwordId.value;

        fetch('http://localhost:4000/user/login', {
            method: 'post',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {
            response.json().then(json => {
                const {token} = json;
                localStorage.setItem('token', token);
                if (token !== undefined) {
                    console.log("Logged In")
                } else {
                    console.log("Not Logged in")
                }
            })
        });
    }

    render() {
        return (
            <div>
                <p>Login</p>
                <form className="loginForm" onSubmit={e => this.handleLogin(e)}>
                    Username: <input type="text" name="username" id="usernameId"/>
                    Password: <input type="password" name="password" id="passwordId"/>
                    <input type="submit" value="Login" id="loginId"/>
                </form>
            </div>
        );
    }
}

export default Login;
