//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown';
//#endregion

import * as Globals from '../Globals';
//#endregion


class EventRegistration extends React.Component {

    constructor() {
        super();
        this.departments = undefined;
        this.departmentID = undefined;
        this.locations = undefined;
        this.locationID = undefined;
        this.dates = undefined;
        this.state = {
            departments: undefined,
            department: '',
            departmentError: false,
            locations: undefined,
            location: '',
            locationError: false,
            dates: undefined,
            date: '',
            dateError: false,
            firstname: '',
            firstnameError: false,
            lastname: '',
            lastnameError: false,
            phone: '',
            phoneError: false,
            email: '',
            emailError: false,
            schoolLocation: '',
            schoolLocationError: false,
            schoolType: '',
            schoolTypeError: false
        };
    }


    componentDidMount() {
        this.initDepartments();
    }

    initDepartments() {
        axios.get(Globals.BASE_PATH + 'departments')
        .then(response => {
            this.departments = response.data;
            let departments = [];
            response.data.map(department => {
                departments.push(department.name);
                return null;
            });
            this.departmentID = undefined;
            this.locations = undefined;
            this.locationID = undefined;
            this.dates = undefined;
            this.setState({
                departments: departments,
                department: ''
            });
        })
    }

    initLocations() {
        axios.get(Globals.BASE_PATH + 'departments/' + this.departmentID + '/locations')
        .then(response => {
            this.locations = [];
            let loc = [];
            response.data.map(location => {
                this.locations.push({
                    id: location.ID,
                    name: location.NAME
                });
                loc.push(location.NAME);
                return null;
            });
            this.locationID = undefined;
            this.dates = undefined;
            this.setState({
                locations: loc,
                location: ''
            });
        })
    }

    initDates() {
        axios.get(Globals.BASE_PATH + 'events/dates/' + this.departmentID + '/' + this.locationID)
        .then(response => {
            this.dates = response.data;
            this.setState({
                dates: response.data,
                date: ''
            });
        })
    }

    handleDepartmentChange(department) {
        let departments = [];
        this.departments.map(dep => {
            departments.push(dep.name);
            return null;
        });

        if (departments.indexOf(department.value) === -1) {
            this.setState({
                department: '',
                departmentError: false
            });
            this.initDepartments();
        } else {
            this.setState({
                department: department.value,
                departmentError: false
            });
            this.departments.map(dep => {
                if (dep.name === department.value) {
                    this.departmentID = dep.id;
                }
            });
            this.initLocations();
        }
    }

    checkDepartment() {
        if (this.state.department === '') {
            this.setState({ departmentError: true });
        }
    }

    handleLocationChange(location) {
        let locations = [];
        this.locations.map(loc => {
            locations.push(loc.name);
            return null;
        });

        if (locations.indexOf(location.value) === -1) {
            this.setState({
                location: '',
                locationError: false
            });
            this.initLocations();
        } else {
            this.setState({
                location: location.value,
                locationError: false
            });
            this.locations.map(loc => {
                if (loc.name === location.value) {
                    this.locationID = loc.id;
                }
            });
            this.initDates();
        }
    }

    checkLocation() {
        if (this.state.location === '') {
            this.setState({ locationError: true });
        }
    }

    handleDateChange(date) {
        if (this.dates.indexOf(date.value) === -1) {
            this.setState({
                date: '',
                dateError: false
            });
            this.initDates();
        } else {
            this.setState({
                date: date.value,
                dateError: false
            });
        }
    }

    checkDate() {
        if (this.state.date === '') {
            this.setState({ dateError: true });
        }
    }

    handleFirstnameChange(event) {
        this.setState({
            firstname: event.target.value,
            firstnameError: false
        });
    }

    handleFirstnameLeave() {
        if (this.state.firstname === '') {
            this.setState({
                firstnameError: true
            });
        }
    }

    handleLastnameChange(event) {
        this.setState({
            lastname: event.target.value,
            lastnameError: false
        });
    }

    handleLastnameLeave() {
        if (this.state.lastname === '') {
            this.setState({
                lastnameError: true
            });
        }
    }

