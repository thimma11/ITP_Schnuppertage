import React from 'react';


export default class UserView extends React.Component {

    constructor({user, hidden}){
        super({user, hidden})
    }

    render() {
        return(
            <div style={{"visibility": this.props.hidden ? "hidden" : "visible"}}>
                {this.renderForUser()}
            </div>
        )
    }

    renderForUser() {
        if(this.state.user.Admin)
            return (
                <div>
                    Hello, Admin!
                </div>
            );
        else
            return (
                <div>
                    Hello, User!
                </div>
            );
    }


}