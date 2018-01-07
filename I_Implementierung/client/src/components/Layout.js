import React from 'react';
import axios from 'axios';
import * as Globals from '../Globals';


class Layout extends React.Component {

	constructor() {
		super();
		this.state = { key: 0 }

		this.Login.bind(this);
		this.Logout.bind(this);
	}


	//#region Startup Routing
	/* Check if admin is logged in */
	componentWillMount() {
		this.GetVisiterRole();
	}

	/* Check if token is saved in cookie */
	IsTokenAvailable() {
		return !(
			document.cookie.split('=')[1] === ''
			|| document.cookie === ''
		);
	}

	/* Get the role of the current visiter */
	GetVisiterRole() {
		if (this.IsTokenAvailable()) {
			let token = document.cookie.split('=')[1];
			axios.get(Globals.BASE_PATH + 'user?token=' + token)
			.then(response => {
				this.page = 'ADMIN';
				this.setState({ key: Math.random() });
			})
			.catch(error => this.Logout());
		} else {
			this.page = 'USER';
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
			document.cookie = Globals.COOKIE_KEY + "=" + response.data.token;
			return true;
		}).catch(error => { return false; });
		return response;
	}

	Logout() {
		document.cookie = Globals.COOKIE_KEY + '=';
		this.page = 'USER';
		this.setState({ key: Math.random() });
	}
	//#endregion


    render(){
		if (this.page) {
			if (this.page === 'ADMIN')
				return 'Admin';
			if (this.page === 'USER')
				return 'User';
		} else {
			return 'Loading...';
		}
    }

}

export default Layout;