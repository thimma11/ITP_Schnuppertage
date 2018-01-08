import React from 'react';
import Department from './Department';


export default class DepartmentsOverview extends React.Component {

	constructor(props) {
        super(props);

        this.ShowDepartment = this.ShowDepartment.bind(this);
		this.state = {
			abteilungen: [
                {
                    id: 1,
                    bezeichnung: "Informationstechnologie"
                },
                {
                    id: 2,
                    bezeichnung: "Bautechnik"
                }
            ]
		}
	}

    ShowDepartment(departmentID) {
        this.props.ChangeDepartmentID(departmentID);
    }

    render(){
		return (
			<div>
                {
                    this.state.abteilungen.map( (abteilung, index) => {
                        return <Department
                                key={ index }
                                abteilung={ abteilung }
                                ShowDepartment={ this.ShowDepartment } />;
                    })
                }
            </div>
		);
    }

}