//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
//#endregion

import * as Globals from '../../Globals';
//#endregion


class Teachers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teachers: undefined,
            contraction: '',
            contractionError: false,
            editContraction: '',
            editContractionError: false,
            editID: -1
        };
    }


    componentDidMount() {
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
			this.props.Logout();

        axios.get(Globals.BASE_PATH + 'teachers?authToken' + authToken)
        .then(response => this.setState({ teachers: response.data }))
		.catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
    }

    DeleteTeacher(id) {
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
			this.props.Logout();

        axios.delete(Globals.BASE_PATH + 'teachers/' + id + '?authToken')
        .then(response => this.componentDidMount())
		.catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
    }

    CreateTeacher() {
        this.handleContractionLeave();

        if (!this.state.contractionError) {
            let authToken;
            if (authToken = this.props.GetCookie() === undefined)
                this.props.Logout();

            axios.post(Globals.BASE_PATH + 'teachers?authToken' + authToken, {
                contraction: this.state.contraction
            }).then(response => this.componentDidMount())
            .catch(error => {
                if (error.response.status === 401)
                    this.props.Logout();
                else
                    console.log(error);
            });
            this.setState({ contraction: '' });
        }
    }

    handleContractionChange(event) {
        this.setState({
            contraction: event.target.value,
            contractionError: false
        });
    }

    handleContractionLeave() {
        if (this.state.contraction === '' || this.state.contraction.length !== 4) {
            this.setState({
                contractionError: true
            });
        }
    }

    handleEditContractionChange(event) {
        this.setState({
            editContraction: event.target.value,
            editContractionError: false
        });
    }

    handleEditContractionLeave() {
        if (this.state.editContraction === '' || this.state.editContraction.length !== 4) {
            this.setState({
                editContractionError: true
            });
        }
    }

    EditTeacher(id) {
        this.state.teachers.map(teacher => {
            if (teacher.ID === id) {
                this.setState({
                    editID: id,
                    editContraction: teacher.CONTRACTION
                });
            }
            return null;
        })
    }

    SaveTeacher() {

    }

    CloseTeacher() {
        this.handleEditContractionLeave();

        if (this.state.editContractionError) {
        } else {
            this.SaveTeacher();
            this.setState({ editID: -1 });
        }
    }

    GetButtons(id) {
        if (this.state.editID === -1) {
            return (
                <td>                   
                    <button className="btn btn-primary btn-sm button-space" onClick={ () => this.EditTeacher(id) } >Bearbeiten</button>
                    <button className="btn btn-danger btn-sm" onClick={ () => this.DeleteTeacher(id) } >Löschen</button>
                </td>
            );
        } else {
            return <td><span className="label-information">Gesperrt</span></td>;
        }
    }

    GetTeachers() {
        return (
            <div className="well">
                <div className="table-responsive">
                    <table class="table departments-table">
                        <thead>
                            <tr>
                                <th>Lehrer ID</th>
                                <th>Abkürzung</th>
                                <th>Aktionen</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        this.state.teachers.map((teacher, index) => {
                            if (teacher.ID === this.state.editID) {
                                return (
                                    <tr key={index} className='edit-row'>
                                        <td>{ teacher.ID }</td>
                                        <td><input type="text" className={ (this.state.editContractionError) ? 'form-control form-error' : 'form-control' } value={ this.state.editContraction } onChange={ (event) => this.handleEditContractionChange(event) } onBlur={ () => this.handleEditContractionLeave() }/></td>
                                        <td><button className="btn btn-success btn-sm" onClick={ () => this.CloseTeacher(teacher.ID) } >Speichern</button></td>
                                    </tr>
                                );
                            } else {
                                return (
                                    <tr key={index}>
                                        <td>{ teacher.ID }</td>
                                        <td>{ teacher.CONTRACTION }</td>
                                        { this.GetButtons(teacher.ID) }
                                    </tr>
                                );
                            }
                        })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }


    render() {
        if (this.state.teachers == undefined)
            return <div className="container teachers"><h4 className="form-header">Lehrer</h4></div>;
        return (
            <div className="container">
                <div className="teachers">
                    <h4 className="form-header">Lehrer</h4>
                    {  this.GetTeachers() }
                </div>
                <hr/>
                <div className="add-teacher">
                    <h4 className="form-header">Lehrer hinzufügen</h4>
                    <div className="well">
                        <div className="form-group">
                            <label>Abkürzung<span className="label-information"> - Abkürzung des Lehrers 4 Buchstaben</span></label>
                            <input type="text" className={ (this.state.contractionError) ? 'form-control form-error' : 'form-control' } placeholder="ABCD" value={ this.state.contraction } onChange={ (event) => this.handleContractionChange(event) } onBlur={ () => this.handleContractionLeave() }/>
                        </div>
                        <button className="btn btn-primary center-block" onClick={ () => this.CreateTeacher() } >Lehrer hinzufügen</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default Teachers;