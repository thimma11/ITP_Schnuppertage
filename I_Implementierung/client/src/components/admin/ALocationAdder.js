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
            selectedLocation: 0
		};
	}


	componentDidMount() {
		this.InitLocations();
	}

	InitLocations() {
		//#region Delete this later...
		this.setState({
			locations: [
                { id: 0, name: 'Zwettl' },
                { id: 1, name: 'Krems' }
            ]
		});
		//#endregion

		/* Server Request
		let authToken;
        if (authToken = this.props.GetCookie() === undefined)
			this.props.Logout();
			
		axios.get(Globals.BASE_PATH + 'departments/' + this.departmentID +'/locations?noRelation=true', {
            headers: { Authorization: authToken }
		}).then(response => {
            this.setState({ locations: response.data.locations });
            if (this.state.locations.length !== 0)
                this.setState({ selectedLocation: this.state.locations[0].id });
        })
		.catch(error => {
            if (error.response.status === 401)
                this.props.Logout();
            else
                console.log(error);
        });
		*/
	}

	ChangeLocation(event) {
        this.setState({
            selectedLocation: parseInt(event.target.value, 10)
        });
    }

    AddLocation() {
        //#region Delete this later...
        this.props.InitLocations();
        this.props.Reload();
        //#endregion


        /* Server Request
		let authToken;
        if (authToken = this.props.GetCookie() === undefined)
			this.props.Logout();
			
		axios.get(Globals.BASE_PATH + 'departments/' + this.departmentID +'/locations', {
            headers: { Authorization: authToken }
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
		*/
    }


    render(){
        if (this.state.locations === undefined)
            return 'Loading locations...';
        if (this.state.locations.length !== 0) {
            return (
                <div>
                    <select value={ this.state.selectedLocation } onChange={ (e) => this.ChangeLocation(e) } >
                        {
                        this.state.locations.map(location => {
                            return <option key={ location.id } value={ location.id }>{ location.name }</option>
                        })
                        }
                    </select>
                    <button onClick={ () => this.AddLocation() } >Standort hinzufügen</button>
                </div>
            );
        }
    }

}

export default LocationAdder;