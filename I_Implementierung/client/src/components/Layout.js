import React from 'react';
import axios from 'axios';
import Admin from './Admin';
import User from './User';
import * as Globals from '../Globals';


class Layout extends React.Component {

	constructor() {
		super();
		this.state = { key: 0 };
	}


	//#region Startup Routing
	/* Check if admin is logged in */
	componentWillMount() {
		this.GetVisiterRole();
	}

	/* Check if token is saved in cookie */
	GetCookie() {
		let cookie = '; ' + document.cookie;
		let parts = cookie.split('; ' + Globals.COOKIE_KEY + '=');
		if (parts.length === 2) {
			let value = parts.pop().split(';').shift();
			if (value === '')
				return undefined;
			return value;
		}
	}

	/* Get the role of the current visiter */
	GetVisiterRole() {
		let token = this.GetCookie();
		if (token !== undefined) {
			axios.get(Globals.BASE_PATH + 'user?token=' + token)
			.then(response => {
				this.role = 'ADMIN';
				this.setState({ key: Math.random() });
			})
			.catch(error => this.Logout());
		} else {
			this.role = 'USER';
			this.setState({ key: Math.random() });
		}
	}
	//#endregion

	//#region Authentification System
	Login(username, password) {
		let response = axios.post(Globals.BASE_PATH + 'login', {
			username: username,
			password: password
		}).then(response => {
			document.cookie = Globals.COOKIE_KEY + '=' + response.data.token;
			this.role = 'ADMIN';
			this.setState({ key: Math.random() });
			return true;
		}).catch(error => {
			if (!error.response || error.response.status !== 422)
				console.log(error);
			return false;
		});
		return response;
	}

	Logout() {
		document.cookie = Globals.COOKIE_KEY + '=';
		this.role = 'USER';
		this.setState({ key: Math.random() });
	}
	//#endregion


    render(){
		if (this.role) {
			if (this.role === 'ADMIN')
				return <Admin GetCookie={ this.GetCookie.bind(this) } SendLogoutRequest={ this.Logout.bind(this) } />;
			if (this.role === 'USER')
				return <Admin GetCookie={ this.GetCookie.bind(this) } SendLogoutRequest={ this.Logout.bind(this) } />;
			//return <User SendLoginRequest={ this.Login.bind(this) } />;
		} else {
			return 'Loading...';
		}
    }

}

export default Layout;