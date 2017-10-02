import React from 'react';
import { User } from '../../classes/User';


export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }
    }

    render() {
        return (
            <div className="form">
                <div className="form-group row">
                    <label htmlFor="username" className="col" >Username</label>
                    <input type="text" id="username" className="col" onChange={(e) => this.onUsernameChange(e)} /> 
                </div>
                <div className="form-group row">
                    <label htmlFor="password" className="col" >Password</label>
                    <input type="password" id="password" className="col" onChange={(e) => this.onPasswordChange(e)} /> 
                </div>
                <div className="form-group row">
                    <a href="#" className="col" onClick={() => this.onRegisterClick()}>Register now!</a>
                </div>
                <div className="form-group row">
                    <button onClick={() => this.LoginEvent()}>Login</button>
                </div>
            </div>
        );
    }

    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    onUsernameChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    onRegisterClick() {
        this.props.ChangeToRegister();
    }

    LoginEvent() {
        this.props.LoginEvent(new User(this.state.username, this.state.password, true));
    }
}