import React from 'react';


export default class UserView extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
            <div style={{"visibility": this.props.hidden ? "hidden" : "visible"}}>
                {this.renderForUser()}
            </div>
        )
    }

    renderForUser() {
        if(this.props.user.Admin)
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
