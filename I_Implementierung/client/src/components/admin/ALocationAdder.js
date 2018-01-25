//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
//#endregion

import * as Globals from '../../Globals';
//#endregion


class LocationAdder extends React.Component {

	constructor(props) {
		super(props);
		this.departmentID = this.props.departmentID;
		this.state = {
            locations: undefined,
            selectedLocation: -1
		};
	}


	componentDidMount() {
		this.InitLocations();
	}

	InitLocations() {
		let authToken;
        if (authToken = this.props.GetCookie() === undefined)
			this.props.Logout();
			
        axios.get(Globals.BASE_PATH + 'departments/' + this.departmentID +'/!locations?authToken=' + authToken)
        .then(response => this.setState({ locations: response.data }))
		.catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
	}

	ChangeLocation(event) {
        this.setState({
            selectedLocation: parseInt(event.target.value, 10)
        });
    }

    AddLocation() {
		let authToken;
        if (authToken = this.props.GetCookie() === undefined)
			this.props.Logout();
			
		axios.post(Globals.BASE_PATH + 'departments/' + this.departmentID +'/locations?authToken=' + authToken, {
            location_id: this.state.selectedLocation
        }).then(response => {
            this.InitLocations();
            this.props.Reload();
        })
		.catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
    }

    GetAdderButton() {
        if (this.state.selectedLocation === -1)
            return <button disabled >Standort hinzufügen</button>;
        else
            return <button onClick={ () => this.AddLocation() } >Standort hinzufügen</button>;
    }


    render(){
        if (this.state.locations === undefined)
            return 'Loading locations...';
        if (this.state.locations.length !== 0) {
            return (
                <div>
                    <select value={ this.state.selectedLocation } onChange={ (e) => this.ChangeLocation(e) } >
                        <option value={ -1 }>Nichts ausgewählt</option>
                        {
                        this.state.locations.map(location => {
                            return <option key={ location.ID } value={ location.ID }>{ location.NAME }</option>
                        })
                        }
                    </select>
                    { this.GetAdderButton() }
                </div>
            );
        }
        return (
            <p>Keine weitere Abteilung gefunden...</p>
        );
    }

}

export default LocationAdder;