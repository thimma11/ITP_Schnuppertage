//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
//#endregion

import * as Globals from '../../Globals';
import Lesson from './ALesson';
//#endregion


class DayTable extends React.Component {

    constructor(props) {
        super(props);
        this.groupID = this.props.groupID;
        this.selectedDay = this.props.selectedDay;
        this.state = {
            lessons: undefined
        };
    }


    componentDidMount() {
        this.InitLessons();
    }

    InitLessons() {
        //#region Delete this later...
        this.setState({ lessons: [
            { id: 0 },
            { id: 2 },
            { id: 3 },
            { id: 4 }
        ]});
        //#endregion

        /* Server Request
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
			this.props.Logout();
        axios.get(Globals.BASE_PATH + 'groups/' + this.groupID + '/lessons?day=' + this.selectedDay, {
            headers: { Authorization: authToken }
		}).then(response => this.setState({ lessons: response.data.lessons }))
		.catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
        */
    }

    InitTeachers() {
        //#region Delete this later...
        this.teachers = [
            { id: 0, contraction: 'MACO' },
            { id: 1, contraction: 'WIEN' },
            { id: 2, contraction: 'WENZ' }
        ];
        //#endregion

        /* Server Request
		let authToken;
        if (authToken = this.props.GetCookie() === undefined)
			this.props.Logout();

        axios.get(Globals.BASE_PATH + 'teachers', {
            headers: { Authorization: authToken }
		}).then(response => this.teachers = response.data.teachers )
		.catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
        */
    }

    InitSubjects() {
        //#region Delete this later...
        this.subjects = [
            { id: 0, name: 'INSY' },
            { id: 1, name: 'SYTI' },
            { id: 2, name: 'SYTS' }
        ];
        //#endregion

        /* Server Request
		let authToken;
        if (authToken = this.props.GetCookie() === undefined)
			this.props.Logout();

        axios.get(Globals.BASE_PATH + 'subjects', {
            headers: { Authorization: authToken }
		}).then(response => this.subjects = response.data.subjects )
		.catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
        */
    }


    render() {
        if (this.state.lessons === undefined)
            return 'Loading lessons...';
        return(
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Startzeit</th>
                            <th>Endzeit</th>
                            <th>Lehrer</th>
                            <th>Fach</th>
                            <th>Aktionen</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.lessons.map(lesson => {
                            <Lesson key={ lesson.id } id={ lesson.id } teachers={ this.teachers } subjects={ this.subjects } />
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }

}

export default DayTable;