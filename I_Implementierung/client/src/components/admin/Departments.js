import React from 'react';
import axios from 'axios';
import Department from './Department';
import DepartmentCreator from './DepartmentCreator';
import * as Globals from '../../Globals';


class Departments extends React.Component {

    constructor() {
        super();
        this.departmentID = undefined;
        this.state = {
            departments: [],
            createDepartment: false,
            key: 0
        };
    }


    /* Get all display information on startup */
    componentDidMount() {
        this.InitDepartments();
    }

    /* Get all departments */
    InitDepartments() {
        //#region Test Data
        let departments = [
            { id: 0, name: "Hochbau"},
            { id: 1, name: "Tiefbau"},
            { id: 3, name: "Informationstechnologie"},
            { id: 2, name: "Holzbau"}
        ];
        this.setState({ departments: departments });
        //#endregion
        
        //#region Server Request
        /*
        axios.get(Globals.BASE_PATH + 'departments', {
            headers: {
                Authorization: this.props.GetCookie()
            }
        }).then(response => this.setState({ departments: response.data }))
        .catch(error => this.props.SendLogoutRequest());
        */
        //#endregion
    }

    /* Handle a specific department request */
    ShowDepartment(id) {
        this.departmentID = id;
        this.setState({ key: Math.random() });
    }

    /* Show all departments on request */
    CloseDepartment() {
        this.departmentID = undefined;
        this.setState({ key: Math.random() });
    }

    /* Set createDepartment to 'true' */
    OpenDepartmentCreator() {
        this.setState({ createDepartment: true });
    }

    /* Set createDepartment to 'false' */
    CloseDepartmentCreator(refresh) {
        this.setState({ createDepartment: false });
        if (refresh)
            this.InitDepartments();
    }

    /* Returns the Create Department Button or shows the form */
    GetDepartmentCreator() {
        if (this.state.createDepartment)
            return <DepartmentCreator CloseDepartmentCreator={ this.CloseDepartmentCreator.bind(this) } />;
        else
            return <button onClick={ () => this.OpenDepartmentCreator() } >Abteilung erstellen</button>;
    }


    render() {
        if (this.departmentID !== undefined)
            return <Department id={this.departmentID} />;
        return (
            <div>
                <h2>Abteilungen</h2>
                <ul>
                {
                    this.state.departments.map((department, index) => {
                        return (
                            <li key={index} >
                                { department.name }
                                <button onClick={ () => this.ShowDepartment(department.id) } >Schnuppertage verwalten</button>
                            </li>
                        );
                    })
                }
                </ul>
                { this.GetDepartmentCreator() }
            </div>
        );
    }

}

export default Departments;