//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
//#endregion

import * as Globals from '../../Globals';
//#endregion


class DepartmentCreator extends React.Component {

    constructor() {
        super();
        this.state = {
            name: '',
            errorMessage: ''
        };
    }


    /* Check the input and create a department */
    CreateDepartment() {
        if (this.CheckName()) {
            //#region Delete this later...
            this.props.CloseDepartmentCreator({ id: 10, name: 'Vermessungstechnik' });
            //#endregion

            /* Server Request
            let authToken;
            if (authToken = this.props.GetCookie() === undefined)
                this.props.Logout();
            
            axios.post(Globals.BASE_PATH + 'departments', { name: this.state.name }, {
                headers: { Authorization: authToken }
            })
            .then(response => this.props.CloseDepartmentCreator(response))
            .catch(error => {
                if (error.response.status === 401)
                    this.Logout();
                else
                    console.log(error)
            });
            */
        }
    }

    ChangeName(event) {
        this.setState({
            name: event.target.value,
            errorMessage: ''
        });
    }

    CheckName() {
        if (this.state.name === '') {
            this.setState({ errorMessage: 'Geben Sie bitte ein, wie die Abteilung heißen soll.' });
            return false;
        }
        return true;
    }

    /* Display a error message if available */
    GetErrorMessage() {
        if (this.state.errorMessage !== '')
            return <p>{ this.state.errorMessage }</p>;
    }


    render() {
        return (
            <div>
                <div>
                    <label>Abteilungsname:</label>
                    <input value={ this.state.name } onChange={ (e) => this.ChangeName(e) } />
                </div>
                { this.GetErrorMessage() }
                <button onClick={ () => this.props.CloseDepartmentCreator(undefined) }>Abbrechen</button>
                <button onClick={ () => this.CreateDepartment() }>Hinzufügen</button>
            </div>
        );
    }

}

export default DepartmentCreator;