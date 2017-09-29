import React from 'react';

export default class Lesson extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			teacher: props.teacher,
			subject: props.subject,
			description: props.description,
			beginDate: props.beginDate,
			endDate: props.endDate,
			showDescription: false
		};
	}

	showDescription() {
		this.setState({
			showDescription: !this.state.showDescription
		});
	}
	render() {
		var description;

		description = (this.state.showDescription) ? <div className="col-12 lesson-description"><i><b>Description:</b> {this.state.description}</i></div> : "";

		return (
			<div className="lesson" onClick={ ()=>this.showDescription() }>
				<div className="row">
					<div className="col">{this.state.teacher}</div>
					<div className="col"><b>{this.state.subject}</b></div>
					<div className="col-12"><i>{this.state.beginDate + ' - ' + this.state.endDate}</i></div>
					{description}
				</div>
			</div>
		);
	}

}