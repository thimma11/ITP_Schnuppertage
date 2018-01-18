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
            location: -1,
            locations: [],
            maxGroups: 1,
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

    /* Get the max group size available for the choosen location */
    InitGroupSize() {
        //#region Delete this later...
        this.setState({ maxGroups: 2 });
        //#endregion

        /* Server Request
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
			this.props.Logout();

        axios.get(Globals.BASE_PATH + 'departments/' + this.departmentID + '/locations/' + this.state.location + '?maxGroups=true', {
            headers: { Authorization: authToken }
		}).then(response => this.setState({ maxGroups: response.data.maxGroups }))
		.catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
        */
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
            location: this.state.location,
            groupSize: this.state.currentGroupSize
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
        this.InitGroupSize();
    }

    ChangeGroupSize(event) {
        this.setState({ currentGroupSize: event.target.value });
    }

    /* Display a error message if available */
    GetErrorMessage() {
        if (this.state.errorMessage !== '')
            return <p>{ this.state.errorMessage }</p>;
    }

    GetGroupSizes() {
        if (this.state.location !== -1) {
            return (
                <div>
                    <div><label>Gruppenanzahl: <b>{ this.state.currentGroupSize }</b></label></div>
                    <input type='range' min='1' max={ this.state.maxGroups } value={ this.state.currentGroupSize } onChange={ (e) => this.ChangeGroupSize(e) } />
                </div>
            );
        }
    }

    GetCreateButton() {
        if (this.state.location !== -1) {
            return <button onClick={ () => this.CreateEvent() } >Hinzufügen</button>;
        } else {
            return <button disabled >Hinzufügen</button>;
        }
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
                        <option value={ -1 }>Nichts ausgewählt</option>
                    {
                        this.state.locations.map(location => {
                            return <option key={location.id} value={location.id} >{ location.name }</option>;
                        })
                    }
                    </select>
                </div>
                { this.GetGroupSizes() }
                { this.GetErrorMessage() }
                <button onClick={ () => this.props.CloseEventCreator(false) }>Abbrechen</button>
                { this.GetCreateButton() }
            </div>
        );
    }

}

export default EventCreator;