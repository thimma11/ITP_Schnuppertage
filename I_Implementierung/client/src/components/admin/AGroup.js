//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
//#endregion

import * as Globals from '../../Globals';
import DayTable from './ADayTable';
//#endregion


class Group extends React.Component {

    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.state = {
            selectedDay: undefined
        }
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


    render() {
        return(
            <div>
                <div>
                    <button onClick={ () => this.ChangeSelectedDay('MO') } >Montag</button>
                    <button onClick={ () => this.ChangeSelectedDay('DI') } >Dienstag</button>
                    <button onClick={ () => this.ChangeSelectedDay('MI') } >Mittwoch</button>
                    <button onClick={ () => this.ChangeSelectedDay('DO') } >Donnerstag</button>
                    <button onClick={ () => this.ChangeSelectedDay('FR') } >Freitag</button>
                </div>
                { this.GetSelectedDay() }
            </div>
        );
    }

}

export default Group;