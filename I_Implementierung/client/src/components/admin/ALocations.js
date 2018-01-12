//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
//#endregion

import Location from './ALocation';
import LocationAdder from './ALocationAdder';
import * as Globals from '../../Globals';
//#endregion


class Locations extends React.Component {

    constructor(props) {
        super(props);
        this.departmentID = this.props.departmentID;
        this.state = {
            locations: undefined,
            locationID: -1
        }

        this.CLoseLocation = this.CloseLocation.bind(this);
        this.Reload = this.Reload.bind(this);
    }


    componentDidMount() {
        this.setState({
            locations: [
                { id: 0, name: 'Zwettl' },
                { id: 1, name: 'Krems' }
            ]
        });
        
        /*
		let authToken;
        if (authToken = this.props.GetCookie() === undefined)
			this.props.Logout();

        axios.get(Globals.BASE_PATH + 'departments/' + this.departmentID + '/locations', {
            headers: { Authorization: authToken }
		}).then(response => this.setState({ locations: response.data.locations }))
        .catch(error => console.log(error));
        */
    }

    OpenLocation(id) {
        this.setState({ locationID: id });
    }

    CloseLocation() {
        this.setState({ locationID: -1 });
    }

    Reload() {
        this.componentDidMount();
    }


    render() {
        if (this.state.locationID >= 0)
            return <Location id={ this.state.locationID } CloseLocation={ this.CloseLocation } />
        else if (this.state.locations === undefined)
            return 'Loading locations...';
        else {
            return (
                <div>
                    <h3>Standorte</h3>
                    {
                    this.state.locations.map(location => <button key={ location.id } onClick={ () => this.OpenLocation(location.id) } >{ location.name }</button>)
                    }
                    <LocationAdder departmentID={ this.departmentID } Reload={ this.Reload } />
                </div>
            );
        }
    }

}

export default Locations;