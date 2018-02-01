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
            editID: -1,
            contraction: '',
            contractionError: false,
            name: '',
            nameError: false
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
    EditDepartment(id) {
        this.state.departments.map(department => {
            if (department.id === id) {
                this.setState({
                    editID: id,
                    contraction: department.contraction,
                    name: department.name
                });
            }
            return null;
        })
    }

    SaveDepartment() {

    }

    /* Close a specific department view */
    CloseDepartment() {
        this.handleNameLeave();
        this.handleContractionLeave();

        if (this.state.nameError || this.state.contractionError) {
        } else {
            this.SaveDepartment();
            this.setState({ editID: -1 });
        }
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

    handleContractionChange(event) {
        this.setState({
            contraction: event.target.value,
            contractionError: false
        });
    }

    handleContractionLeave() {
        if (this.state.contraction === '') {
            this.setState({
                contractionError: true
            });
        }
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value,
            nameError: false
        });
    }

    handleNameLeave() {
        if (this.state.name === '') {
            this.setState({
                nameError: true
            });
        }
    }

    GetButtons(id) {
        if (this.state.editID === -1) {
            return (
                <td>                   
                    <button className="btn btn-primary btn-sm button-space" onClick={ () => this.EditDepartment(id) } >Bearbeiten</button>
                    <button className="btn btn-danger btn-sm" onClick={ () => this.DeleteDepartment(id) } >Löschen</button>
                </td>
            );
        } else {
            return <td><span className="label-information">Gesperrt</span></td>;
        }
    }

    /* Get departments if not undefined */
    GetDepartments() {
        if (this.state.departments !== undefined) {
            return (
                <div>
                    <div className="well">
                        <div className="table-responsive">
                            <table class="table departments-table">
                                <thead>
                                    <tr>
                                        <th>Abteilungs ID</th>
                                        <th>Abkürzung</th>
                                        <th>Name</th>
                                        <th>Aktionen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                this.state.departments.map((department, index) => {
                                    if (department.id === this.state.editID) {
                                        return (
                                            <tr key={index} className='edit-row'>
                                                <td>{ department.id }</td>
                                                <td><input type="text" className={ (this.state.contractionError) ? 'form-control form-error' : 'form-control' } placeholder="IT" value={ this.state.contraction } onChange={ (event) => this.handleContractionChange(event) } onBlur={ () => this.handleContractionLeave() }/></td>
                                                <td><input type="text" className={ (this.state.nameError) ? 'form-control form-error' : 'form-control' } placeholder="Hochbau" value={ this.state.name } onChange={ (event) => this.handleNameChange(event) } onBlur={ () => this.handleNameLeave() }/></td>
                                                <td><button className="btn btn-success btn-sm" onClick={ () => this.CloseDepartment(department.id) } >Speichern</button></td>
                                            </tr>
                                        );
                                    } else {
                                        return (
                                            <tr key={index}>
                                                <td>{ department.id }</td>
                                                <td>{ department.contraction }</td>
                                                <td>{ department.name }</td>
                                                { this.GetButtons(department.id) }
                                            </tr>
                                        );
                                    }
                                })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr/>
                    <DepartmentCreator GetCookie={ this.props.GetCookie } Logout={ this.props.Logout } CloseDepartmentCreator={ this.CloseDepartmentCreator } />
                </div>
            );
        }
    }


    render() {
        if (this.state.departmentID < 0) {
            return (
                <div className="container departments">
                    <h4 className="form-header">Abteilungen</h4>
                    { this.GetDepartments() }
                </div>
            );
        }
        return <Department id={this.state.departmentID} GetCookie={ this.props.GetCookie } Logout={ this.props.Logout } CloseDepartment={ this.CloseDepartment } />;
        
    }

}

export default Departments;