    handleEMailChange(event) {
        this.setState({
            email: event.target.value,
            emailError: false
        });
    }

    handleEMailLeave() {
        if (this.state.email.indexOf('@') === -1) {
            this.setState({
                emailError: true
            });
        }
    }

    handlePhoneChange(event) {
        this.setState({
            phone: event.target.value,
            phoneError: false
        });
    }

    handlePhoneLeave() {
        let isNumber = true;
        let number;
        for (let i = 0; i < this.state.phone.length; i++) {
            number = this.state.phone[i];
            if (number !== '+' && number !== ' ' && isNaN(parseInt(number, 10))) {
                isNumber = false;
            }
        }
        if (this.state.phone.indexOf('+') === -1 || this.state.phone.length > 15 || this.state.phone.length < 12 || !isNumber) {
            this.setState({
                phoneError: true
            });
        }
    }

    handleSchoolLocationChange(event) {
        this.setState({
            schoolLocation: event.target.value,
            schoolLocationError: false
        });
    }

    handleSchoolLocationLeave() {
        if (this.state.schoolLocation === '') {
            this.setState({
                schoolLocationError: true
            });
        }
    }

    handleSchoolTypeChange(event) {
        this.setState({
            schoolType: event.target.value,
            schoolTypeError: false
        });
    }

    handleSchoolTypeLeave() {
        if (this.state.schoolType === '') {
            this.setState({
                schoolTypeError: true
            });
        }
    }

    renderDepartments() {
        if (this.state.departments === undefined) {
            return (
                <div className={ (this.state.departmentError) ? 'form-group dropdown-error' : 'form-group' }>
                    <label>Abteilung<span className="label-information"> - Wählen Sie eine Abteilung aus.</span></label>
                    <Dropdown disabled options={ this.state.departments } onChange={ (event) => this.handleDepartmentChange(event) } value={ this.state.department } placeholder="Abteilung auswählen" />
                </div>
            );
        }
        if (this.state.departments.length === 0) {
            return (
                <div class="alert alert-danger" role="alert"><p><b>Es sind keine Abteilungen vorhanden.</b></p></div>
            );
        } else {
            return (
                <div className={ (this.state.departmentError) ? 'form-group dropdown-error' : 'form-group' }>
                    <label>Abteilung<span className="label-information"> - Wählen Sie eine Abteilung aus.</span></label>
                    <Dropdown options={ this.state.departments } onChange={ (event) => this.handleDepartmentChange(event) } value={ this.state.department } placeholder="Abteilung auswählen" />
                </div>
            );
        }
    }

    renderLocations() {
        if (this.departmentID === undefined) {
            return (
                <div className={ (this.state.locationError) ? 'form-group dropdown-error' : 'form-group' }>
                    <label>Standort<span className="label-information"> - Wählen Sie den Standort aus.</span></label>
                    <Dropdown disabled options={ this.state.locations } onChange={ (event) => this.handleLocationChange(event) } value={ this.state.location } placeholder="Abteilung auswählen" />
                </div>
            );
        } else {
            if (this.state.locations !== undefined) {
                if (this.state.locations.length === 0) {
                    return (
                        <div class="alert alert-danger" role="alert"><p><b>Für diese Abteilung ist kein Standort eingetragen.</b></p></div>
                    );
                } else {
                    return (
                        <div className={ (this.state.locationError) ? 'form-group dropdown-error' : 'form-group' }>
                            <label>Standort<span className="label-information"> - Wählen Sie den Standort aus.</span></label>
                            <Dropdown options={ this.state.locations } onChange={ (event) => this.handleLocationChange(event) } value={ this.state.location } placeholder="Abteilung auswählen" />
                        </div>
                    );
                }
            }
        }
    }

