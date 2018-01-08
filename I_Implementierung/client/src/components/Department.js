import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import axios from 'axios';
import Registration from './Registration';
import * as Globals from '../Globals';


class Department extends React.Component {

    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.eventID = undefined;
        this.state = {
            name: this.props.name,
            selectedDate: undefined,
            openEvents: [],
            closedEvents: [],
            registered: false
        };
    }


    /* Initialize startup */
    componentDidMount() {
        this.InitEvents();
    }

    /* Get all events for this department */
    InitEvents() {
        //#region Test Data
        let events = [
            { date: '2018-01-08', status: 'REGISTER'},
            { date: '2018-02-01', status: 'CLOSED'},
            { date: '2018-01-18', status: 'CLOSED'},
            { date: '2018-01-10', status: 'CLOSED'}
        ];
        let openEvents = [];
        let closedEvents = [];
        events.map(event => {
            if (event.status === 'REGISTER')
                openEvents.push(moment(event.date, 'YYYY-MM-DD'));
            else if (event.status === 'CLOSED')
                closedEvents.push(moment(event.date, 'YYYY-MM-DD'));
            return null;
        });
        this.setState({
            openEvents: openEvents,
            closedEvents: closedEvents
        });
        //#endregion

        //#region Server Request
        /*
        axios.get(Globals.BASE_PATH + 'departments/' + this.id + '/events')
        .then(response => {
            let events = response.data;
            let openEvents = [];
            let closedEvents = [];
            events.map(event => {
                if (event.status === 'REGISTER')
                    openEvents.push(moment(event.date, 'YYYY-MM-DD'));
                else if (event.status === 'CLOSED')
                    closedEvents.push(moment(event.date, 'YYYY-MM-DD'));
                return null;
            });
            this.setState({
                openEvents: openEvents,
                closedEvents: closedEvents
            });
        }).catch(error => console.log(error));
        */
        //#endregion
    }

    /* Open the register component if a event exists on the selected day */
    OpenRegister(moment) {
        //#region Test Data
        this.setState({
            selectedDate: moment,
            registered: false
        });
        if (this.eventID === undefined)
            this.eventID = 1;
        else
            this.eventID = this.eventID + 1;
        //#endregion

        //#region Server Request
        /*
        let date = moment.utc(1).toISOString().split('T')[0];
        this.setState({
            selectedDate: moment,
            registered: false
        });
        axios.get(Globals.BASE_PATH + 'departments/' + this.id + '/event?date=' + date)
        .then(response => this.eventID = response.data.id)
        .catch(error => console.log(error));
        */
        //#endregion
    }

    CloseRegister() {
        this.setState({
            selectedDate: undefined,
            registered: true
        });
        this.eventID = undefined;
    }

    /* If a valid event is selected show the register form */
    GetRegister() {
        if (this.eventID !== undefined) {
            let date = this.state.selectedDate.utc(1).toISOString().split('T')[0];
            return <Registration key={ this.eventID } eventID={ this.eventID } date={ date } CloseRegister={ this.CloseRegister.bind(this) } />;
        }
        if (this.eventID === undefined && this.state.selectedDate !== undefined)
            return <p>Keine Schnuppertage für dieses Datum gefunden.</p>
        if (this.state.registered)
            return <p>Sie haben sich eingetragen.</p>;
    }


    render() {
        return (
            <div>
                <h2>Schnuppertage für { this.state.name }</h2>
                <DatePicker
                    selected={ this.state.selectedDate }
                    onChange={ this.OpenRegister.bind(this) }
                    highlightDates={ [
                        { 'react-datepicker__day--highlighted-custom-1': this.state.openEvents },
                        { 'react-datepicker__day--highlighted-custom-2': this.state.closedEvents }
                    ] }
                    placeholderText='Wählen Sie ein Datum' />
                { this.GetRegister() }
            </div>
        );
    }

}

export default Department;