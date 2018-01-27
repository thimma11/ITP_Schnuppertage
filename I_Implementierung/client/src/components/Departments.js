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
        axios.get(Globals.BASE_PATH + 'departments')
        .then(response => this.setState({ departments: response.data }))
        .catch(error => console.log(error));
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
                                <p>{ department.contraction } - { department.name }</p>
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
        return <Department id={ this.state.viewID } />;
    }

}

export default Departments;