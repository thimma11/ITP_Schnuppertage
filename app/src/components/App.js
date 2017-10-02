import React from 'react';
import ReactDom from 'react-dom';
import Authentication from './Authentication/Authentication';
import UserView from './UserView';


class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        }

        this.RegisterSession = this.RegisterSession.bind(this);
    }

    render(){
        return (
            <div className="App">
                {this.RenderAuthentication()}
                {this.RenderUserView()}
            </div>
        )
    }

    RegisterSession(user) {
        alert("Session registered!");
        this.setState({
            user: user
        });
        console.log(user);
    }

    RenderUserView() {
        if(this.state.user)
            return (
                <UserView user={this.state.user} />
            );
    }

    RenderAuthentication() {
        if(!this.state.user)
            return (
                <Authentication />
            );
    }

}


export default App;