import React from 'react';
import axios from 'axios';
import * as Globals from '../../Globals';


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
        if (this.state.name === '') {
            this.setState({ errorMessage: 'Geben Sie bitte ein, wie die Abteilung heißen soll.' });
            return null;
        }
        this.props.CloseDepartmentCreator(true);
        
        //#region Server Request
        /*
        axios.post(Globals.BASE_PATH + 'departments', {
            name: this.state.name
        }).then(response => this.props.CloseDepartmentCreator(true))
        .catch(error => console.log(error));
        */
        //#endregion
    }

    /* Handle name change */
    ChangeName(event) {
        this.setState({
            name: event.target.value,
            errorMessage: ''
        });
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
                <button onClick={ () => this.props.CloseDepartmentCreator(false) }>Abbrechen</button>
                <button onClick={ () => this.CreateDepartment() }>Hinzufügen</button>
            </div>
        );
    }

}

export default DepartmentCreator;