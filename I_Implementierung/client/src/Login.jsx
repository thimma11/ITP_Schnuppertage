import React from 'react';


export default class Login extends React.Component {

	constructor() {
		super();
        
        this.password = "";
		this.state = {
			username: ""
		}
	}

	OnUsernameChange(e) {
		this.setState({
            username: e.target.value
        });
    }
    
    OnPasswordChange(e) {
		this.setState({
            password: e.target.value
        });
    }
    
    Login() {
        console.log("Login Request...");
    }

    render(){
		return (
			<div>
                <h2>Login</h2>
                <div><input type="text" value={ this.state.username } placeholder="Benutzername" onChange={ (e) => this.OnUsernameChange(e) } /></div>
                <div><input type="password" value={ this.password } placeholder="Passwort" onChange={ (e) => this.OnPasswordChange(e) } /></div>
                <div><button onClick={ () => this.Login() } >Anmelden</button></div>
            </div>
		);
    }

}