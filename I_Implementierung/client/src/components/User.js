//#region Imports
//#region Dependencies
import React from 'react';
//#endregion

import Departments from './Departments';
import Login from './Login';
//#endregion


class User extends React.Component {

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
            return <Departments key={ this.state.key } />;
        if (this.page === 'LOGIN')
            return <Login key={ this.state.key } Login={ this.props.Login } />;
    }


    render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li onClick={ () => this.Navigate('DEPARTMENTS') } >Abteilungen</li>
                        <li onClick={ () => this.Navigate('LOGIN') } >Admin Login</li>
                    </ul>
                </nav>
                <main>
                    { this.GetSelectedPage() }
                </main>
            </div>
        );
    }

}

export default User;