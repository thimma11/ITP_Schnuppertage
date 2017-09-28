import React from 'react';


export default class UserView extends React.Component {

    constructor({user, hidden}){
        super({user, hidden})
    }

    render() {
        return(
            <div style={{"visibility": this.props.hidden ? "hidden" : "visible"}}>
                <h1>Hello, {this.props.user ? this.props.user.Vorname: ""}</h1>
            </div>
        )
    }

} 