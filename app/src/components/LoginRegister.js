import React from 'react';
import { User } from '../classes/User';
import '../style/LoginRegister.css'

class LoginRegister extends React.Component{
    constructor({onClickHandler, hidden}){
        super({onClickHandler, hidden});

        this.state = {
            login: true,
            username: "",
            password: ""
        }
    }

    render(){
        return(
            <div className="Form" style={{"visibility": this.props.hidden ? "hidden" : "visible"}}>
                <div className="FormHeading">
                    {this.state.login ? "Login" : "Register"}
                </div>
                <div className="FormBody">
                    <div className="FormElement">
                        <label htmlFor="userName" className="label">Username</label>
                        <input id="userName" onChange={(e) => this.onUsernameChange(e)} className="FormInput" ref={(node) => {if(node !== null) node.focus();}}></input>
                    </div>
                    <div className="FormElement">
                        <label htmlFor="password"  className="label">Password</label>
                        <input type="password" id="password" onChange={(e) => this.onPasswordChange(e)} className="FormInput"></input>
                    </div>
                    <div className="FormElement">
                        <a href="#" className="FormLink" onClick={this.onLinkClick}>
                            {this.state.login ? "Register a new user!" : "Login!"}
                        </a>
                    </div>
                    <div className="FormElement">
                        <button className="FormButton" onClick={() => this.state.login ? this.Login() : this.Register()}>{this.state.login ? "Login" : "Register"}</button>
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

    onLinkClick(){
        this.setState({
           login: !this.state.login 
        });
    }

    Login() {
        console.log(this.state.username + " : " + this.state.password);
        //Nur Test
        var user;
        if(this.state.username == "admin")
            user = new User(this.state.username, this.state.password, true);
        else
            user = new User(this.state.username, this.state.password, false);
        this.props.onClickHandler(user);
    }
    
    Register(){
        console.log(this.state.username + " : " + this.state.password);
    }
    
}


export default LoginRegister;