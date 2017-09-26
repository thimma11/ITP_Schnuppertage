import React from 'react';
import '../style/LoginRegister.css'

class LoginRegister extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            login: true,
            username: "",
            password: ""
        }
    }

    render(){
        return(
            <div className="Form">
                <div className="FormHeading">
                    {this.state.login == true ? "Login" : "Register"}
                </div>
                <div className="FormBody">
                    <div className="FormElement">
                        <label htmlFor="userName" className="label">Username</label>
                        <input id="userName" onChange={(e) => this.onUsernameChange(e)} className="FormInput"></input>
                    </div>
                    <div className="FormElement">
                        <label htmlFor="password"  className="label">Password</label>
                        <input type="password" id="password" onChange={(e) => this.onPasswordChange(e)} className="FormInput"></input>
                    </div>
                    <div className="FormElement">
                        <a href="#" className="FormLink" onClick={() => this.state.login == true ? this.onRegisterLinkClick(): this.onLoginLinkClick()}>
                            {this.state.login == true ? "Register a new user!" : "Login!"}
                        </a>
                    </div>
                    <div className="FormElement">
                        <button className="FormButton" onClick={() => this.state.login == true ? this.Login() : this.Register()}>{this.state.login == true ? "Login" : "Register"}</button>
                    </div>
                </div>
            </div>
        )
    }

    onPasswordChange(e){
        this.setState({
            password: e.target.value
        });
    }

    onUsernameChange(e){
        this.setState({
            username: e.target.value
        });
    }

    onRegisterLinkClick(){
        this.setState({
           login: false 
        });
    }

    onLoginLinkClick(){
        this.setState({
            login: true 
         });
    }

    Login() {
        console.log(this.state.username + " : " + this.state.password);
    }
    
    Register(){
        console.log(this.state.username + " : " + this.state.password);
    }
    
}


export default LoginRegister;