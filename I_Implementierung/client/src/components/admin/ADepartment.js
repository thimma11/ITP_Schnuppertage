//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
//#endregion

import Locations from './ALocations';
import EventCreator from './AEventCreator';
import * as Globals from '../../Globals';
//#endregion


class Department extends React.Component {

    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.state = {
            name: '',
            events: [],
            createEvent: false
        };

        this.CloseEventCreator = this.CloseEventCreator.bind(this);
    }


    /* Get all display information */
    componentDidMount() {
        this.InitDepartment();
        this.InitEvents();
    }

    /* Get a detailed department information */
    InitDepartment() {
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
            this.props.Logout();
        
        axios.get(Globals.BASE_PATH + 'departments/' + this.id)
        .then(response => {
            this.setState({
                name: response.data[0].name,
                contraction: response.data[0].contraction
            });
        }).catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
    }

    InitEvents() {
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
            this.props.Logout();

        axios.get(Globals.BASE_PATH + 'departments/' + this.id + '/events?authToken=' + authToken)
        .then(response => {
            this.setState({ events: response.data });
        })
        .catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
    }

    /* Set variable createEvent to 'true' */
    OpenEventCreator() {
        this.setState({ createEvent:  true });
    }

    /* Set variable createEvent to 'false' */
    CloseEventCreator(event) {
        if (event === true) {
            this.setState({ createEvent: false });
            this.InitEvents();
        } else
            this.setState({ createEvent: false });
    }

    /* Delete an event */
    DeleteEvent(id) {
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
            this.props.Logout();
        
        axios.delete(Globals.BASE_PATH + 'events/' + id + '?authToken=' + authToken)
        .then(response => this.InitEvents())
        .catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
    }

    /* Returns the Create Event Button or shows the form */
    GetEventCreator() {
        if (this.state.createEvent)
            return <EventCreator CloseEventCreator={ this.CloseEventCreator } departmentID={ this.id } />;
        else
            return <button onClick={ () => this.OpenEventCreator() } >Schnuppertag erstellen</button>;
    }

    GetEvents() {
        if (this.state.events !== undefined) {
            return (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Datum</th>
                                <th>Standort</th>
                                <th>Aktionen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            this.state.events.map(event => {
                                return (
                                    <tr key={ event.ID }>
                                        <td>{ event.DATE.split('T')[0] }</td>
                                        <td>{ event.NAME }</td>
                                        <td><button onClick={ () => this.DeleteEvent(event.ID) } >Löschen</button></td>
                                    </tr>
                                );
                            })
                            }
                        </tbody>
                    </table>
                    { this.GetEventCreator() }
                </div>
            );
        } else
            return 'Loading events...';
    }


    render() {
        return (
            <div>
                <h2>Abteilungsverwaltung für <i>"</i>{ this.state.name }<i>"</i></h2>
                <Locations departmentID={ this.id } />
                <div>
                    <h3>Schnuppertage</h3>
                    { this.GetEvents() }
                </div>
            </div>
        );
    }

}

export default Department;