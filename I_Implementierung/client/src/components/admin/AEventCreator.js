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
            maxGroups: 0,
            currentGroupSize: 1,
            errorMessage: ''
        };
    }


    /* Get all display information on startup */
    componentDidMount() {
        this.InitLocations();
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
        this.props.CloseEventCreator(true);
        
        //#region Server Request
        /*
        axios.post(Globals.BASE_PATH + 'departments/' + this.departmentID + '/events', {
            date: this.state.date,
            location: this.state.location
        }).then(response => this.props.CloseEventCreator(true))
        .catch(error => console.log(error));
        */
        //#endregion
    }

    ChangeDate(event) {
        this.setState({
            date: event.target.value,
            errorMessage: ''
        });
    }

    ChangeLocation(event) {
        this.setState({
            location: parseInt(event.target.value, 10),
            maxGroups: 2,
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
                    <label>Gruppen:</label>
                    <input type='range' min='1' max={ this.state.currentGroupSize } onChange={ (e) => this.ChangeLocation(e) } />
                </div>
                { this.GetErrorMessage() }
                <button onClick={ () => this.props.CloseEventCreator(false) }>Abbrechen</button>
                <button onClick={ () => this.CreateEvent() }>Hinzufügen</button>
            </div>
        );
    }

}

export default EventCreator;