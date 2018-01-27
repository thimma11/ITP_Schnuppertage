//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
//#endregion

import * as Globals from '../../Globals';
//#endregion


class Entries extends React.Component {

	constructor(props) {
        super(props);
        this.eventID = this.props.eventID;
        this.state = { students: undefined };
	}


    componentDidMount() {
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
			this.props.Logout();

        axios.get(Globals.BASE_PATH + 'participants/events/' + this.eventID + '?authToken=' + authToken)
        .then(response => this.setState({ students: response.data }))
		.catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
    }

    RemoveStudent(id) {
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
			this.props.Logout();

        axios.delete(Globals.BASE_PATH + 'participants/' + id + '?authToken=' + authToken)
        .then(response => this.componentDidMount())
		.catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
    }


    render(){
        if (this.state.students === undefined)
            return 'Loading students...';
        if (this.state.students.length === 0) {
            return (
                <div>
                    <h3>Alle Teilnehmer des Schnuppertags in { this.props.location } am { this.props.date }</h3>
                    <p>Keine Teilnehmer für diesem Schnuppertag eingetragen...</p>
                    <button onClick={ () => this.props.CloseEntries() } >Zurück</button>
                </div>
            );
        }
		return (
			<div>
                <h3>Alle Teilnehmer des Schnuppertags in { this.props.location } am { this.props.date }</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Vorname</th>
                            <th>Nachname</th>
                            <th>Telefonnummer</th>
                            <th>E-Mail</th>
                            <th>Schulstandort</th>
                            <th>Schultyp</th>
                            <th>Aktionen</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.students.map(student => {
                            console.log(student);
                            return (
                                <tr key={ student.ID }>
                                    <td>{ student.FIRSTNAME }</td>
                                    <td>{ student.LASTNAME }</td>
                                    <td>{ student.PHONE }</td>
                                    <td>{ student.EMAIL }</td>
                                    <td>{ student.SCHOOL_LOCATION }</td>
                                    <td>{ student.SCHOOL_TYP }</td>
                                    <td>
                                        <button onClick={ () => this.RemoveStudent(student.ID) } >Entfernen</button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                    <button onClick={ () => this.props.CloseEntries() } ></button>
                </table>
            </div>
		);
    }

}

export default Entries;