//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
//#endregion

import EventCreator from './AEventCreator';
import * as Globals from '../../Globals';
//#endregion


class Events extends React.Component {

    constructor(props) {
        super(props);
        this.departments = undefined;
        this.departmentID = undefined;
        this.eventID = undefined;
        this.state = {
            departments: undefined,
            department: '',
            events: undefined,
            eventID: -1,
            entries: undefined,
            viewEntries: -1,
            participants: undefined,
            eventDate: ''
        };
    }


    componentDidMount() {
        this.initDepartments();
    }

    initDepartments() {
        let authToken = this.props.GetCookie();
        if (this.props.GetCookie() === undefined)
            this.props.Logout();

        axios.get(Globals.BASE_PATH + 'departments?authToken=' + authToken)
        .then(response => {
            if (response.data.success === false){
                this.props.Logout();
            }
            this.departments = response.data;
            
            let departments = [];
            response.data.map(department => {
                departments.push(department.name);
                return null;
            });
            this.departmentID = undefined;
            this.setState({
                departments: departments,
                department: ''
            });
        })
    }

    initEvents() {
        let authToken = this.props.GetCookie();
        if (this.props.GetCookie() === undefined)
            this.props.Logout();

        axios.get(Globals.BASE_PATH + 'departments/' + this.departmentID + '/events?authToken=' + authToken)
        .then(response => {
            if (response.data.success === false){
                this.props.Logout();
            }
            this.setState({ events: response.data });
        });
    }

    initParticipantsForEvent(eventID, eventDate) {
        this.eventID = eventID;

        let authToken = this.props.GetCookie();
        if (this.props.GetCookie() === undefined)
            this.props.Logout();

        axios.get(Globals.BASE_PATH + 'participants/events/' + eventID + "?authToken=" + authToken)
        .then(response => {

            
            if (response.data.success === false){
                this.props.Logout();
            }

            this.setState({
                participants: response.data,
                eventDate: eventDate
            });
        });
    }

    handleDepartmentChange(department) {
        let departments = [];
        this.departments.map(dep => {
            departments.push(dep.name);
            return null;
        });

        if (departments.indexOf(department.value) === -1) {
            this.setState({
                department: ''
            });
            this.initDepartments();
        } else {
            this.setState({
                department: department.value
            });
            this.departments.map(dep => {
                if (dep.name === department.value) {
                    this.departmentID = dep.id;
                }
            });
            this.initEvents();
        }
    }

    renderDepartments() {
        if (this.state.departments === undefined) {
            return (
                <div className='form-group'>
                    <label>Abteilung<span className="label-information"> - Wählen Sie eine Abteilung aus.</span></label>
                    <Dropdown disabled options={ this.state.departments } onChange={ (event) => this.handleDepartmentChange(event) } value={ this.state.department } placeholder="Abteilung auswählen" />
                </div>
            );
        }
        if (this.state.departments.length === 0) {
            return (
                <div class="alert alert-danger" role="alert"><p><b>Es sind keine Abteilungen vorhanden.</b></p></div>
            );
        } else {
            return (
                <div className={ (this.state.departmentError) ? 'form-group dropdown-error' : 'form-group' }>
                    <label>Abteilung<span className="label-information"> - Wählen Sie eine Abteilung aus.</span></label>
                    <Dropdown options={ this.state.departments } onChange={ (event) => this.handleDepartmentChange(event) } value={ this.state.department } placeholder="Abteilung auswählen" />
                </div>
            );
        }
    }

    DeleteEvent(id) {
        let authToken = this.props.GetCookie();
        if (this.props.GetCookie() === undefined)
            this.props.Logout();

        axios.delete(Globals.BASE_PATH + 'events/' + id + "?authToken=" + authToken)
        .then((response) => {
            if (response.data.success === false){
                this.props.Logout();
            }
            this.initEvents();
        }).catch(error => console.log(error))
    }

