//#region Imports
//#region Dependencies
import React from 'react';
//#endregion

import Departments from './admin/ADepartments';
import Teachers from './admin/ATeachers';
import Subjects from './admin/ASubjects';
//#endregion


class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.page = 'DEPARTMENTS';
        this.state = { key: 0 };
    }


    /* Navigate to the given page */
    Navigate(page) {
        this.page = page;
        this.setState({ key: Math.random() });
    }

    /* Return the component based on the current selected page */
    GetSelectedPage() {
        if (this.page === 'DEPARTMENTS')
            return <Departments key={ this.state.key } GetCookie={ this.props.GetCookie } Logout={ this.props.Logout } />;
        if (this.page === 'TEACHERS')
            return <Teachers key={ this.state.key } GetCookie={ this.props.GetCookie } Logout={ this.props.Logout } />;
        if (this.page === 'SUBJECTS')
            return <Subjects key={ this.state.key } GetCookie={ this.props.GetCookie } Logout={ this.props.Logout } />;
    }


    render() {
        return (
            <div>
                <nav className="bg-blue">
                    <div className="container">
                        <ul>
                            <li className="float-left" onClick={ () => this.Navigate('DEPARTMENTS') } ><h6>Abteilungen</h6></li>
                            <li className="float-left" onClick={ () => this.Navigate('TEACHERS') } ><h6>Lehrer</h6></li>
                            <li className="float-left" onClick={ () => this.Navigate('SUBJECTS') } ><h6>Fächer</h6></li>
                            <li className="float-right" onClick={ () => this.props.Logout() } ><h6>Logout</h6></li>
                        </ul>
                    </div>
                </nav>
                <div className="container">
                    { this.GetSelectedPage() }
                </div>
            </div>
        );
    }

}

export default Admin;