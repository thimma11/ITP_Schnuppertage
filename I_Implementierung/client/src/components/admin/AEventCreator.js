//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
//#endregion

import * as Globals from '../../Globals';
//#endregion


class EventCreator extends React.Component {

    constructor(props) {
        super(props);
        this.departmentID = this.props.departmentID;
        this.state = {
            date: '',
            location: 0,
            locations: [],
            timetable: 0,
            timetables: [],
            errorMessage: ''
        };
    }


    /* Get all display information on startup */
    componentDidMount() {
        this.InitLocations();
        this.InitTimetables();
    }

    /* Get all locations */
    InitLocations() {
        //#region Delete this later...
        this.setState({
            locations: [
                { id: 0, name: 'Zwettl' },
                { id: 1, name: 'Krems' }
            ]
        });
        //#endregion

        //#region Server Request
        /*
        axios.get(Globals.BASE_PATH + 'locations')
        .then(response => this.setState({ locations: response.data }))
        .catch(error => console.log(error));
        */
        //#endregion
    }

    /* Get all timetables */
    InitTimetables() {
        this.setState({
            timetables: [
                { id: 0, name: 'Standart' },
                { id: 1, name: 'Lehrer fehlt' },
                { id: 2, name: 'Costum Timetable' }
            ]
        });

        //#region Server Request
        /*
        axios.get(Globals.BASE_PATH + 'departments/' + this.departmentID + '/timetableSelections')
        .then(response => this.setState({ timetables: response.data }))
        .catch(error => console.log(error));
        */
        //#endregion
    }

    /* Check the input and create a event */
    CreateEvent() {
        if (this.state.date === '') {
            this.setState({ errorMessage: 'Geben Sie bitte ein Datum an.' });
            return null;
        }
        if (this.state.location === '') {
            this.setState({ errorMessage: 'Sie müssen einen Standort auswählen.' });
            return null;
        }
        if (this.state.timetable === '') {
            this.setState({ errorMessage: 'Sie müssen einen Stundenplan auswählen.' });
            return null;
        }
        this.props.CloseEventCreator(true);
        
        //#region Server Request
        /*
        axios.post(Globals.BASE_PATH + 'departments/' + this.departmentID + '/events', {
            date: this.state.date,
            location: this.state.location,
            timetable: this.state.timetable
        }).then(response => this.props.CloseEventCreator(true))
        .catch(error => console.log(error));
        */
        //#endregion
    }

    /* Handle date change */
    ChangeDate(event) {
        this.setState({
            date: event.target.value,
            errorMessage: ''
        });
    }

    /* Handle location change */
    ChangeLocation(event) {
        this.setState({
            location: parseInt(event.target.value, 10),
            errorMessage: ''
        });
    }

    /* Handle timetable change */
    ChangeTimetable(event) {
        this.setState({
            timetable: parseInt(event.target.value, 10),
            errorMessage: ''
        });
    }

    /* Display a error message if available */
    GetErrorMessage() {
        if (this.state.errorMessage !== '')
            return <p>{ this.state.errorMessage }</p>;
    }


    render() {
        return (
            <div>
                <h4>Schnuppertagerstellung</h4>
                <div>
                    <label>Datum:</label>
                    <input type='date' value={ this.state.date } onChange={ (e) => this.ChangeDate(e) } />
                </div>
                <div>
                    <label>Standort:</label>
                    <select value={ this.state.location } onChange={ (e) => this.ChangeLocation(e) } >
                    {
                        this.state.locations.map(location => {
                            return <option value={location.id} >{ location.name }</option>;
                        })
                    }
                    </select>
                </div>
                <div>
                    <label>Stundenplan:</label>
                    <select value={ this.state.timetable } onChange={ (e) => this.ChangeTimetable(e) } >
                    {
                        this.state.timetables.map(timetable => {
                            return <option value={timetable.id} >{ timetable.name }</option>;
                        })
                    }
                    </select>
                </div>
                { this.GetErrorMessage() }
                <button onClick={ () => this.props.CloseEventCreator(false) }>Abbrechen</button>
                <button onClick={ () => this.CreateEvent() }>Hinzufügen</button>
            </div>
        );
    }

}

export default EventCreator;