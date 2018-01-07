import React from 'react';


export default class Registration extends React.Component {

	constructor() {
		super();

		this.state = {
			email: "",
			firstName: "",
			lastName: ""
		}
	}

	saveAndContinue() {
		
	}

	handleClick() {
		console.log(this.state.firstName);
		console.log(this.state.lastName);
	}

    render(){
		return (
			<div>
				<div>
				<input
					placeholder="Vorname"
					onChange = {(event,newValue) => this.setState({firstName:newValue})}
					/>
				<br/>
				<input
					placeholder="Nachname"
					onChange = {(event,newValue) => this.setState({lastName:newValue})}
					/>
				<br/>
					<input
					type="email"
					placeholder="Email"
					onChange = {(event,newValue) => this.setState({email:newValue})}
					/>
					<br/>
					<button label="Submit" onClick={(event) => this.handleClick(event)}>
						REGISTER
					</button>
				</div>
			</div>
		);
    }

}