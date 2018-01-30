//#region Imports
//#region Dependencies
import React from 'react';
//#endregion

import EventRegistration from './EventRegistration';
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
            return <EventRegistration key={ this.state.key } />;
        if (this.page === 'LOGIN')
            return <Login key={ this.state.key } Login={ this.props.Login } />;
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
                                <li className={ (this.page === 'DEPARTMENTS') ? 'active' : '' } onClick={ () => this.Navigate('DEPARTMENTS') }><a href="#">Anmeldung<span className="sr-only">(current)</span></a></li>
                                <li className={ (this.page === 'LOGIN') ? 'active' : '' } onClick={ () => this.Navigate('LOGIN') }><a href="#">Admin Login</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container container-small">
                    { this.GetSelectedPage() }
                </div>
            </div>
        );
    }

}

export default User;