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
            name: ''
        };
    }


    componentDidMount() {
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
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

    DeleteTeacher(id) {
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
			this.props.Logout();

        axios.delete(Globals.BASE_PATH + 'subjects/' + id)
        .then(response => this.componentDidMount())
		.catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
    }

    CreateSubject() {
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
			this.props.Logout();

        axios.post(Globals.BASE_PATH + 'subjects?authToken' + authToken, {
            name: this.state.name
        }).then(response => this.componentDidMount())
		.catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
        this.setState({ name: '' });
    }

    NameChanged(e) {
        this.setState({ name: e.target.value });
    }

    GetAddSubjectButton() {
        if (this.state.name === '')
            return <button disabled >Fach hinzufügen</button>;
        else
            return <button onClick={ () => this.CreateSubject() } >Fach hinzufügen</button>;
    }

    GetSubjects() {
        if (this.state.subjects.length === 0)
            return <p>Noch keine Fächer gespeichert...</p>;
        else {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Aktionen</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.subjects.map(subject => {
                            return (
                                <tr key={ subject.ID } >
                                    <td>{ subject.Name }</td>
                                    <td><button onClick={ () => this.DeleteTeacher(subject.ID) } >Löschen</button></td>
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
        if (this.state.subjects === undefined)
            return 'Loading subjects...';
        return (
            <div>
                <h1>Fächer</h1>
                { this.GetSubjects() }
                <div>
                    <input value={ this.state.name } onChange={ (e) => this.NameChanged(e)}/>
                    { this.GetAddSubjectButton() }
                </div>
            </div>
        );
    }

}

export default Teachers;