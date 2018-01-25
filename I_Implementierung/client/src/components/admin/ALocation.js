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
        
        this.UpdateGroups = this.UpdateGroups.bind(this);
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

    UpdateGroups() {
        this.componentDidMount();
    }

    GetGroupAdder() {
        if (this.state.groups !== undefined && this.state.groups.length !== 2) {
            return <GroupAdder departmentID={ this.departmentID } locationID={ this.id } />;
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
                                <Group id={ group.id } UpdateGroups={ this.UpdateGroups } />
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