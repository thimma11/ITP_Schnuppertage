import React from 'react';
import axios from 'axios';
import EventCreator from './EventCreator';
import * as Globals from '../../Globals';


class Department extends React.Component {

    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.state = {
            name: '',
            events: [],
            createEvent: false,
            locations: [],
            selectedLocation: undefined,
            selectedDay: '',
            editTimetable: false
        };
    }


    /* Get all display information on startup */
    componentDidMount() {
        this.InitDepartment();
    }

    /* Get all department information */
    InitDepartment() {
        //#region Test Data
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
                {
                    id: 0,
                    name: 'Zwettl',
                    timetables: [
                        {
                            monday: [
                                { start: '08:00', end: '08:30', teacher: 'WENZ', subject: 'SEW' },
                                { start: '08:30', end: '08:40', teacher: 'WIEN', subject: 'TALK' },
                                { start: '08:40', end: '09:20', teacher: 'MACO', subject: 'INSY' }
                            ],
                            tuesday: [
                                { start: '07:50', end: '08:15', teacher: 'HAUP', subject: 'SYTI' },
                                { start: '08:15', end: '09:00', teacher: 'WENZ', subject: 'SEW' }
                            ],
                            wednesday: [
                                { start: '10:10', end: '10:35', teacher: 'HOET', subject: 'SYTS' },
                                { start: '10:35', end: '11:00', teacher: 'MACO', subject: 'SEW' },
                                { start: '11:00', end: '11:20', teacher: 'WIEN', subject: 'TALK' }
                            ],
                            thursday: [
                                { start: '09:25', end: '10:00', teacher: 'PAHN', subject: 'SYTD' },
                                { start: '10:00', end: '10:25', teacher: 'PAHN', subject: 'INSY' },
                                { start: '10:25', end: '10:35', teacher: 'WIEN', subject: 'TALK' },
                                { start: '10:35', end: '11:05', teacher: 'HAUP', subject: 'SYTS' }
                            ],
                            friday: [
                                { start: '08:45', end: '09:30', teacher: 'WENZ', subject: 'SEW' },
                                { start: '09:30', end: '09:45', teacher: 'WIEN', subject: 'TALK' }
                            ]
                        },
                        {
                            monday: [
                                { start: '08:00', end: '08:40', teacher: 'MACO', subject: 'INSY' },
                                { start: '08:40', end: '08:50', teacher: 'WIEN', subject: 'TALK' },
                                { start: '08:50', end: '09:20', teacher: 'WENZ', subject: 'SEW' }
                            ],
                            tuesday: [
                                { start: '07:50', end: '08:15', teacher: 'WENZ', subject: 'SEW' },
                                { start: '08:15', end: '09:00', teacher: 'HAUP', subject: 'SYTI' }
                            ],
                            wednesday: [
                                { start: '10:10', end: '10:35', teacher: 'MACO', subject: 'SEW' },
                                { start: '10:35', end: '11:00', teacher: 'HOET', subject: 'SYTS' },
                                { start: '11:00', end: '11:20', teacher: 'WIEN', subject: 'TALK' }
                            ],
                            thursday: [
                                { start: '09:25', end: '10:00', teacher: 'PAHN', subject: 'INSY' },
                                { start: '10:00', end: '10:25', teacher: 'PAHN', subject: 'SYTD' },
                                { start: '10:25', end: '10:55', teacher: 'HOET', subject: 'SYTS' },
                                { start: '10:55', end: '11:05', teacher: 'WIEN', subject: 'TALK' }
                            ],
                            friday: [
                                { start: '08:45', end: '09:00', teacher: 'WIEN', subject: 'TALK' },
                                { start: '09:00', end: '09:45', teacher: 'BIRN', subject: 'SEW' }
                            ]
                        }
                    ]
                },
                {
                    id: 1,
                    name: 'Krems',
                    timetables: [
                        {
                            monday: [],
                            tuesday: [],
                            wednesday: [],
                            thursday: [],
                            friday: []
                        }
                    ]
                }
            ],
            selectedDay: 'monday'
        });
        //#endregion
        
        //#region Server Request
        /*
        axios.get(Globals.BASE_PATH + 'departments/' + this.id, {
            headers: {
                Authorization: this.props.GetCookie()
            }
        }).then(response => {
            this.setState({
                name: response.data.name,
                events: response.data.events,
                locations: response.data.locations
            });
        }).catch(error => this.props.SendLogoutRequest());
        */
        //#endregion
    }

    /* Get all events */
    InitEvents() {
        this.setState({
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
                },
                {
                    id: 3,
                    date: '2018-02-10',
                    start: '07:55',
                    end: '12:45',
                    location: 'Zwettl',
                    timetable: 'Standart'
                }
            ]
        });

        //#region Server Request
        /*
        axios.get(Globals.BASE_PATH + 'departments/' + this.id + '/events?detailed=true', {
            headers: {
                Authorization: this.props.GetCookie()
            }
        }).then(response => {
            this.setState({
                events: response.data
            });
        }).catch(error => this.props.SendLogoutRequest());
        */
        //#endregion
    }

    /* Set variable createEvent to 'true' */
    OpenEventCreator() {
        this.setState({ createEvent:  true });
    }

    /* Set variable createEvent to 'false' */
    CloseEventCreator(refresh) {
        this.setState({ createEvent:  false });
        if (refresh)
            this.InitEvents();
    }

    /* Set variable editTimetable to 'true' */
    OpenEditTimetable() {
        this.setState({ editTimetable: true });
    }

    /* Set variable editTimetable to 'false' */
    CloseEditTimetable() {
        this.setState({ editTimetable: false });
    }

    /* Change selected location */
    ChangeSelectedLocation(location) {
        this.setState({ selectedLocation: location });
    }

    /* Reset selected location */
    ResetSelectedLocation() {
        this.setState({ selectedLocation: undefined });
    }

    /* Change selected day */
    ChangeSelectedDay(day) {
        this.setState({ selectedDay: day });
    }

    /* Return timetables for the selected location */
    GetLocationTimetables() {
        if (this.state.selectedLocation !== undefined) {
            return (
                <div>
                {
                    this.state.locations.map(location => {
                        if (location.id === this.state.selectedLocation) {
                            return (
                                location.timetables.map((timetable, index) => {
                                    return (
                                        <div key={ index } >
                                            <h4>Gruppe { index + 1 }</h4>
                                            <div>
                                                <label><u>Montag</u></label>
                                                {
                                                    timetable.monday.map((block, index) => {
                                                        return <p key={index} >{ block.start } - { block.end }: { block.subject } - { block.teacher }</p>;
                                                    })
                                                }
                                            </div>
                                            <div>
                                                <label><u>Dienstag</u></label>
                                                {
                                                    timetable.tuesday.map((block, index) => {
                                                        return <p key={index} >{ block.start } - { block.end }: { block.subject } - { block.teacher }</p>;
                                                    })
                                                }
                                            </div>
                                            <div>
                                                <label><u>Mittwoch</u></label>
                                                {
                                                    timetable.wednesday.map((block, index) => {
                                                        return <p key={index} >{ block.start } - { block.end }: { block.subject } - { block.teacher }</p>;
                                                    })
                                                }
                                            </div>
                                            <div>
                                                <label><u>Donnerstag</u></label>
                                                {
                                                    timetable.thursday.map((block, index) => {
                                                        return <p key={index} >{ block.start } - { block.end }: { block.subject } - { block.teacher }</p>;
                                                    })
                                                }
                                            </div>
                                            <div>
                                                <label><u>Freitag</u></label>
                                                {
                                                    timetable.friday.map((block, index) => {
                                                        return <p key={index} >{ block.start } - { block.end }: { block.subject } - { block.teacher }</p>;
                                                    })
                                                }
                                            </div>
                                        </div>
                                    );
                                })
                            );
                        }
                    })
                }
                    <button onClick={ () => this.ResetSelectedLocation() } >Standortauswahl</button>
                </div>
            );
        } else {
            return (
                <div>
                {
                    this.state.locations.map(location => {
                        return (
                            <div key={ location.id } >
                                <button onClick={ () => this.ChangeSelectedLocation(location.id) }>Stundenpläne für { location.name }</button>
                            </div>
                        );
                    })
                }
                </div>
            );
        }
    }

    /* Returns the Show Timetables Button or shows the timetables */
    GetTimetables() {
        return (
            <div>
                <h3>Stundenpläne</h3>
                { this.GetLocationTimetables() }
            </div>
        );
    }

    /* Returns the Create Event Button or shows the form */
    GetEventCreator() {
        if (this.state.createEvent)
            return <EventCreator CloseEventCreator={ this.CloseEventCreator.bind(this) } departmentID={ this.id } />;
        else
            return <button onClick={ () => this.OpenEventCreator() } >Schnuppertag erstellen</button>;
    }


    render() {
        return (
            <div>
                <h2>Abteilungsverwaltung von { this.state.name }</h2>
                { this.GetTimetables() }
                <div>
                    <h3>Schnuppertage</h3>
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
            </div>
        );
    }

}

export default Department;