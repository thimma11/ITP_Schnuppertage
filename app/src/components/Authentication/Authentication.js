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

        this.onChangeLoginState = this.onChangeLoginState.bind(this);
        this.Login = this.Login.bind(this);
        this.Register = this.Register.bind(this);
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
                <Login LoginEvent={this.Login} ChangeToRegister={this.onChangeLoginState} />
            );
        else
            return (
                <Register RegisterEvent={this.Register} ChangeToLogin={this.onChangeLoginState} />
            );
    }

    onChangeLoginState() {
        this.setState({
            login: !this.state.login
        })
    }

    Login(user) {
        console.log(user);
    }

    Register(user) {
        console.log(user);
    }
}