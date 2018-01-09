//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
//#endregion

import * as Globals from '../Globals';
//#endregion


class Registration extends React.Component {

	constructor(props) {
		super(props);
		this.eventID = this.props.eventID;
		this.state = {
			firstname: '',
			lastname: '',
			phone: '',
			email: '',
			schoolLocation: '',
			schoolType: '',
			errorMessage: ''
		}
	}


	ChangeFirstname(event) {
		this.setState({
			firstname: event.target.value,
			errorMessage: ''
		});
	}

	CheckFirstname() {
		if (this.state.firstname === '') {
			this.setState({ errorMessage: 'Sie müssen einen Vornamen angeben.' });
			return false;
		}
		return true;
	}

	ChangeLastname(event) {
		this.setState({
			lastname: event.target.value,
			errorMessage: ''
		});
	}

	CheckLastname() {
		if (this.state.lastname === '') {
			this.setState({ errorMessage: 'Sie müssen einen Nachnamen angeben.' });
			return false;
		}
		return true;
	}

	ChangePhone(event) {
		this.setState({
			phone: event.target.value,
			errorMessage: ''
		});
	}

	ChangeEmail(event) {
		this.setState({
			email: event.target.value,
			errorMessage: ''
		});
	}

	CheckPhoneAndEmail() {
		if (this.state.phone === '' && this.state.email === '') {
			this.setState({ errorMessage: 'Sie müssen einen Telefonnummer oder eine E-Mail angeben.' });
			return false;
		}
		return true;
	}

	ChangeSchoolLocation(event) {
		this.setState({
			schoolLocation: event.target.value,
			errorMessage: ''
		});
	}

	CheckSchoolLocation() {
		if (this.state.schoolLocation === '') {
			this.setState({ errorMessage: 'Sie müssen den Schulstandort angeben.' });
			return false;
		}
		return true;
	}

	ChangeSchoolType(event) {
		this.setState({
			schoolType: event.target.value,
			errorMessage: ''
		});
	}

	CheckSchoolType() {
		if (this.state.schoolType === '') {
			this.setState({ errorMessage: 'Sie müssen den Schultyp angeben.' });
			return false;
		}
		return true;
	}

	RegisterForEvent() {
		if (this.CheckFirstname() && this.CheckLastname() && this.CheckPhoneAndEmail() && this.CheckSchoolLocation() && this.CheckSchoolType()) {
			/* Server Request
			axios.post(Globals.BASE_PATH + 'event/' + this.eventID + '/student', {
				firstname: this.state.firstname,
				lastname: this.state.lastname,
				phone: this.state.phone,
				email: this.state.email,
				schoolLocation: this.state.schoolLocation,
				schoolType: this.state.schoolType
			}).then(response => this.props.CloseRegister())
			.catch(error => console.log(error);)
			*/
			this.props.CloseRegister();
		}
	}

	GetErrorMessage() {
		if (this.state.errorMessage !== '') {
			return <p>{ this.state.errorMessage }</p>;
		}
	}


    render(){
		return (
			<div>
				<h4>Teilnahmeformular</h4>
				<div>
					<label>Vorname:</label>
					<input value={ this.state.firstname } onChange={ (e) => this.ChangeFirstname(e) } />
				</div>
				<div>
					<label>Nachname:</label>
					<input value={ this.state.lastname } onChange={ (e) => this.ChangeLastname(e) } />
				</div>
				<div>
					<label>Telefonnummer:</label>
					<input value={ this.state.phone } onChange={ (e) => this.ChangePhone(e) } />
				</div>
				<div>
					<label>E-Mail:</label>
					<input value={ this.state.email } onChange={ (e) => this.ChangeEmail(e) } />
				</div>
				<div>
					<label>Schulstandort:</label>
					<input value={ this.state.schoolLocation } onChange={ (e) => this.ChangeSchoolLocation(e) } />
				</div>
				<div>
					<label>Schultyp:</label>
					<input value={ this.state.schoolType } onChange={ (e) => this.ChangeSchoolType(e) } />
				</div>
				{ this.GetErrorMessage() }
				<button onClick={ () => this.RegisterForEvent() } >Eintragen</button>
			</div>
		);
    }

}

export default Registration;