//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown';
//#endregion

import * as Globals from '../../Globals';
//#endregion


class EventCreator extends React.Component {

    constructor(props) {
        super(props);
        this.departmentID = this.props.departmentID;
        this.locations = undefined;
        this.state = {
            date: '',
            dateError: false,
            locations: [],
            location: '',
            locationError: false,
            maxGroups: 1,
            currentGroupSize: '',
            groupError: false
        };
    }


    /* Get all display information on startup */
    componentDidMount() {
        this.InitLocations();
    }

    /* Get all locations */
    InitLocations() {
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
			this.props.Logout();

        axios.get(Globals.BASE_PATH + 'departments/' + this.departmentID + '/locations?authToken=' + authToken)
        .then(response => {
            this.locations = response.data;
            let locations = [];
            response.data.map(location => {
                locations.push(location.NAME);
            })
            this.setState({ locations: locations });
            console.log(this.state.locations);
        })
		.catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
    }

    /* Get the max group size available for the choosen location */
    InitGroupSize() {
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
			this.props.Logout();

        axios.get(Globals.BASE_PATH + 'groups/' + this.departmentID + '/' + this.locationID + '?count=true&authToken=' + authToken)
        .then(response => this.setState({ maxGroups: response.data[0].count }))
		.catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
    }

    /* Check the input and create a event */
    CreateEvent() {
        let location = this.checkLocation();
        let date = this.handleDateLeave();
        let group = this.checkGroupSize();

        if (location && date && group) {
            axios.post(Globals.BASE_PATH + 'departments/' + this.departmentID + '/events', {
                date: this.state.date,
                locations_id: this.locationID,
                departments_id: this.departmentID,
                groupSize: this.state.currentGroupSize
            }).then(response => this.props.CloseEventCreator(true))
            .catch(error => console.log(error));
        }
    }

    handleDateChange(event) {
        this.setState({
            date: event.target.value,
            dateError: false
        });
    }

    handleDateLeave() {
        if (this.state.date.length !== 10) {
            this.setState({
                dateError: true
            });
            return false;
        }
        return true;
    }

    handleGroupSizeChange(event) {
        if (event.value > 0 && event.value <= this.state.maxGroups) {
            this.setState({
                currentGroupSize: event.value,
                groupError: false
            });
        } else {
            this.setState({
                currentGroupSize: '',
                groupError: true
            });
        }
    }
    checkGroupSize() {
        if (this.state.currentGroupSize <= 0 || this.state.currentGroupSize > this.state.maxGroups) {
            this.setState({ groupError: true });
            return false;
        }
        return true;
    }

    handleLocationChange(location) {
        let locations = [];
        this.locations.map(loc => {
            locations.push(loc.NAME);
            return null;
        });

        if (locations.indexOf(location.value) === -1) {
            this.setState({
                location: '',
                locationError: false
            });
            this.initLocations();
        } else {
            this.setState({
                location: location.value,
                locationError: false
            });
            this.locations.map(loc => {
                if (loc.NAME === location.value) {
                    this.locationID = loc.ID;
                }
            });
        }
    }

    checkLocation() {
        if (this.state.location === '') {
            this.setState({
                locationError: true
            });
            return false;
        }
        return true;
    }

    GetGroupSizes() {
        if (this.locationID !== -1) {
            let values = [];
            for(let i = 1; i <= this.state.maxGroups; i++) {
                values.push(i);
            }
            return (
                <div className={ (this.state.groupError) ? 'form-group dropdown-error' : 'form-group' }>
                    <label>Gruppenanzahl<span className="label-information"></span></label>
                    <Dropdown options={ values } onChange={ (event) => this.handleGroupSizeChange(event) } value={ this.state.currentGroupSize.toString() } placeholder="Gruppenanzahl wählen" />
                </div>
            );
        }
    }


    render() {
        return (
            <div className="add-event">
                <h4 className="form-header">Schnuppertag erstellen</h4>
                <div className="well">
                <div className="form-group">
                    <label>Datum</label>
                    <input type="text" className={ (this.state.dateError) ? 'form-control form-error' : 'form-control' } placeholder="YYYY-MM-DD" value={ this.state.date } onChange={ (event) => this.handleDateChange(event) } onBlur={ () => this.handleDateLeave() }/>
                </div>
                <div className={ (this.state.locationError) ? 'form-group dropdown-error' : 'form-group' }>
                    <label>Standort<span className="label-information"> - Wählen Sie einen Standort aus.</span></label>
                    <Dropdown options={ this.state.locations } onChange={ (event) => this.handleLocationChange(event) } value={ this.state.location } placeholder="Standort auswählen" />
                </div>
                { this.GetGroupSizes() }
                <button className="btn btn-primary center-block" onClick={ () => this.CreateEvent() } >Hinzufügen</button>
                </div>
            </div>
        );
    }

}

export default EventCreator;