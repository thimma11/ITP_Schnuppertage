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
        this.surnameError = false;
        this.firstnameError = false;
        this.state = {
            teachers: undefined,
            contraction: '',
            contractionError: false,
            firstname: '',
            firstnameError: false,
            surname: '',
            surnameError: false,
            editContraction: '',
            editContractionError: false,
            editFirstname: '',
            editFirstnameError: false,
            editSurname: '',
            editSurnameError: false,
            editID: -1
        };
    }


    componentDidMount() {
        axios.get(Globals.BASE_PATH + 'teachers')
        .then(response => this.setState({ teachers: response.data }))
		.catch(error => {
            console.log(error);
        });
    }

    DeleteTeacher(id) {
        axios.delete(Globals.BASE_PATH + 'teachers/' + id)
        .catch(error => {
            console.log(error);
        });

        let teachers = [];
        this.state.teachers.map(teacher => {
            if (teacher.ID !== id) {
                teachers.push(teacher);
            }
            return null;
        });
        this.setState({ teachers: teachers });
    }

    CreateTeacher() {
        if (this.state.contraction.length === 4 && this.state.firstname.length !== 0 && this.state.surname.length !== 0) {
            console.log("hi");
            axios.post(Globals.BASE_PATH + 'teachers', {
                contraction: this.state.contraction,
                name: this.state.firstname,
                surname: this.state.surname
            }).then(response => {
                let teachers = this.state.teachers;
                console.log(response.data);
                teachers.push({
                    ID: response.data.insertId,
                    CONTRACTION: this.state.contraction,
                    NAME: this.state.firstname,
                    SURNAME: this.state.surname
                });
                this.setState({
                    teachers: teachers,
                    contraction: '',
                    firstname: '',
                    surname: ''
                });
            })
            .catch(error => {
                console.log(error);
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
        if (this.state.contraction.length !== 4) {
            this.setState({
                contractionError: true
            });
        }
    }

    handleFirstnameChange(event) {
        this.setState({
            firstname: event.target.value,
            firstnameError: false
        });
    }

    handleFirstnameLeave() {
        if (this.state.firstname.length === 0) {
            this.setState({
                firstnameError: true
            });
            this.firstnameError = true;
        } else {
            this.firstnameError = false;
        }
    }

    handleSurnameChange(event) {
        this.setState({
            surname: event.target.value,
            surnameError: false
        });
    }

    handleSurnameLeave() {
        if (this.state.surname.length === 0) {
            this.setState({
                surnameError: true
            });
            this.surnameError = true;
        } else {
            this.surnameError = false;
        }
    }

    handleEditContractionChange(event) {
        this.setState({
            editContraction: event.target.value,
            editContractionError: false
        });
    }

    handleEditContractionLeave() {
        if (this.state.editContraction.length !== 4) {
            this.setState({
                editContractionError: true
            });
        }
    }

    handleEditFirstnameChange(event) {
        this.setState({
            editFirstname: event.target.value,
            editFirstnameError: false
        });
    }

    handleEditFirstnameLeave() {
        if (this.state.editFirstname.length === 0) {
            this.setState({
                editFirstnameError: true
            });
        }
    }

    handleEditLastnameChange(event) {
        this.setState({
            editSurname: event.target.value,
            editSurnameError: false
        });
    }

    handleEditLastnameLeave() {
        if (this.state.editSurname.length === 0) {
            this.setState({
                editSurnameError: true
            });
        }
    }

    EditTeacher(id) {
        this.state.teachers.map(teacher => {
            if (teacher.ID === id) {
                this.setState({
                    editID: id,
                    editContraction: teacher.CONTRACTION,
                    editFirstname: teacher.NAME,
                    editSurname: teacher.SURNAME
                });
            }
            return null;
        })
    }

    SaveTeacher() {
        let id = this.state.editID;
        axios.put(Globals.BASE_PATH + 'teachers/' + id, {
            contraction: this.state.editContraction,
            name: this.state.editFirstname,
            surname: this.state.editSurname
        }).catch(error => {
            console.log(error);
        });
        
        let teachers = this.state.teachers;
        teachers.map(teacher => {
            if (teacher.ID === id) {
                teacher.CONTRACTION = this.state.editContraction;
                teacher.NAME = this.state.editFirstname;
                teacher.SURNAME = this.state.editSurname;
            }
            return null;
        });
        this.setState({
            teachers: teachers,
            editID: -1
        });
    }

    CloseTeacher(id) {
        this.handleEditContractionLeave();
        if (this.state.editContraction.length === 4) {
            this.SaveTeacher();
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
        if (this.state.teachers === undefined) {
            return (
                <div className="well">
                    <div className="table-responsive">
                        <table class="table departments-table">
                            <thead>
                                <tr>
                                    <th>Lehrer ID</th>
                                    <th>Abkürzung</th>
                                    <th>Vorname</th>
                                    <th>Nachname</th>
                                    <th>Aktionen</th>
                                </tr>
                            </thead>
                        </table>
                        <h5 className="text-center"><b>Lehrer werden geladen . . .</b></h5>
                    </div>
                </div>
            );
        } else if (this.state.teachers.length === 0) {
            return (
                <div className="well">
                    <div className="table-responsive">
                        <table class="table departments-table">
                            <thead>
                                <tr>
                                    <th>Lehrer ID</th>
                                    <th>Abkürzung</th>
                                    <th>Vorname</th>
                                    <th>Nachname</th>
                                    <th>Aktionen</th>
                                </tr>
                            </thead>
                        </table>
                        <h5 className="text-center"><b>Keine Lehrer gefunden . . .</b></h5>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="well">
                    <div className="table-responsive">
                        <table class="table departments-table">
                            <thead>
                                <tr>
                                    <th>Lehrer ID</th>
                                    <th>Abkürzung</th>
                                    <th>Vorname</th>
                                    <th>Nachname</th>
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
                                            <td><input type="text" className={ (this.state.editFirstnameError) ? 'form-control form-error' : 'form-control' } value={ this.state.editFirstname } onChange={ (event) => this.handleEditFirstnameChange(event) } onBlur={ () => this.handleEditFirstnameLeave() }/></td>
                                            <td><input type="text" className={ (this.state.editSurnameError) ? 'form-control form-error' : 'form-control' } value={ this.state.editSurname } onChange={ (event) => this.handleEditLastnameChange(event) } onBlur={ () => this.handleEditLastnameLeave() }/></td>
                                            <td><button className="btn btn-success btn-sm" onClick={ () => this.CloseTeacher(teacher.ID) } >Speichern</button></td>
                                        </tr>
                                    );
                                } else {
                                    return (
                                        <tr key={index}>
                                            <td>{ teacher.ID }</td>
                                            <td>{ teacher.CONTRACTION }</td>
                                            <td>{ teacher.NAME }</td>
                                            <td>{ teacher.SURNAME }</td>
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
    }


    render() {
        return (
            <div className="container">
                <div className="teachers">
                    <h4 className="form-header">Lehrer</h4>
                    {  this.GetTeachers() }
                    <hr/>
                </div>
                <div className="add-teacher">
                    <h4 className="form-header">Lehrer hinzufügen</h4>
                    <div className="well">
                        <div className="form-group">
                            <label>Abkürzung<span className="label-information"> - Abkürzung des Lehrers 4 Buchstaben</span></label>
                            <input type="text" className={ (this.state.contractionError) ? 'form-control form-error' : 'form-control' } placeholder="MUST" value={ this.state.contraction } onChange={ (event) => this.handleContractionChange(event) } onBlur={ () => this.handleContractionLeave() }/>
                        </div>
                        <div className="form-group">
                            <label>Vorname</label>
                            <input type="text" className={ (this.state.firstnameError) ? 'form-control form-error' : 'form-control' } placeholder="Max" value={ this.state.firstname } onChange={ (event) => this.handleFirstnameChange(event) } onBlur={ () => this.handleFirstnameLeave() }/>
                        </div>
                        <div className="form-group">
                            <label>Nachname</label>
                            <input type="text" className={ (this.state.surnameError) ? 'form-control form-error' : 'form-control' } placeholder="Musterman" value={ this.state.surname } onChange={ (event) => this.handleSurnameChange(event) } onBlur={ () => this.handleSurnameLeave() }/>
                        </div>
                        <button className="btn btn-primary center-block" onClick={ () => this.CreateTeacher() } >Lehrer hinzufügen</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default Teachers;