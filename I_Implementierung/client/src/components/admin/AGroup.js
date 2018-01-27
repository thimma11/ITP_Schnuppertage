//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
//#endregion

import * as Globals from '../../Globals';
import DayTable from './ADayTable';
import { BASE_PATH } from '../../Globals';
//#endregion


class Group extends React.Component {

    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.state = {
            days: undefined,
            selectedDay: undefined
        }
    }


    componentDidMount() {
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
			this.props.Logout();

        axios.get(Globals.BASE_PATH + 'groups/' + this.id + '/daytables?authToken')
        .then(response => this.setState({ days: response.data }))
        .catch(error => {
            if (error.response.status === 401)
                this.Logout();
            else
                console.log(error)
        });
    }

    ChangeSelectedDay(day) {
        this.setState({ selectedDay: day });
    }

    GetSelectedDay() {
        if (this.state.selectedDay === undefined)
            return <p>Keinen Tag ausgewählt</p>;
        else
            return <DayTable groupID={ this.id } selectedDay={ this.state.selectedDay } />;
    }

    RemoveGroup() {
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
			this.props.Logout();

        axios.delete(Globals.BASE_PATH + 'groups/' + this.id + '?authToken')
        .then(response => this.props.UpdateGroup )
		.catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
    }


    render() {
        if (this.state.days === undefined) {
            return 'Loading day...';
        }
        return(
            <div>
                <button onClick={ () => this.RemoveGroup() } >Gruppe entfernen</button>
                <div>
                {
                    this.state.days.map(day => {
                        return <button key={ day.ID } onClick={ () => this.ChangeSelectedDay(day.ID) } >{ day.DAY_NAME }</button>;
                    })
                }
                </div>
                { this.GetSelectedDay() }
            </div>
        );
    }

}

export default Group;