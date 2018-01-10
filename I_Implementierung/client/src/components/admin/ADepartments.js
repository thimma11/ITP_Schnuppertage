//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
//#endregion

import Department from './ADepartment';
import DepartmentCreator from './ADepartmentCreator';
import * as Globals from '../../Globals';
//#endregion


class Departments extends React.Component {

    constructor() {
        super();
        this.state = {
            departments: undefined,
            departmentID: -1,
            createDepartment: false,
        };

        this.CloseDepartment = this.CloseDepartment.bind(this);
        this.CloseDepartmentCreator = this.CloseDepartmentCreator.bind(this);
    }


    /* Get all display information */
    componentDidMount() {
        this.InitDepartments();
    }

    /* Get all departments */
    InitDepartments() {
        //#region Delete this later...
        this.setState({
            departments: [
                { id: 0, name: "Hochbau"},
                { id: 1, name: "Tiefbau"},
                { id: 3, name: "Informationstechnologie"},
                { id: 2, name: "Holzbau"}
            ]
        });
        //#endregion
        
        /* Server Request
        axios.get(Globals.BASE_PATH + 'departments')
        .then(response => this.setState({ departments: response.data }))
        .catch(error => console.log(error));
        */
    }

    /* Handle a specific department request */
    ShowDepartment(id) {
        this.setState({ departmentID: id });
    }

    /* Close a specific department view */
    CloseDepartment() {
        this.setState({ departmentID: -1 });
    }

    /* Set createDepartment to 'true' */
    OpenDepartmentCreator() {
        this.setState({ createDepartment: true });
    }

    /* Set createDepartment to 'false' */
    CloseDepartmentCreator(department) {
        if (department !== undefined) {
            let departments = this.state.departments;
            departments.push(department);
            this.setState({
                departments: departments,
                createDepartment: false
            });
        } else
            this.setState({ createDepartment: false });
    }

    /* Returns the Create Department Button or shows the form */
    GetDepartmentCreator() {
        if (this.state.createDepartment)
            return <DepartmentCreator GetCookie={ this.props.GetCookie } Logout={ this.props.Logout } CloseDepartmentCreator={ this.CloseDepartmentCreator } />;
        else
            return <button onClick={ () => this.OpenDepartmentCreator() } >Abteilung erstellen</button>;
    }

    /* Get departments if not undefined */
    GetDepartments() {
        if (this.state.departments !== undefined) {
            return (
                <div>
                    <ul>
                        {
                        this.state.departments.map((department, index) => {
                            return (
                                <li key={index} >
                                    { department.name }
                                    <button onClick={ () => this.ShowDepartment(department.id) } >Abteilung verwalten</button>
                                </li>
                            );
                        })
                        }
                    </ul>
                    { this.GetDepartmentCreator() }
                </div>
            );
        } else
            return 'Loading departments...';
    }


    render() {
        if (this.state.departmentID < 0) {
            return (
                <div>
                    <h1>Abteilungen</h1>
                    { this.GetDepartments() }
                </div>
            );
        }
        return <Department id={this.departmentID} GetCookie={ this.props.GetCookie } Logout={ this.props.Logout } CloseDepartment={ this.CloseDepartment } />;
        
    }

}

export default Departments;