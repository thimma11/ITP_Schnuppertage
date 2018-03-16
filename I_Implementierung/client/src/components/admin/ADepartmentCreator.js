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
            contraction: '',
            nameError: false,
            contractionError: false
        };
    }


    /* Check the input and create a department */
    CreateDepartment() {
        this.handleNameLeave();
        this.handleContractionLeave();

        if (this.state.name !== '' && this.state.contraction !== '') {
            let authToken = this.props.GetCookie();
            if (authToken === undefined)
                this.props.Logout();
                
            axios.post(Globals.BASE_PATH + 'departments?authToken=' + authToken, {
                contraction: this.state.contraction,
                name: this.state.name
            }).then(response => {
                let element = {
                    id: response.data.insertId,
                    contraction: this.state.contraction,
                    name: this.state.name
                };
                this.props.CloseDepartmentCreator(element);
            }).catch(error => {
                if (error.response.status === 401)
                    this.Logout();
                else
                    console.log(error)
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


    render() {
        return (
            <div className="department-creator">
                <h4 className="form-header">Abteilung erstellen</h4>
                <div className="well">
                    <div className="form-group">
                        <label>Abkürzung<span className="label-information"> - Abkürzung der Abteilung</span></label>
                        <input type="text" className={ (this.state.contractionError) ? 'form-control form-error' : 'form-control' } placeholder="IT" value={ this.state.contraction } onChange={ (event) => this.handleContractionChange(event) } onBlur={ () => this.handleContractionLeave() }/>
                    </div>
                    <div className="form-group">
                        <label>Abteilungsname<span className="label-information"> - Name der Abteilung</span></label>
                        <input type="text" className={ (this.state.nameError) ? 'form-control form-error' : 'form-control' } placeholder="Hochbau" value={ this.state.name } onChange={ (event) => this.handleNameChange(event) } onBlur={ () => this.handleNameLeave() }/>
                    </div>
                    <button className="btn btn-primary center-block" onClick={ () => this.CreateDepartment() }>Erstellen</button>
                </div>
            </div>
        );
    }

}

export default DepartmentCreator;