import React from 'react';

export default class Timetable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			title: props.title,
			lessons: props.lessons
		};
	}

	render() {
		return (
			<div className="container timetable">
				<h2><i>Timetable</i>  - {this.state.title}</h2>
				<h4>Click a box to edit the information!</h4>
				<div>
					{ this.state.lessons.map((lesson)=>lesson) }
					<div className="lesson">
						<button className="btn btn-md btn-success btn-block">Add Lesson</button>
					</div>
				</div>
			</div>
		);
	}

}