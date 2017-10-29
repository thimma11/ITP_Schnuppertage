import React from 'react';
import { User } from '../../classes/User';


export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }

        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onRegisterClick = this.onRegisterClick.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.LoginEvent = this.LoginEvent.bind(this);
    }

    render() {
        return (
            <div className="form">
                <div className="form-group row">
                    <label htmlFor="username" className="col-sm-4 col-form-label" >Username</label>
                    <div className="col">
                        <input type="text" id="username" className="form-control" onChange={this.onUsernameChange} /> 
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="password" className="col-sm-4 col-form-label" >Password</label>
                    <div className="col">
                        <input type="password" id="password"  className="form-control" onChange={this.onPasswordChange} /> 
                    </div>
                </div>
                <div className="form-group row">
                    <a href="#" className="col text-muted" onClick={this.onRegisterClick}>Register now!</a>
                </div>
                <div className="form-group row col">
                    <button  className="form-control" onClick={this.LoginEvent}>Login</button>
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