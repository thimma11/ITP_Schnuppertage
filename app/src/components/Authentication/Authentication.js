import React from 'react';
import Login from './Login';
import Register from './Register';

import '../../style/Authentication.css';


export default class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true
        };
    }

    render() {
        return (
            <div className="container">
                {this.RenderLoginRegister()}
            </div>
        );
    }

    RenderLoginRegister() {
        if(this.state.login)
            return (
                <Login LoginEvent={this.Login} />
            );
        else
            return (
                <Register RegisterEvent={this.Register} />
            );
    }

    Login(user) {

    }

    Register(user) {

    }
}