import React from 'react';
import { User } from '../../classes/User';

export default class Register extends React.Component {
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
                    <label htmlFor="username" className="col-sm-4 col-form-label" >Username</label>
                    <div className="col">
                        <input type="text" id="username" className="form-control" onChange={(e) => this.onUsernameChange(e)} /> 
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="password" className="col-sm-4 col-form-label" >Password</label>
                    <div className="col">
                        <input type="password" id="password"  className="form-control" onChange={(e) => this.onPasswordChange(e)} /> 
                    </div>
                </div>
                <div className="form-group row">
                    <a href="#" className="col text-muted" onClick={() => this.onRegisterClick()}>Login!</a>
                </div>
                <div className="form-group row col">
                    <button className="form-control" onClick={() => this.RegisterEvent()}>Register</button>
                </div>
            </div>
        );
    }


    onRegisterClick() {
        this.props.ChangeToLogin();
    }

    RegisterEvent() {
        this.props.RegisterEvent(new User(this.state.username, this.state.password, true));
    }


    onUsernameChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }
}