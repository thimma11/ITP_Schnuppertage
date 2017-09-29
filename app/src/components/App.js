import React from 'react';
import ReactDom from 'react-dom';
import LoginRegister from './LoginRegister';
import UserView from './UserView';


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: null,
        }

        this.RegisterSession = this.RegisterSession.bind(this);
    }

    render(){
        return (
            <div className="App">
                <LoginRegister onClickHandler={this.RegisterSession} hidden={this.state.user ? true : false} />
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
                <UserView hidden={this.state.user ? false : true} user={this.state.user} />
            );
    }

}


export default App;