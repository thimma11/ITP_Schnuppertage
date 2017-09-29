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

<<<<<<< HEAD
} 
=======
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
>>>>>>> 7fe6f902f90fae5a177a610d34572564bb1a14b1
