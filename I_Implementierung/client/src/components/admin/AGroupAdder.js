//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
//#endregion

import * as Globals from '../../Globals';
//#endregion


class GroupAdder extends React.Component {

    constructor(props) {
        super(props);
        this.departmentID = this.props.departmentID;
        this.locationID = this.props.locationID;
    }


    AddGroup() {
        /* */
    }


    render() {
        return <button onClick={ () => this.AddGroup() } >Neue Gruppe hinzufügen</button>;
    }

}

export default GroupAdder;