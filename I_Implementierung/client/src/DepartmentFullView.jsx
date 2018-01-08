import React from 'react';


export default class DepartmentFullView extends React.Component {

	constructor(props) {
        super(props);

        this.state = {
            abteilung: {
                id: 1,
                bezeichnung: "Informationstechnologie",
                termine: [
                    {
                        id: 1,
                        datum: new Date().setFullYear(2017, 11, 21),
                        standort: {
                            id: 1,
                            bezeichnung: "Zwettl"
                        }
                    },
                    {
                        id: 2,
                        datum: new Date().setFullYear(2017, 11, 25),
                        standort: {
                            id: 1,
                            bezeichnung: "Zwettl"
                        }
                    }
                ]
            }
        };
	}

    render(){
		return (
			<div>
                <h2>{ this.state.abteilung.bezeichnung }</h2>
            </div>
		);
    }

}