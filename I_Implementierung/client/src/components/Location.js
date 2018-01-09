//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
//#endregion

import Registration from './Registration';
import * as Globals from '../Globals';
//#endregion


class Location extends React.Component {

    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.state = {
            name: '',
            events: undefined,
            eventID: -1,
            selectedDate: moment()
        };

        this.OpenRegister = this.OpenRegister.bind(this);
        this.CloseRegister = this.CloseRegister.bind(this);
    }


    /* Get all display information */
    componentDidMount() {
        this.InitEvents();
    }

    /* Get all events for this location */
    InitEvents() {
        //#region Delete this later...
        this.setState({
            name: 'Zwettl',
            events: [
                { id: 0, date: "2018-01-13"},
                { id: 1, date: "2018-02-02"},
                { id: 2, date: "2018-01-17"}
            ]
        });
        //#endregion
        
        /* Server Request
        axios.get(Globals.BASE_PATH + 'locations/' + this.id)
        .then(response => this.setState({ name: response.data.name }))
        .catch(error => console.log(error));
        axios.get(Globals.BASE_PATH + 'departments/' + this.departmentID + '/locations/' + this.id + '?status=OPEN')
        .then(response => this.setState({ events: response.data.events }))
        .catch(error => console.log(error)); */
    }
    
    /* Open the register component if a event exists on the selected day */
    OpenRegister(moment) {
        this.setState({ selectedDate: moment });
        let date = moment.utc(1).toISOString().split('T')[0];
        let events = this.state.events.filter(event => event.date === date);
        if (events.length === 1)
            this.setState({ eventID: events[0].id });
        else 
            this.setState({ eventID: -1 });
    }

    /* Cancel a registration */
    CloseRegister() {
        this.setState({
            selectedDate: undefined,
            eventID: -1
        });
    }

    /* If a valid event is selected show the register form */
    GetRegister() {
        if (this.state.selectedDate !== undefined) {
            if (this.state.eventID < 0)
                return 'Kein Schnuppertag an dem ausgewählten Tag verfügbar.';
            else
                return <Registration key={ this.state.eventID } eventID={ this.state.eventID } CloseRegister={ this.CloseRegister } />;
        }
    }

    /* Render events if available */
    GetEvents() {
        if (this.state.events === undefined)
            return 'Loading events...';
        else {
            let dates = [];
            this.state.events.map(event => dates.push(moment(event.date, 'YYYY-MM-DD')));
            return (
                <div>
                    <DatePicker
                        selected={ this.state.selectedDate }
                        onChange={ this.OpenRegister }
                        highlightDates={ dates }
                        placeholderText='Wählen Sie ein Datum' />
                    { this.GetRegister() }
                </div>
            );
        }
    }


    render() {
        return (
            <div>
                <h3>Schnuppertage für { this.state.name }</h3>
                { this.GetEvents() }
                <button onClick={ () => this.props.CloseLocation() } >Zurück zur Standortauswahl</button>
            </div>
        );
    }

}

export default Location;