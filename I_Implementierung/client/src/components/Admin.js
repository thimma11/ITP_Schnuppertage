//#region Imports
//#region Dependencies
import React from 'react';
//#endregion

import Departments from './admin/ADepartments';
import Teachers from './admin/ATeachers';
import Subjects from './admin/ASubjects';
import Events from './admin/AEvents';
//#endregion


class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.page = 'EVENTS';
        this.state = { key: 0 };
    }


    /* Navigate to the given page */
    Navigate(page) {
        this.page = page;
        this.setState({ key: Math.random() });
    }

    /* Return the component based on the current selected page */
    GetSelectedPage() {
        if (this.page === 'EVENTS')
            return <Events key={ this.state.key } GetCookie={ this.props.GetCookie } Logout={ this.props.Logout } />;
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
                <nav className="navbar navbar-default">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand">Schnuppertage</a>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li className={ (this.page === 'EVENTS') ? 'active' : '' } onClick={ () => this.Navigate('EVENTS') }><a href="#">Schnuppertage</a></li>
                                <li className={ (this.page === 'DEPARTMENTS') ? 'active' : '' } onClick={ () => this.Navigate('DEPARTMENTS') }><a href="#">Abteilungen</a></li>
                                <li className={ (this.page === 'TEACHERS') ? 'active' : '' } onClick={ () => this.Navigate('TEACHERS') }><a href="#">Lehrer</a></li>
                                <li className={ (this.page === 'SUBJECTS') ? 'active' : '' } onClick={ () => this.Navigate('SUBJECTS') }><a href="#">Fächer</a></li>
                                <li onClick={ () => this.props.Logout() }><a href="#">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div>
                    { this.GetSelectedPage() }
                </div>
            </div>
        );
    }

}

export default Admin;