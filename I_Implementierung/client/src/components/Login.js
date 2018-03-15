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
            usernameError: false,
            password: '',
            passwordError: '',
            errorMessage: '',
            loading: false
        };
    }


    handleUsernameChange(event) {
        this.setState({
            username: event.target.value,
            usernameError: false
        });
    }

    handleUsernameLeave() {
        if (this.state.username === '') {
            this.setState({
                usernameError: true
            });
        }
    }    

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value,
            passwordError: false
        });
    }

    handlePasswordLeave() {
        if (this.state.username === '') {
            this.setState({
                passwordError: true
            });
        }
    }

    GetErrorMessage() {
        if (this.state.errorMessage !== '')
            return <div class="alert alert-danger" role="alert"><p><b>{ this.state.errorMessage }</b></p></div>;
    }

    checkLogin() {
        this.handleUsernameLeave();
        this.handlePasswordLeave();

        if (this.state.usernameError || this.state.passwordError) {
        } else {
            console.log(this.props.Login(this.state.username, this.state.password));
        }
    }


    render() {
        return (
            <div className="container login">
                <h4 className="form-header">Admin Login</h4>
                <div className="well">
                    <div className="form-group">
                        <label>Benutzername</label>
                        <input type="text" className={ (this.state.usernameError) ? 'form-control form-error' : 'form-control' } placeholder="m.mustermann" value={ this.state.username } onChange={ (event) => this.handleUsernameChange(event) } onBlur={ () => this.handleUsernameLeave() }/>
                    </div>
                    <div className="form-group">
                        <label>Passwort</label>
                        <input type="password" className={ (this.state.passwordError) ? 'form-control form-error' : 'form-control' } placeholder="●●●●●●●●" value={ this.state.password } onChange={ (event) => this.handlePasswordChange(event) } onBlur={ () => this.handlePasswordLeave() }/>
                    </div>
                    { this.GetErrorMessage() }
                    <button className="btn btn-primary center-block" onClick={ () => this.checkLogin()}>Weiter</button>
                </div>
            </div>
        );
    }

}

export default Login;