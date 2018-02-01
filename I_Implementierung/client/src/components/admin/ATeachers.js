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
        });
        this.setState({ teachers: teachers });
    }

    CreateTeacher() {
        this.handleContractionLeave();
        if (this.state.contraction.length === 4) {
            axios.post(Globals.BASE_PATH + 'teachers', {
                contraction: this.state.contraction
            }).then(response => {
                let teachers = this.state.teachers;
                console.log(response.data);
                teachers.push({
                    ID: response.data.insertId,
                    CONTRACTION: this.state.contraction
                });
                this.setState({
                    teachers: teachers,
                    contraction: ''
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
        let id = this.state.editID;
        axios.put(Globals.BASE_PATH + 'teachers/' + id, {
            contraction: this.state.editContraction
        }).catch(error => {
            console.log(error);
        });
        
        let teachers = this.state.teachers;
        teachers.map(teacher => {
            if (teacher.ID === id) {
                teacher.CONTRACTION = this.state.editContraction;
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
        };
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