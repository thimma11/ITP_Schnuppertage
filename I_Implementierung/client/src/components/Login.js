import React from 'react';


class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        };
    }


    ChangeUsername(event) {
        this.setState({
            username: event.target.value,
            errorMessage: ''
        })
    }

    ChangePassword(event) {
        this.setState({
            password: event.target.value,
            errorMessage: ''
        })
    }

    CheckLogin() {
        if (this.state.username !== '' && this.state.password !== '') {
            let response = this.props.SendLoginRequest(this.state.username, this.state.password);
            response.then(response => {
                if (response === false)
                    this.setState({ errorMessage: 'Nicht erfolgreich, überprüfen Sie den Benutzernamen und das Passwort.' });
            });
        } else this.setState({ errorMessage: 'Geben Sie Benutzernamen und Passwort ein.' });
    }

    GetErrorMessage() {
        if (this.state.errorMessage !== '')
            return <p>{ this.state.errorMessage }</p>
    }


    render() {
        return (
            <div>
                <h2>Admin Login</h2>
                <div>
                    <label>Benutzername:</label>
                    <input value={ this.state.username } onChange={ (e) => this.ChangeUsername(e) } />
                </div>
                <div>
                    <label>Passwort:</label>
                    <input value={ this.state.password } onChange={ (e) => this.ChangePassword(e) } />
                </div>
                { this.GetErrorMessage() }
                <button onClick={ () => this.CheckLogin() } >Login</button>
            </div>
        );
    }

}

export default Login;