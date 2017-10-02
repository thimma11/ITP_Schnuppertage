import React from 'react';
import EditableLesson from './EditableLesson';

export default class Timetable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			title: props.title,
			lessons: props.lessons,
			adding: false
		};
	}

	initLessons() {
		return (
			this.state.lessons.map(
				(lesson)=><EditableLesson deleteLesson={this.deleteLesson} {...lesson} />
			)
		);
	}
	addLesson() {
		this.setState({
			adding: true
		});
		this.state.lessons.push({ "key":this.state.lessons.length, "teacher":"undefined", "subject":"undefined", "description":"undefined", "beginDate":"00:00", "endDate":"24:00", "editing":true });
	}
	deleteLesson(lesson) {
		console.log("Deleting lesson...");
	}
	render() {
		return (
			<div className="container timetable">
				<h2><i>Timetable</i>  - {this.state.title}</h2>
				<h4><i>Click a box to edit the information!</i></h4>
				<div>
					{ this.initLessons() }
					<div className="lesson">
						<button className="btn btn-md btn-success btn-block" onClick={ ()=>this.addLesson() }>Add Lesson</button>
					</div>
				</div>
			</div>
		);
	}

}