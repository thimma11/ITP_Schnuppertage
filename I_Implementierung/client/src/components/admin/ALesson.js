//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
//#endregion

import * as Globals from '../../Globals';
//#endregion


class Lesson extends React.Component {

    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.teachers = this.props.teachers;
        this.subjects = this.props.subjects;
        this.state = {
            start: undefined,
            end: undefined,
            teacher: undefined,
            subject: undefined
        };
    }


    componentDidMount() {
        this.InitLesson();
        this.InitTeachers();
        this.InitSubjects();
    }

    InitLesson() {
        //#region Delete this later...
        this.setState({
            start: '07:50',
            end: '08:30',
            teacher: 0,
            subject: 2
        });
        //#endregion

        /* Server Request
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
			this.props.Logout();
        axios.get(Globals.BASE_PATH + 'lessons/' + this.id, {
            headers: { Authorization: authToken }
		}).then(response => {
            this.setState({
                start: response.data.starttime,
                end: response.data.endtime,
                teacher: response.data.teachers_id,
                subject: response.data.subjects_id
            });
        }).catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
        */
    }


    render() {
        return(
            <tr>
                <td>
                    <input value={ this.state.start } onChange={ (e) => this.ChangeStart(e) } />
                </td>
                <td>
                    <input value={ this.state.end } onChange={ (e) => this.ChangeEnd(e) } />
                </td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        );
    }

}

export default Lesson;