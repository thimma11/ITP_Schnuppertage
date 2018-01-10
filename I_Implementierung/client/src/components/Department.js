//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
//#endregion

import Location from './Location';
import * as Globals from '../Globals';
//#endregion


class Department extends React.Component {

    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.state = {
            name: "",
            locations: undefined,
            locationID: -1
        };

        this.CloseLocation = this.CloseLocation.bind(this);
    }


    /* Get all display information */
    componentDidMount() {
        this.InitAll();
    }

    /* Get all department information with all locations */
    InitAll() {
        //#region Delete this later...
        this.setState({
            name: 'Hochbau',
            locations: [
                { id: 0, name: 'Zwettl' },
                { id: 1, name: 'Krems' }
            ]
        });
        //#endregion

        /* Server Request
        axios.get(Globals.BASE_PATH + 'departments/' + this.id)
        .then(response => this.setState({ name: response.data.name }))
        .catch(error => console.log(error));
        axios.get(Globals.BASE_PATH + 'departments/' + this.id + '/locations')
        .then(response => this.setState({ locations: response.data.locations }))
        .catch(error => console.log(error)); */
    }

    /* Show a detailed location */
    ShowLocation(id) {
        this.setState({ locationID: id });
    }

    /* Close a detailed location */
    CloseLocation() {
        this.setState({ locationID: -1 });
    }

    /* Get the specific location view */
    GetLocations() {
        if(this.state.locations === undefined)
            return 'Loading locations...';
        else {
            if (this.state.locationID < 0) {
                return (
                    <div>
                        <h3>Standortauswahl</h3>
                        {
                        this.state.locations.map(location => {
                            return <button onClick={ () => this.ShowLocation(location.id) } >{ location.name }</button>
                        })
                        }
                    </div>
                );
            } else
                return <Location id={ this.locationID } CloseLocation={ this.CloseLocation } />
        }
    }


    render() {
        return (
            <div>
                <h2>Schnuppertage für { this.state.name }</h2>
                { this.GetLocations() }
            </div>
        );
    }

}

export default Department;