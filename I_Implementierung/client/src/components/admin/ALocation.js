//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
//#endregion

import Group from './AGroup';
import GroupAdder from './AGroupAdder';
import * as Globals from '../../Globals';
//#endregion


class Location extends React.Component {

    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.departmentID = this.props.departmentID;
        this.state = {
            name: '',
            groups: undefined
        }
    }


    componentDidMount() {
        this.setState({
            name: 'Zwettl',
            groups: [
                { id: 0 },
                { id: 10 }
            ]
        });
    }


    render() {
        if (this.state.groups === undefined)
            return 'Loading groups...';
        else {
            return (
                <div>
                    <h3>Stundenpläne - { this.state.name }</h3>
                    {
                    this.state.groups.map(group => {
                        <Group id={ group.id } />
                    })
                    }
                    <GroupAdder departmentID={ this.departmentID } locationID={ this.id } />
                </div>
            )
        }
    }

}

export default Location;