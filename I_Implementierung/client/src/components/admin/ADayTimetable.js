//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
//#endregion

import * as Globals from '../../Globals';
//#endregion


class DayTimetable extends React.Component {

	constructor(props) {
		super(props);
		this.locationID = this.props.locationID;
		this.departmentID = this.props.departmentID;
		this.state = { timetable: this.props.timetable };
	}


    render(){
		return (
			<div>
                <table>
                    <thead>
                        <tr>
                            <th>Start</th>
                            <th>Ende</th>
                            <th>Lehrer</th>
                            <th>Fach</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.timetable.map(block => {
                            return (
                                <tr key={ block.id }>
                                    <td>{ block.start }</td>
                                    <td>{ block.end }</td>
                                    <td>{ block.teacher }</td>
                                    <td>{ block.subject }</td>
                                </tr>
                            );
                        })
                        }
                        </tbody>
                    </table>
                </div>
		);
    }

}

export default DayTimetable;