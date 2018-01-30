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
            departmentID: -1
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
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
            this.props.Logout();
        
        axios.get(Globals.BASE_PATH + 'departments')
        .then(response => this.setState({ departments: response.data }))
        .catch(error => console.log(error));
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

    DeleteDepartment(id) {
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
            this.props.Logout();

        axios.delete(Globals.BASE_PATH + 'departments/' + id + '?authToken=' + authToken)
        .then(response => this.InitDepartments())
        .catch(error => {
            if (error.response.status === 401)
                this.Logout();
            else
                console.log(error)
        });
    }

    /* Set createDepartment to 'false' */
    CloseDepartmentCreator(department) {
        if (department !== undefined) {
            let departments = this.state.departments;
            departments.push(department);
            this.setState({
                departments: departments
            });
        }
    }

    /* Get departments if not undefined */
    GetDepartments() {
        if (this.state.departments !== undefined) {
            return (
                <div>
                    <div className="well">
                        {
                        this.state.departments.map((department, index) => {
                            return (
                                <button key={index} >
                                    <p>{ department.contraction } - { department.name }</p>
                                    <button className="btn btn-primary" onClick={ () => this.ShowDepartment(department.id) } >Abteilung verwalten</button>
                                    <button className="btn btn-info" onClick={ () => this.DeleteDepartment(department.id) } >Löschen</button>
                                </button>
                            );
                        })
                        }
                    </div>
                    <div className="section-spacer"/>
                    <DepartmentCreator GetCookie={ this.props.GetCookie } Logout={ this.props.Logout } CloseDepartmentCreator={ this.CloseDepartmentCreator } />
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
        return <Department id={this.state.departmentID} GetCookie={ this.props.GetCookie } Logout={ this.props.Logout } CloseDepartment={ this.CloseDepartment } />;
        
    }

}

export default Departments;