    renderEvents() {
        if (this.departmentID === undefined) {
        } else {
            if (this.state.viewEntries !== -1) {

            }
            if (this.state.events !== undefined) {
                if (this.state.events.length === 0) {
                    return (
                        <div>
                            <div className="table-responsive">
                                <table class="table departments-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Datum</th>
                                            <th>Standort</th>
                                            <th>Aktionen</th>
                                        </tr>
                                    </thead>
                                </table>
                                <h5 className="text-center"><b>Keine Schnuppertage gefunden . . .</b></h5>
                            </div>
                        </div>
                    );
                }
                console.log(this.state.events);
                return (
                    <div>
                        <div className="table-responsive">
                            <table class="table departments-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Datum</th>
                                        <th>Standort</th>
                                        <th>Aktionen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                this.state.events.map((event, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{ event.ID }</td>
                                            <td>{ event.DATE.split('T')[0] }</td>
                                            <td>{ event.NAME }</td>
                                            <td>
                                                <button className="btn btn-primary btn-sm button-space" onClick={ () => this.initParticipantsForEvent(event.ID,  event.DATE.split('T')[0]) } >Teilnehmer</button>
                                                <button className="btn btn-danger btn-sm" onClick={ () => this.DeleteEvent(event.ID) } >Löschen</button>
                                            </td>
                                        </tr>
                                    );
                                })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            }
        }
    }

    CloseEventCreator() {
        this.initEvents();
    }

    DeleteParticipant(partID) {
        axios.delete(Globals.BASE_PATH + '/participants/' + partID)
        .then(() => {
            this.initParticipantsForEvent(this.eventID);
        }).catch(error => console.log(error))
    }

    GetParticipantPDF(partID) {
        axios.get(Globals.BASE_PATH + 'getpdf/' + partID)
        .then(response => {
            console.log(response);
        }).catch(error => console.log(error));
    }

    renderEventCreator() {
        if (this.state.participants !== undefined) {
            return (
                <div>
                    <hr/>
                    <h4 className="form-header">Teilnehmerliste - { this.state.eventDate }</h4>
                    <div className="well">
                        {
                            (this.state.participants.length === 0) ? <h5 className="text-center"><b>Keine Teilnehmer gefunden . . .</b></h5> :
                            <div>
                                <div className="table-responsive">
                                    <table class="table departments-table">
                                        <thead>
                                            <tr>
                                                <th>Vorname</th>
                                                <th>Nachname</th>
                                                <th>Telefon</th>
                                                <th>E-Mail</th>
                                                <th>Schulstandort</th>
                                                <th>Schultyp</th>
                                                <th>Aktionen</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                        this.state.participants.map((participant, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{ participant.FIRSTNAME }</td>
                                                    <td>{ participant.LASTNAME }</td>
                                                    <td>{ participant.PHONE }</td>
                                                    <td>{ participant.EMAIL }</td>
                                                    <td>{ participant.SCHOOL_LOCATION }</td>
                                                    <td>{ participant.SCHOOL_TYP }</td>
                                                    <td>
                                                        <button className="btn btn-danger btn-sm button-space" onClick={ () => this.DeleteParticipant(participant.ID) } >Austragen</button>
                                                        <button className="btn btn-success btn-sm" onClick={ () => this.GetParticipantPDF(participant.ID) }>PDF erzeugen</button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }
                        <button style={{marginTop: '10px'}} className="center-block btn btn-primary" onClick={ () => this.setState({ participants: undefined }) }>Teilnehmerliste schließen</button>
                    </div>
                </div>
            );
        }
        if (this.departmentID !== undefined) {
            return <div><hr/><EventCreator key={ this.departmentID } Logout={ this.props.Logout } GetCookie={ this.props.GetCookie } CloseEventCreator={ this.CloseEventCreator.bind(this) } departmentID={ this.departmentID } /></div>;
        }
    }

    
    render() {
        return (
            <div>
                <div className="container events">
                    <h4 className="form-header">Schnuppertage</h4>
                    <div className="well">
                        { this.renderDepartments() }
                        { this.renderEvents() }
                    </div>
                    { this.renderEventCreator() }
                </div>
            </div>
        );
    }

}

export default Events;