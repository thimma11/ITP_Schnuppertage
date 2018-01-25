//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
//#endregion

import Group from './AGroup';
import GroupAdder from './AGroupAdder';
import * as Globals from '../../Globals';
import { BASE_PATH } from '../../Globals';
//#endregion


class Location extends React.Component {

    constructor(props) {
        super(props);
        this.locationID = this.props.locationID;
        this.departmentID = this.props.departmentID;
        this.state = {
            name: '',
            groups: undefined
        }
        
        this.UpdateGroups = this.UpdateGroups.bind(this);
    }


    componentDidMount() {
        this.InitGroups();
    }

    InitGroups() {
        let authToken;
        if (authToken = this.props.GetCookie() === undefined)
			this.props.Logout();

        axios.get(BASE_PATH + 'groups/' + this.departmentID + '/' + this.locationID)
        .then( response => this.setState({ groups: response.data }) )
        .catch(error => {
            if (error.response.status === 401)
                this.Logout();
            else
                console.log(error)
        });
    }

    UpdateGroups() {
        this.componentDidMount();
    }

    GetGroupAdder() {
        if (this.state.groups !== undefined && this.state.groups.length !== 2) {
            return <GroupAdder Logout={ this.props.Logout } GetCookie={ this.props.GetCookie } departmentID={ this.departmentID } locationID={ this.id } />;
        }
    }


    render() {
        if (this.state.groups === undefined)
            return 'Loading groups...';
        else {
            return (
                <div>
                    <h3>Stundenpläne - { this.state.name }</h3>
                    {
                    this.state.groups.map((group, index) => {
                        return (
                            <div>
                                <h4>Gruppe { index + 1 }</h4>
                                <Group id={ group } Logout={ this.props.Logout } GetCookie={ this.props.GetCookie } UpdateGroups={ this.UpdateGroups } />
                            </div>
                        );
                    })
                    }
                    { this.GetGroupAdder() }
                </div>
            )
        }
    }

}

export default Location;