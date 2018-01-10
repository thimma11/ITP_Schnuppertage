//#region Imports
//#region Dependencies
import React from 'react';
//#endregion

import Departments from './admin/ADepartments';
//#endregion


class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = { key: 0 };
    }


    /* Navigate to the departments page */
    NavigateToDepartments() {
        this.setState({ key: Math.random() });
    }


    render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li onClick={ () => this.NavigateToDepartments() } >Abteilungen</li>
                        <li onClick={ () => this.props.Logout() } >Logout</li>
                    </ul>
                </nav>
                <main>
                    <Departments key={ this.state.key } GetCookie={ this.props.GetCookie } Logout={ this.props.Logout } />
                </main>
            </div>
        );
    }

}

export default Admin;