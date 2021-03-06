//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
//#endregion

import Admin from './Admin';
import User from './User';
import * as Globals from '../Globals';
//#endregion


class Layout extends React.Component {

	constructor() {
		super();
		this.state = { key: 0 };

		this.GetCookie = this.GetCookie.bind(this);
		this.Login = this.Login.bind(this);
		this.Logout = this.Logout.bind(this);
	}


	/* Check if admin is logged in */
	componentWillMount() {
		this.GetVisiterRole();
	}

	/* Return the value of the token saved in the cookies */
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
		let authToken = this.GetCookie();
		if (authToken !== undefined) {
			axios.get(Globals.BASE_PATH + 'departments?authToken=' + authToken)
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

	//#region Authentification System
	Login(username, password) {
		let response = axios.post(Globals.LOGIN + 'authenticate', {
			username: username,
			password: password
		}).then(response => {
			document.cookie = Globals.COOKIE_KEY + '=' + response.data.token;
			this.role = 'ADMIN';
			this.setState({ key: Math.random() });
			return true;
		}).catch(error => { console.log(error); return false; });
		return response;
	}

	Logout() {
		console.log("Hi");
		document.cookie = Globals.COOKIE_KEY + '=';
		this.role = 'USER';
		this.setState({ key: Math.random() });
	}
	//#endregion


    render(){
		if (this.role) {
			if (this.role === 'ADMIN')
				return <Admin GetCookie={ this.GetCookie } Logout={ this.Logout } />;
			if (this.role === 'USER')
				return <User Login={ this.Login } />;
		} else {
			return 'Loading...';
		}
    }

}

export default Layout;