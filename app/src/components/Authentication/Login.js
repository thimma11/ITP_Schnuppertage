import React from 'react';


export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        }
    }

    render() {
        return (
            <div className="form">
                <div className="form-group row">
                    <label htmlFor="username" className="col" >Username</label>
                    <input type="text" id="username" className="col" />
                </div>
                <div className="form-group row">
                    <label htmlFor="password" className="col" >Password</label>
                    <input type="password" id="password" className="col" onChange={(e) => this.PasswordChange(e)}/>
                </div>
                <div className="form-group row">
                    <button onClick={() => this.LoginEvent()}>Login</button>
                </div>
            </div>
        );
    }

    PasswordChange(e) {

    }
    LoginEvent() {
        this.props.LoginEvent()
    }
}