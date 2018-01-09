//#region Imports
//#region Dependencies
import React from 'react';
//#endregion
//#endregion


class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            errorMessage: '',
            loading: false
        };
    }


    ChangeUsername(event) {
        this.setState({
            username: event.target.value,
            errorMessage: ''
        })
    }

    CheckUsername() {
        if (this.state.username === '') {
            this.setState({ errorMessage: "Geben Sie einen Benutzernamen ein." });
            return false;
        }
        return true;
    }

    ChangePassword(event) {
        this.setState({
            password: event.target.value,
            errorMessage: ''
        })
    }

    CheckPassword() {
        if (this.state.password === '') {
            this.setState({ errorMessage: "Geben Sie ein Passwort ein." });
            return false;
        }
        return true;
    }

    CheckLogin() {
        if (this.CheckUsername() && this.CheckPassword()) {
            this.setState({ loading: true });
            let response = this.props.Login(this.state.username, this.state.password);
            response.then(response => {
                if (response === false)
                    this.setState({ errorMessage: 'Nicht erfolgreich, überprüfen Sie den Benutzernamen und das Passwort.' });
                this.setState({ loading: false });
            });
        }
    }

    GetErrorMessage() {
        if (this.state.errorMessage !== '')
            return <p>{ this.state.errorMessage }</p>
    }

    GetLoading() {
        if (this.state.loading)
            return <p>Trying to log in...</p>;
    }


    render() {
        return (
            <div>
                <h1>Admin Login</h1>
                <div>
                    <label>Benutzername:</label>
                    <input value={ this.state.username } onChange={ (e) => this.ChangeUsername(e) } />
                </div>
                <div>
                    <label>Passwort:</label>
                    <input value={ this.state.password } onChange={ (e) => this.ChangePassword(e) } />
                </div>
                { this.GetLoading() }
                { this.GetErrorMessage() }
                <button onClick={ () => this.CheckLogin() } >Login</button>
            </div>
        );
    }

}

export default Login;