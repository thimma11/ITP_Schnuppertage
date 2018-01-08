import React from 'react';
import DepartmentsOverview from './DepartmentsOverview';
import DepartmentFullView from './DepartmentFullView';
import Login from './Login';


export default class Layout extends React.Component {

	constructor() {
		super();

		this.ChangeDepartmentID = this.ChangeDepartmentID.bind(this);
		this.ChangeSelectedPage = this.ChangeSelectedPage.bind(this);
		
		this.state = {
			selectedPage: "departmentsPage",
			viewDepartmentID: -1
		}
	}

	ChangeDepartmentID(departmentID) {
		console.log(departmentID);
		this.setState({
			viewDepartmentID: departmentID
		});
	}

	ChangeSelectedPage(selectedPage) {
		this.setState({
			selectedPage: selectedPage,
			viewDepartmentID: -1
		});
	}
	
	GetComponent() {
        if (this.state.selectedPage === "departmentsPage") {
			if (this.state.viewDepartmentID > -1) {
				return <DepartmentFullView />;
			}
            return <DepartmentsOverview ChangeDepartmentID={ this.ChangeDepartmentID } />;
        } else if (this.state.selectedPage === "loginPage") {
            return <Login />;
        }
        return null;
	}

    render(){
		return (
			<div className="container">
				<nav>
					<h2>Schnuppertage</h2>
					<ul>
						<a href="#" onClick={ () => this.ChangeSelectedPage("departmentsPage") }><li>Abteilungen</li></a>
						<a href="#" onClick={ () => this.ChangeSelectedPage("loginPage") }><li>Admin Login</li></a>
					</ul>
				</nav>
				{ this.GetComponent() }
			</div>
		);
    }

}