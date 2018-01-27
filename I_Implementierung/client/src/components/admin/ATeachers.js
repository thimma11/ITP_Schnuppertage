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
            contraction: ''
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

    ContractionChanged(e) {
        this.setState({ contraction: e.target.value });
    }

    GetAddTeacherButton() {
        if (this.state.contraction === '')
            return <button disabled >Lehrer hinzufügen</button>;
        else
            return <button onClick={ () => this.CreateTeacher() } >Lehrer hinzufügen</button>;
    }

    GetTeachers() {
        if (this.state.teachers.length === 0)
            return <p>Noch keine Lehrer gespeichert...</p>;
        else {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Abkürzung</th>
                            <th>Aktionen</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.teachers.map(teacher => {
                            return (
                                <tr key={ teacher.ID } >
                                    <td>{ teacher.CONTRACTION }</td>
                                    <td><button onClick={ () => this.DeleteTeacher(teacher.ID) } >Löschen</button></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            );
        }
    }


    render() {
        if (this.state.teachers === undefined)
            return 'Loading teachers...';
        return (
            <div>
                <h1>Lehrer</h1>
                {  this.GetTeachers() }
                <div>
                    <input value={ this.state.contraction } onChange={ (e) => this.ContractionChanged(e)}/>
                    { this.GetAddTeacherButton() }
                </div>
            </div>
        );
    }

}

export default Teachers;