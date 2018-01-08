import React from 'react';
import axios from 'axios';
import Department from './Department';
import * as Globals from '../Globals';


class Departments extends React.Component {

    constructor() {
        super();
        this.IDs = [];
        this.state = {
            names: [],
            key: 0
        };
        this.departmentIndex = undefined;

        this.CloseDepartment.bind(this);
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
        let names = [];
        departments.map(department => {
            this.IDs.push(department.id);
            names.push(department.name);
            return null;
        });
        this.setState({ names: names });
        //#endregion
        
        //#region Server Request
        /*
        axios.get(Globals.BASE_PATH + 'departments')
        .then(response => {
            let departments = response.data;
            let names = [];
            departments.map(department => {
                this.IDs.push(department.id);
                names.push(department.name);
                return null;
            });
            this.setState({ names: names });
        }).catch(error => console.log(error));
        */
        //#endregion
    }

    /* Handle a specific department request */
    ShowDepartment(index) {
        this.departmentIndex = index;
        this.setState({ key: Math.random() });
    }

    /* Show all departments on request */
    CloseDepartment() {
        this.departmentIndex = undefined;
        this.setState({ key: Math.random() });
    }


    render() {
        if (this.departmentIndex !== undefined)
            return <Department id={ this.IDs[this.departmentIndex] } name={ this.state.names[this.departmentIndex] } />;
        return (
            <div>
                <h2>Abteilungen</h2>
                <ul>
                {
                    this.state.names.map((name, index) => {
                        return (
                            <li key={index} >
                                { name }
                                <button onClick={ () => this.ShowDepartment(index) } >Schnuppertage anzeigen</button>
                            </li>
                        );
                    })
                }
                </ul>
            </div>
        );
    }

}

export default Departments;