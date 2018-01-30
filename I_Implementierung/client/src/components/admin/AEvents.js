//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown';
//#endregion

import EventCreator from './AEventCreator';
import * as Globals from '../../Globals';
//#endregion


class Events extends React.Component {

    constructor(props) {
        super(props);
        this.departments = undefined;
        this.departmentID = undefined;
        this.state = {
            departments: undefined,
            department: '',
            events: undefined,
            eventID: -1,
            entries: undefined,
            viewEntries: -1
        };
    }


    componentDidMount() {
        this.initDepartments();
    }

    initDepartments() {
        axios.get(Globals.BASE_PATH + 'departments')
        .then(response => {
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
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
            this.props.Logout();

        axios.get(Globals.BASE_PATH + 'departments/' + this.departmentID + '/events?authToken=' + authToken)
        .then(response => {
            this.setState({ events: response.data });
        })
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

    renderEvents() {
        if (this.departmentID === undefined) {
        } else {
            if (this.state.viewEntries !== -1) {

            }
            if (this.state.events !== undefined) {
                return (
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
                                            <button className="btn btn-primary btn-sm button-space" onClick={ () => this.ShowEntries(event.ID) } >Teilnehmer</button>
                                            <button className="btn btn-danger btn-sm" onClick={ () => this.DeleteEvent(event.ID) } >Löschen</button>
                                        </td>
                                    </tr>
                                );
                            })
                            }
                            </tbody>
                        </table>
                    </div>
                );
            }
        }
    }

    renderEventCreator() {
        if (this.departmentID !== undefined) {
            return <EventCreator key={ this.departmentID } Logout={ this.props.Logout } GetCookie={ this.props.GetCookie } CloseEventCreator={ this.CloseEventCreator } departmentID={ this.departmentID } />;
        }
    }

    
    render() {
        return (
            <div className="container events">
                <h4 className="form-header">Schnuppertage</h4>
                <div className="well">
                    { this.renderDepartments() }
                    { this.renderEvents() }
                </div>
                <hr/>
                { this.renderEventCreator() }
            </div>
        );
    }

}

export default Events;