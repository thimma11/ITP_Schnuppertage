//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
//#endregion

import EventCreator from './AEventCreator';
import LocationTimetable from './ALocationTimetable';
import * as Globals from '../../Globals';
//#endregion


class Department extends React.Component {

    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.state = {
            name: '',
            events: [],
            locations: [],
            createEvent: false,
            selectedLocation: -1,
            showCostumTimetables: false
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
                    start: '10:20',
                    end: '16:20',
                    location: 'Zwettl',
                    timetable: 'Standart'
                },
                {
                    id: 2,
                    date: '2018-01-12',
                    start: '08:50',
                    end: '13:40',
                    location: 'Krems',
                    timetable: 'Standart'
                },
                {
                    id: 1,
                    date: '2018-02-01',
                    start: '09:00',
                    end: '15:55',
                    location: 'Zwettl',
                    timetable: 'CostumTimetable1'
                }
            ],
            locations: [
                { id: 0, name: 'Zwettl' },
                { id: 1, name: 'Krems' }
            ]
        });
        //#endregion

        /* Server Request
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
            this.props.Logout();
        
        axios.get(Globals.BASE_PATH + 'department?detailed=true', {
            headers: { Authorization: authToken }
        }).then(response => {
            this.setState({
                name: response.data.name,
                events: response.data.events,
                locations: response.data.locations
            });
        }).catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        })
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

    /* Change selected location */
    OpenLocation(id) {
        this.setState({ selectedLocation: id });
    }

    /* Close selected location */
    CloseLocation() {
        this.setState({ selectedLocation: -1 });
    }

    /* Set variable showCostumTimetables to 'true' */
    ShowCostumTimetables() {
        this.setState({ showCostumTimetables: true });
    }

    /* Set variable showCostumTimetables to 'false' */
    CloseCostumTimetables() {
        this.setState({ showCostumTimetables: false });
    }

    GetTimetables() {
        if (this.state.selectedLocation < 0) {
            return (
                <div>
                    <h3>Stundenpläne</h3>
                    {
                    this.state.locations.map(location => {
                        return <button key={location.id} onClick={ () => this.OpenLocation(location.id) } >{ location.name }</button>;
                    })
                    }
                    <button onClick={ () => this.ShowCostumTimetables } >Benutzerdefinierte</button>
                </div>
            );
        } else {
            return (
                <div>
                    <LocationTimetable id={ this.state.selectedLocation } departmentID={ this.id } />
                    <button onClick={ () => this.CloseLocation() } >Zur Standortauswahl</button>
                </div>
            );
        }
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
                                <th>Start</th>
                                <th>Ende</th>
                                <th>Standort</th>
                                <th>Stundenplan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            this.state.events.map(event => {
                                return (
                                    <tr key={ event.id }>
                                        <td>{ event.date }</td>
                                        <td>{ event.start }</td>
                                        <td>{ event.end }</td>
                                        <td>{ event.location }</td>
                                        <td>{ event.timetable }</td>
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
                { this.GetTimetables() }
                <div>
                    <h3>Schnuppertage</h3>
                    { this.GetEvents() }
                </div>
            </div>
        );
    }

}

export default Department;