    renderDates() {
        if (this.locationID === undefined) {
            return (
                <div className={ (this.state.dateError) ? 'form-group dropdown-error' : 'form-group' }>
                    <label>Verfügare Tage<span className="label-information"> - Wählen Sie ein Datum aus.</span></label>
                    <Dropdown disabled options={ this.state.dates } onChange={ (event) => this.handleDateChange(event) } value={ this.state.date } placeholder="Datum auswählen" />
                </div>
            );
        } else {
            if (this.state.dates !== undefined) {
                if (this.state.dates.length === 0) {
                    return (
                        <div class="alert alert-danger" role="alert"><p><b>Für die ausgewählte Abteilung gibt es am angegebenen Standort keine eingetragenen Schuppertage.</b></p></div>
                    );
                } else {
                    return (
                        <div className={ (this.state.dateError) ? 'form-group dropdown-error' : 'form-group' }>
                            <label>Verfügare Tage<span className="label-information"> - Wählen Sie ein Datum aus.</span></label>
                            <Dropdown options={ this.state.dates } onChange={ (event) => this.handleDateChange(event) } value={ this.state.date } placeholder="Datum auswählen" />
                        </div>
                    );
                }
            }
        }
    }

    renderParticipantForm() {
        return (
            <div>
                <div className="form-group">
                    <label>Vorname</label>
                    <input type="text" className={ (this.state.firstnameError) ? 'form-control form-error' : 'form-control' } placeholder="Max" value={ this.state.firstname } onChange={ (event) => this.handleFirstnameChange(event) } onBlur={ () => this.handleFirstnameLeave() }/>
                </div>
                <div className="form-group">
                    <label>Nachname</label>
                    <input type="text" className={ (this.state.lastnameError) ? 'form-control form-error' : 'form-control' } placeholder="Mustermann" value={ this.state.lastname } onChange={ (event) => this.handleLastnameChange(event) } onBlur={ () => this.handleLastnameLeave() }/>
                </div>
                <div className="form-group">
                    <label>E-Mail</label>
                    <input type="text" className={ (this.state.emailError) ? 'form-control form-error' : 'form-control' } placeholder="max.mustermann@example.net" value={ this.state.email } onChange={ (event) => this.handleEMailChange(event) } onBlur={ () => this.handleEMailLeave() }/>
                </div>
                <div className="form-group">
                    <label>Telefonnummer</label>
                    <input type="text" className={ (this.state.phoneError) ? 'form-control form-error' : 'form-control' } placeholder="+43660 7284711" value={ this.state.phone } onChange={ (event) => this.handlePhoneChange(event) } onBlur={ () => this.handlePhoneLeave() }/>
                </div>
                <div className="form-group">
                    <label>Schulstandort</label>
                    <input type="text" className={ (this.state.schoolLocationError) ? 'form-control form-error' : 'form-control' } placeholder="Gmünd" value={ this.state.schoolLocation } onChange={ (event) => this.handleSchoolLocationChange(event) } onBlur={ () => this.handleSchoolLocationLeave() }/>
                </div>
                <div className="form-group">
                    <label>Schultyp</label>
                    <input type="text" className={ (this.state.schoolTypeError) ? 'form-control form-error' : 'form-control' } placeholder="Gymnasium" value={ this.state.schoolType } onChange={ (event) => this.handleSchoolTypeChange(event) } onBlur={ () => this.handleSchoolTypeLeave() }/>
                </div>
                <button className="btn btn-primary center-block" onClick={ () => this.checkAllValues() }>Absenden</button>
            </div>
        );
    }

    registerParticipant() {

    }

    checkAllValues() {
        this.handleFirstnameLeave();
        this.handleLastnameLeave();
        this.handleEMailLeave();
        this.handlePhoneLeave();
        this.handleSchoolLocationLeave();
        this.handleSchoolTypeLeave();
        this.checkDepartment();
        this.checkLocation();
        this.checkDate();

        if (this.state.firstnameError || this.state.lastnameError || this.state.emailError || this.state.phoneError || this.state.schoolLocationError || this.state.schoolTypeError || this.state.departmentError || this.state.locationError || this.state.dateError) {
        } else {
            this.registerParticipant();
        }
    }


    render() {
        return (
            <div className="container container-small">
                <h4 className="form-header">Anmeldungsformular</h4>
                <div className="well">
                    { this.renderDepartments() }
                    { this.renderLocations() }
                    { this.renderDates() }
                    { this.renderParticipantForm() }
                </div>
            </div>
        );
    }

}

export default EventRegistration;