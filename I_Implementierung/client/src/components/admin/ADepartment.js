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
    }

    /* Get a detailed department information */
    InitDepartment() {
        //#region Delete this later...
        this.setState({
            name: 'Bautechnik',
            events: [
                {
                    id: 0,
                    date: '2018-01-20',
                    location: 'Zwettl'
                },
                {
                    id: 2,
                    date: '2018-01-12',
                    location: 'Krems'
                },
                {
                    id: 1,
                    date: '2018-02-01',
                    location: 'Zwettl'
                }
            ]
        });
        //#endregion

        /* Server Request
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
            this.props.Logout();
        
        axios.get(Globals.BASE_PATH + 'departments/' + this.id)
        .then(response => this.setState({ name: response.data.name }))
        .catch(error => console.log(error));
        axios.get(Globals.BASE_PATH + 'departments/' + this.id + '/events', {
            headers: { Authorization: authToken }
        }).then(response => this.setState({ events: response.data.events }))
        .catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
        */
    }

    /* Set variable createEvent to 'true' */
    OpenEventCreator() {
        this.setState({ createEvent:  true });
    }

    /* Set variable createEvent to 'false' */
    CloseEventCreator(event) {
        if (event !== undefined) {
            let events = this.state.events;
            events.push(event);
            this.setState({
                events: events,
                createEvent:  false
            });
        } else
            this.setState({ createEvent: false });
    }

    /* Delete an event */
    DeleteEvent(id) {
        /* Server Request
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
            this.props.Logout();
        
        axios.delete(Globals.BASE_PATH + 'events/' + id, {
            headers: { Authorization: authToken }
        }).then(response => this.InitDepartment())
        .catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
        */
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
                                    <tr key={ event.id }>
                                        <td>{ event.date }</td>
                                        <td>{ event.location }</td>
                                        <td><button onClick={ () => this.DeleteEvent(event.id) } >Löschen</button></td>
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
                <h2>Abteilungsverwaltung von { this.state.name }</h2>
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