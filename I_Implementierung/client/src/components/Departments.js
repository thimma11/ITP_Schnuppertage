//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
//#endregion

import Department from './Department';
import * as Globals from '../Globals';
//#endregion


class Departments extends React.Component {

    constructor() {
        super();
        this.state = {
            departments: undefined,
            viewID: -1
        };

        this.CloseDepartment = this.CloseDepartment.bind(this);
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
        .then(response => this.setState({ departments: response.data.departments }))
        .catch(error => console.log(error)); */
    }

    /* Show a detailed department */
    ShowDepartment(id) {
        this.setState({ viewID: id });
    }

    /* Close a detailed department */
    CloseDepartment(department) {
        let departments = this.state.departments;
        departments.push(department);
        this.setState({
            departments: departments,
            viewID: -1
        });
    }

    /* Render the departments */
    GetDepartments() {
        if (this.state.departments === undefined)
            return 'Loading departments...';
        else {
            return (
                <ul>
                    {
                    this.state.departments.map(department => {
                        return (
                            <li key={department.id} >
                                { department.name }
                                <button onClick={ () => this.ShowDepartment(department.id) } >Schnuppertage anzeigen</button>
                            </li>
                        );
                    })
                    }
                </ul>
            );
        }
    }


    render() {
        if (this.state.viewID < 0) {
            return (
                <div>
                    <h1>Abteilungen</h1>
                    { this.GetDepartments() }
                </div>
            );
        }
        return <Department id={ this.viewID } />;
    }

}

export default Departments;