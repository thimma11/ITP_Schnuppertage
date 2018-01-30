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
        let name = this.CheckName();
        let contraction = this.CheckContraction();

        if (name && contraction) {
            let authToken;
            if (authToken = this.props.GetCookie() === undefined)
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

    ChangeName(event) {
        this.setState({
            name: event.target.value,
            nameError: false
        });
    }

    ChangeContraction(event) {
        this.setState({
            contraction: event.target.value,
            contractionError: false
        });
    }

    CheckName() {
        if (this.state.name === '') {
            this.setState({ nameError: true });
            return false;
        }
        return true;
    }

    CheckContraction() {
        if (this.state.contraction === '') {
            this.setState({ contractionError: true });
            return false;
        }
        return true;
    }


    render() {
        return (
            <div className="department-adder">
                <h4 className="section-title">ABTEILUNG ERSTELLEN</h4>
                <div className="well">
                    <div className="form-group">
                        <label className="full-width">Abkürzung<span className="form-caption"> - Abkürzung der Abteilung</span></label>
                        <input className={ (this.state.contractionError) ? "full-width error-border" : "full-width" } value={ this.state.contraction } onChange={ (e) => this.ChangeContraction(e) } />
                    </div>
                    <div className="form-group form-button-section">
                        <label className="full-width">Abteilungsname<span className="form-caption"> - Name der Abteilung</span></label>
                        <input className={ (this.state.nameError) ? "full-width error-border" : "full-width" } value={ this.state.name } onChange={ (e) => this.ChangeName(e) } />
                    </div>
                    <button className="btn btn-primary center-block" onClick={ () => this.CreateDepartment() }>Erstellen</button>
                </div>
            </div>
        );
    }

}

export default DepartmentCreator;