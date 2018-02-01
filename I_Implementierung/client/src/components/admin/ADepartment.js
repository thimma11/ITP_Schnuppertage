//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown';
//#endregion

import Entries from './AEntries';
import Locations from './ALocations';
import EventCreator from './AEventCreator';
import * as Globals from '../../Globals';
//#endregion


class Department extends React.Component {

    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.nonLocations = [];
        this.state = {
            contraction: this.props.contraction,
            name: this.props.name,
            locations: undefined,
            editLocations: false,
            locationID: -1,
            nonLocations: undefined,
            groupIds: [],
            selectedGroup: '',
            selectedGroupID: -1,
            dayName: '',
            lessons: []
        };
    }


    /* Get all display information */
    componentDidMount() {
        this.InitLocations();
        this.InitNonLocations();
    }

    InitLocations() {
        axios.get(Globals.BASE_PATH + 'departments/' + this.id + '/locations')
        .then(response => {
            this.setState({
                locations: response.data
            })
        });
    }

    InitNonLocations() {
        axios.get(Globals.BASE_PATH + 'departments/' + this.id + '/!locations')
        .then(response => {
            this.nonLocations = response.data;
            let nonLocations = [];
            this.nonLocations.map(location => {
                nonLocations.push(location.NAME);
            });
            this.setState({
                location: '',
                nonLocations: nonLocations
            });
        });
    }

    DeleteLocation() {
        
    }

    handleLocationChange(event) {
        let nonLocations = [];
        this.nonLocations.map(location => {
            nonLocations.push(location.NAME);
        });
        if (nonLocations.indexOf(event.value) !== -1) {
            this.setState({
                location: event.value
            });
        } else {
            this.InitNonLocations();
        }
    }

    renderLocations() {
        if (this.state.locations === undefined) {
            return (
                <div className="well">
                    <div className="table-responsive">
                        <table class="table departments-table">
                            <thead>
                                <tr>
                                    <th>Standort ID</th>
                                    <th>Name</th>
                                    <th>Aktionen</th>
                                </tr>
                            </thead>
                        </table>
                        <h5 className="text-center"><b>Standorte werden geladen . . .</b></h5>
                    </div>
                </div>
            );
        } else if (this.state.locations.length === 0) {
            return (
                <div className="well">
                    <div className="table-responsive">
                        <table class="table departments-table">
                            <thead>
                                <tr>
                                    <th>Standort ID</th>
                                    <th>Name</th>
                                    <th>Aktionen</th>
                                </tr>
                            </thead>
                        </table>
                        <h5 className="text-center"><b>Keine Standorte gefunden . . .</b></h5>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="well">
                    <div className="table-responsive">
                        <table class="table departments-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Aktionen</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.locations.map((location, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{ location.NAME }</td>
                                            <td>
                                                <button className="btn btn-primary btn-sm button-space" onClick={ () => this.SelectLocation(location.ID) } >Stundenplan</button>
                                                <button className="btn btn-danger btn-sm" onClick={ () => this.DeleteLocation(location.ID) } >Entfernen</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                    { this.renderLocationAdder() }
                </div>
            );
        }
    }

    renderLocationAdder() {
        if (this.state.nonLocations === undefined) {
            return <h5 className="text-center"><b>Standorte werden geladen . . .</b></h5>;
        } else if (this.state.nonLocations.length === 0 ) {
            return <h5 className="text-center"><b>Keine weiteren Standorte gefunden . . .</b></h5>;
        } else {
            return (
                <div>
                    <div className='form-group nonLocations'>
                        <Dropdown options={ this.state.nonLocations } onChange={ (event) => this.handleLocationChange(event) } value={ this.state.location } placeholder="Standort hinzufügen" />
                    </div>
                    {
                        (this.state.location === '') ?
                        <button className="btn btn-primary Dropdown-disabled center-block" disabled>Hinzufügen</button> :
                        <button className="btn btn-primary center-block" onClick={ () => this.AddLocation() }>Hinzufügen</button>
                    }
                </div>
            );
        }
    }

    SelectLocation(id) {
        axios.get(Globals.BASE_PATH + 'groups/' + this.id + '/' + id)
        .then( response => {
            this.setState({
                groupIds: response.data,
                selectedGroup: '',
                selectedGroupID: -1
            })
        })
        .catch(error => {
            console.log(error)
        });
        this.setState({
            locationID: id
        });
    }

    AddLocation() {
        let nonLocations = [];
        this.nonLocations.map(location => {
            nonLocations.push(location.NAME);
        });
        if (nonLocations.indexOf(this.state.location) !== -1) {
            let id;
            this.nonLocations.map(location => {
                if (location.NAME === this.state.location) {
                    id = location.ID;
                }
            });
            axios.post(Globals.BASE_PATH + 'departments/' + this.id +'/locations', {
                location_id: id
            }).then(response => {
                this.InitLocations();
                this.InitNonLocations();
            }).catch(error => {
                console.log(error);
            });
        } else {
            this.InitNonLocations();
        }
    }

    GetGroupOptions() {
        let options = [];
        this.state.groupIds.map((id, index) => {
            options.push({
                value: id,
                label: 'Gruppe ' + (index + 1)
            });
        });
        return options;
    }

    handleGroupChange(event) {
        this.setState({
            selectedGroup: event.label,
            selectedGroupID: parseInt(event.value, 10),
            dayName: ''
        });
    }

    handleDayChange(event) {
        this.setState({
            dayName: event.value
        });
        axios.get(Globals.BASE_PATH + 'daytables/lessons/' + event.value + '/' + this.state.selectedGroupID);
    }

    renderTimetable() {

    }

    renderDayDropdown() {
        console.log(this.state.selectedGroupID);
        if (this.state.selectedGroupID !== -1) {
            return (
                <div className='form-group'>
                    <label>Wochentag</label>
                    <Dropdown options={ [{value: 'Montag' }, {value: 'Dienstag' }, { value: 'Mittwoch' }, {value: 'Donnerstag' }, {value: 'Freitag' }] } onChange={ (event) => this.handleDayChange(event) } value={ this.state.dayName } placeholder="Tag auswählen" />
                </div>
            );
        }
    }

    renderTimetables() {
        if (this.state.locationID !== -1) {
            return (
                <div>
                    <hr/>
                    <div>
                        <h5 className="form-header">Stundenplan</h5>
                        <div className="well">
                            <div className='form-group'>
                                <label>Gruppe<span className="label-information"> - Wählen Sie die Gruppe aus.</span></label>
                                <Dropdown options={ this.GetGroupOptions() } onChange={ (event) => this.handleGroupChange(event) } value={ this.state.selectedGroup.toString() } placeholder="Gruppe auswählen" />
                            </div>
                            { this.renderDayDropdown() }
                            { this.renderTimetable() }
                        </div>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <div className="container container-small">
                    <h4 className="form-header">{ this.state.contraction } - { this.state.name }</h4>
                    <hr/>
                    <div className="container locations">
                        <h5 className="form-header">Standorte</h5>
                        { this.renderLocations() }
                    </div>
                    { this.renderTimetables() }
                </div>
            </div>
        );
    }

}

export default Department;