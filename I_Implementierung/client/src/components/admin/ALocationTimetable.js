//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
//#endregion

import DayTimetable from './ADayTimetable';
import * as Globals from '../../Globals';
//#endregion


class LocationTimetable extends React.Component {

	constructor(props) {
		super(props);
		this.id = this.props.id;
		this.departmentID = this.props.departmentID;
		this.state = {
			timetables: undefined,
			viewDay: undefined
		};
	}


	/* Get all timetables for every day */
	componentDidMount() {
		this.InitAll();
	}

	InitAll() {
		//#region Delete this later...
		this.setState({
			location: 'Zwettl',
			timetables: {
				monday: [
					{ id: 0, start: '08:00', end: '08:30', teacher: 'MACO', subject: 'INSY' },
					{ id: 1, start: '08:30', end: '08:40', teacher: 'WIEN', subject: 'TALK' }
				],
				tuesday: [
					{ id: 0, start: '08:00', end: '08:30', teacher: 'MACO', subject: 'INSY' },
					{ id: 1, start: '08:30', end: '08:40', teacher: 'WIEN', subject: 'TALK' }
				],
				wednesday: [
					{ id: 0, start: '08:00', end: '08:30', teacher: 'MACO', subject: 'INSY' },
					{ id: 1, start: '08:30', end: '08:40', teacher: 'WIEN', subject: 'TALK' }
				],
				thursday: [
					{ id: 0, start: '08:00', end: '08:30', teacher: 'MACO', subject: 'INSY' },
					{ id: 1, start: '08:30', end: '08:40', teacher: 'WIEN', subject: 'TALK' }
				],
				friday: [
					{ id: 0, start: '08:00', end: '08:30', teacher: 'MACO', subject: 'INSY' },
					{ id: 1, start: '08:30', end: '08:40', teacher: 'WIEN', subject: 'TALK' }
				]
			}
		});
		//#endregion

		/* Server Request
		let authToken;
        if (authToken = this.props.GetCookie() === undefined)
			this.props.Logout();
			
		axios.get(Globals.BASE_PATH + 'departments/' + this.departmentID +'/locations/' + this.id + '/timetables', {
            headers: { Authorization: authToken }
		}).then(response => this.setState({ timetables: response.data.timetables }))
		.catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
		*/
	}

	ShowDay(day) {
		this.setState({ viewDay: day });
	}

	GetSelectedDay() {
		if (this.state.viewDay !== undefined)
			return <DayTimetable locationID={ this.id } departmentID={ this.departmentID } timetable={ this.state.timetables[this.state.viewDay] } />;
	}


    render(){
		return (
			<div>
				<h3>Stundenpläne für den Standort { this.state.location }</h3>
				<div>
					<button onClick={ () => this.ShowDay('monday') } >Montag</button>
					<button onClick={ () => this.ShowDay('tuesday') } >Dienstag</button>
					<button onClick={ () => this.ShowDay('wednesday') } >Mittwoch</button>
					<button onClick={ () => this.ShowDay('thursday') } >Donnerstag</button>
					<button onClick={ () => this.ShowDay('friday') } >Freitag</button>
				</div>
				{ this.GetSelectedDay() }
			</div>
		);
    }

}

export default LocationTimetable;