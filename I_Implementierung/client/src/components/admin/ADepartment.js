//#region Imports
//#region Dependencies
import React from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown';
//#endregion

import * as Globals from '../../Globals';
//#endregion


class Department extends React.Component {

    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.nonLocations = [];
        this.teachers = undefined;
        this.subjects = undefined;
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
            lessons:  undefined,
            start: '',
            startError: false,
            end: '',
            endError: false,
            teacher: '',
            teacherError: false,
            subject: '',
            subjectError: false
        };
    }


    /* Get all display information */
    componentDidMount() {
        this.InitLocations();
        this.InitNonLocations();
        this.InitSubjects();
        this.InitTeachers();
    }

    InitLocations() {
        axios.get(Globals.BASE_PATH + 'departments/' + this.id + '/locations')
        .then(response => {
            this.setState({
                locations: response.data
            })
        });
    }

    InitSubjects() {
        axios.get(Globals.BASE_PATH + 'subjects')
        .then(response  => this.subjects = response.data)
        .catch(error => console.log(error))
    }

    InitTeachers() {
        axios.get(Globals.BASE_PATH + 'teachers')
        .then(response  => this.teachers = response.data)
        .catch(error => console.log(error))
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

    DeleteLocation(id) {
        axios.delete(Globals.BASE_PATH + 'departments/' + this.id + '/locations/' + id)
        .then(response => {
            this.InitLocations();
            this.InitNonLocations();
        })
        .catch(error => console.log(error));
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
            locationID: id,
            lessons: undefined
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
            dayName: '',
            lessons: undefined
        });
    }

    handleDayChange(event) {
        this.setState({
            dayName: event.value
        });
        axios.get(Globals.BASE_PATH + 'daytables/lessons/' + event.value + '/' + this.state.selectedGroupID)
        .then(response => {
            this.setState({
                lessons: response.data
            });
            this.SortDates();
        }).catch(error => {
            console.log(error);
        });
    }

    SortDates() {
        let lessons = this.state.lessons;
        lessons.sort((a, b) => { return a.start > b.start});
        this.setState({
            lessons: lessons
        });
    }

    handleStartChange(event) {
        this.setState({
            start: event.target.value,
            startError: false
        });
    }

    handleStartLeave() {

    }

    handleEndChange(event) {
        this.setState({
            end: event.target.value,
            endError: false
        });
    }

    handleEndLeave() {
        
    }

    handleTeacherChange(event) {
        this.setState({
            teacher: event.target.value,
            teacherError: false
        });
    }

    handleTeacherLeave() {
        
    }

    handleSubjectChange(event) {
        this.setState({
            subject: event.target.value,
            subjectError: false
        });
    }

    handleSubjectLeave() {
        
    }

    CreateLesson() {
        let start = true;
        if (this.state.start === '') {
            this.setState({ startError: true });
            start = false;
        }
        let end = true;
        if (this.state.end === '') {
            this.setState({ endError: true });
            end = false;
        }
        let teacher = true;
        let teacherID = -1;
        this.teachers.map(teacher => {
            if (teacher.CONTRACTION === this.state.teacher) {
                teacherID = teacher.ID;
            }
        })
        if (this.state.teacher === '' || teacherID === -1) {
            this.setState({ teacherError: true });
            teacher = false;
        }
        let subject = true;
        let subjectID = -1;
        this.subjects.map(subject => {
            if (subject.Name === this.state.subject) {
                subjectID = subject.ID;
            }
        })
        if (this.state.subject === '' || subjectID === -1) {
            this.setState({ subjectError: true });
            subject = false;
        }

        if (start && end && teacher && subject) {
            axios.post(Globals.BASE_PATH + 'daytables/lessons/' + this.state.dayName + '/' + this.state.selectedGroupID, {
                start: this.state.start,
                end: this.state.end,
                subjects_id: subjectID,
                teachers_id: teacherID
            })
            .then(() => {
                axios.get(Globals.BASE_PATH + 'daytables/lessons/' + this.state.dayName + '/' + this.state.selectedGroupID)
                .then(response => {
                    this.setState({
                        lessons: response.data
                    });
                    this.SortDates();
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log(error);
            });
        }
    }

    renderLessonCreator() {
        return (
            <tr>
                <td></td>
                <td>
                    <input type="text" style={{width: '80px' , minWidth: 0}} className={ (this.state.startError) ? 'form-control form-error' : 'form-control' } placeholder="HH:MM" value={ this.state.start } onChange={ (event) => this.handleStartChange(event) } onBlur={ () => this.handleStartLeave() }/>
                </td>
                <td>
                    <input type="text" style={{width: '80px' , minWidth: 0}} className={ (this.state.endError) ? 'form-control form-error' : 'form-control' } placeholder="HH:MM" value={ this.state.end } onChange={ (event) => this.handleEndChange(event) } onBlur={ () => this.handleEndLeave() }/>
                </td>
                <td>
                    <input type="text" style={{width: '157px' , minWidth: 0}} className={ (this.state.subjectError) ? 'form-control form-error' : 'form-control' } placeholder="Informationssysteme" value={ this.state.subject } onChange={ (event) => this.handleSubjectChange(event) } onBlur={ () => this.handleSubjectLeave() }/>
                </td>
                <td>
                    <input type="text" style={{width: '80px' , minWidth: 0}} className={ (this.state.teacherError) ? 'form-control form-error' : 'form-control' } placeholder="ABCD" value={ this.state.teacher } onChange={ (event) => this.handleTeacherChange(event) } onBlur={ () => this.handleTeacherLeave() }/>
                </td>
                <td>
                    <button className="btn btn-success btn-sm" onClick={ () => this.CreateLesson() }>Hinzufügen</button>
                </td>
            </tr>
        );
    }

    renderTimetable() {
        if (this.state.dayName !== '' && this.state.selectedGroupID !== -1)
        if (this.state.lessons === undefined) {
            return (
                <div className="table-responsive">
                    <table class="table departments-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Startzeit</th>
                                <th>Endzeit</th>
                                <th>Fach</th>
                                <th>Lehrer</th>
                                <th>Aktionen</th>
                            </tr>
                        </thead>
                    </table>
                    <h5 className="text-center"><b>Stundeneinheiten werden geladen . . .</b></h5>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="table-responsive">
                        <table class="table departments-table">
                            <thead>
                                <tr>
                                    <th>Nummer</th>
                                    <th>Startzeit</th>
                                    <th>Endzeit</th>
                                    <th>Fach</th>
                                    <th>Lehrer</th>
                                    <th>Aktionen</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.lessons.map((lesson, index) => {
                                    return (
                                        <tr key={index}>
                                            <th>{ index + 1 }</th>
                                            <td>{ lesson.start }</td>
                                            <td>{ lesson.end }</td>
                                            <td>{ lesson.name }</td>
                                            <td>{ lesson.contraction }</td>
                                            <td>
                                                <button className="btn btn-primary btn-sm button-space">Bearbeiten</button>
                                                <button className="btn btn-danger btn-sm">Entfernen</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                            <tfoot>
                                { this.renderLessonCreator() }
                            </tfoot>
                        </table>
                    </div>
                </div>
            );
        }
    }

    renderDayDropdown() {
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