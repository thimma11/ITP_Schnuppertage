import React from 'react';
import Departments from './admin/Departments';


class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = { key: 0 };
    }


    /* Navigate to the departments page */
    Navigate() {
        this.setState({ key: Math.random() });
    }


    render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li onClick={ () => this.Navigate() } >Abteilungen</li>
                        <li onClick={ () => this.props.SendLogoutRequest() } >Logout</li>
                    </ul>
                </nav>
                <main>
                    <Departments key={ this.state.key } GetCookie={ this.props.GetCookie } SendLogoutRequest={ this.props.SendLogoutRequest } />
                </main>
            </div>
        );
    }

}

export default Admin;