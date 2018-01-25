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
                <nav>
                    <ul>
                        <li onClick={ () => this.Navigate('DEPARTMENTS') } >Abteilungen</li>
                        <li onClick={ () => this.Navigate('TEACHERS') } >Lehrer</li>
                        <li onClick={ () => this.Navigate('SUBJECTS') } >Fächer</li>
                        <li onClick={ () => this.props.Logout() } >Logout</li>
                    </ul>
                </nav>
                <main>
                    { this.GetSelectedPage() }
                </main>
            </div>
        );
    }

}

export default Admin;