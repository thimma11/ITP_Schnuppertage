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
            subjects: undefined,
            name: '',
            nameError: false,
            editName: '',
            editNameError: false,
            editID: -1
        };
    }


    componentDidMount() {
        let authToken = this.props.GetCookie();
        if (authToken === undefined)
			this.props.Logout();

        axios.get(Globals.BASE_PATH + 'subjects?authToken' + authToken)
        .then(response => this.setState({ subjects: response.data }))
		.catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
    }

    DeleteSubject(id) {
        axios.delete(Globals.BASE_PATH + 'subjects/' + id)
        .catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });

        let subjects = [];
        this.state.subjects.map(subject => {
            if (subject.ID !== id) {
                subjects.push(subject);
            }
            return null;
        });
        this.setState({
            subjects: subjects
        });
    }

    CreateSubject() {
        this.handleNameLeave();
        if (this.state.name !== '') {
            axios.post(Globals.BASE_PATH + 'subjects', {
                name: this.state.name
            }).then(response => {
                let subjects = this.state.subjects;
                subjects.push({
                    ID: response.data.insertId,
                    Name: this.state.name
                });
                this.setState({
                    subjects: subjects,
                    name: ''
                });
            })
            .catch(error => {
                console.log(error);
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

    handleEditNameChange(event) {
        this.setState({
            editName: event.target.value,
            editNameError: false
        });
    }

    handleEditNameLeave() {
        if (this.state.editName === '') {
            this.setState({
                editNameError: true
            });
        }
    }

    EditSubject(id) {
        this.state.subjects.map(subject => {
            if (subject.ID === id) {
                this.setState({
                    editID: id,
                    editName: subject.Name
                });
            }
            return null;
        })
    }

    SaveSubject() {
        let id = this.state.editID;
        axios.put(Globals.BASE_PATH + 'subjects/' + id, {
            name: this.state.editName
        }).catch(error => {
            console.log(error);
        });
        
        let subjects = this.state.subjects;
        subjects.map(subject => {
            if (subject.ID === id) {
                subject.Name = this.state.editName;
            }
            return null;
        });
        this.setState({
            subjects: subjects,
            editID: -1
        });
    }

    CloseSubject() {
        this.handleEditNameLeave();
        if (this.state.editName !== '') {
            this.SaveSubject();
        } else {
            this.SaveSubject();
            this.setState({ editID: -1 });
        }
    }

    GetButtons(id) {
        if (this.state.editID === -1) {
            return (
                <td>                   
                    <button className="btn btn-primary btn-sm button-space" onClick={ () => this.EditSubject(id) } >Bearbeiten</button>
                    <button className="btn btn-danger btn-sm" onClick={ () => this.DeleteSubject(id) } >Löschen</button>
                </td>
            );
        } else {
            return <td><span className="label-information">Gesperrt</span></td>;
        }
    }

    GetAddSubjectButton() {
        if (this.state.name === '')
            return <button disabled >Fach hinzufügen</button>;
        else
            return <button onClick={ () => this.CreateSubject() } >Fach hinzufügen</button>;
    }

    GetSubjects() {
        if (this.state.subjects === undefined) {
            return (
                <div className="well">
                    <div className="table-responsive">
                        <table class="table departments-table">
                            <thead>
                                <tr>
                                    <th>Fach ID</th>
                                    <th>Name</th>
                                    <th>Aktionen</th>
                                </tr>
                            </thead>
                        </table>
                        <h5 className="text-center"><b>Fächer werden geladen . . .</b></h5>
                    </div>
                </div>
            );
        } else  if (this.state.subjects.length === 0) {
            return (
                <div className="well">
                    <div className="table-responsive">
                        <table class="table departments-table">
                            <thead>
                                <tr>
                                    <th>Fach ID</th>
                                    <th>Name</th>
                                    <th>Aktionen</th>
                                </tr>
                            </thead>
                        </table>
                        <h5 className="text-center"><b>Keine Fächer gefunden . . .</b></h5>
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
                                    <th>Fach ID</th>
                                    <th>Name</th>
                                    <th>Aktionen</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                            this.state.subjects.map((subject, index) => {
                                if (subject.ID === this.state.editID) {
                                    return (
                                        <tr key={index} className='edit-row'>
                                            <td>{ subject.ID }</td>
                                            <td><input type="text" className={ (this.state.editNameError) ? 'form-control form-error' : 'form-control' } value={ this.state.editName } onChange={ (event) => this.handleEditNameChange(event) } onBlur={ () => this.handleEditNameLeave() }/></td>
                                            <td><button className="btn btn-success btn-sm" onClick={ () => this.CloseSubject(subject.ID) } >Speichern</button></td>
                                        </tr>
                                    );
                                } else {
                                    return (
                                        <tr key={index}>
                                            <td>{ subject.ID }</td>
                                            <td>{ subject.Name }</td>
                                            { this.GetButtons(subject.ID) }
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
                    <h4 className="form-header">Fächer</h4>
                    {  this.GetSubjects() }
                    <hr/>
                </div>
                <div className="add-teacher">
                    <h4 className="form-header">Fach hinzufügen</h4>
                    <div className="well">
                        <div className="form-group">
                            <label>Name<span className="label-information"> - Name des Faches</span></label>
                            <input type="text" className={ (this.state.nameError) ? 'form-control form-error' : 'form-control' } placeholder="Informationssysteme" value={ this.state.name } onChange={ (event) => this.handleNameChange(event) } onBlur={ () => this.handleNameLeave() }/>
                        </div>
                        <button className="btn btn-primary center-block" onClick={ () => this.CreateSubject() } >Fach hinzufügen</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default Teachers;