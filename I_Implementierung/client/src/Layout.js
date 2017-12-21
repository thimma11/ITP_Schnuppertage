import React from 'react';


export default class Layout extends React.Component {

	constructor() {
		super();

		this.state = {
			selectedPage: "departmentsPage"
		}
	}

	
	getComponent() {
        if (this.state.selectedPage === "departmentsPage") {
            return null;
        } else if (this.state.selectedPage === "loginPage") {
            return null;
        }
        return null;
	}

    render(){
		return (
			<div className="container">
				<nav>
					<h2>Schnuppertage</h2>
					<ul>
						<a href="/departments" onClick={ () => this.setState({ selectedPage: "departmentsPage" }) }><li>Abteilungen</li></a>
						<a href="/login" onClick={ () => this.setState({ selectedPage: "loginPage" }) }><li>Admin Login</li></a>
					</ul>
				</nav>
				{ this.getComponent() }
			</div>
		);
    }

}