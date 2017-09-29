import React from 'react';
import Lesson from './Lesson';

export default class Timetable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			lessons: props.lessons
		};
	}

	render() {
		return (
			<div className="container timetable">
				<h2>Timetable</h2>
				<h4>Click a box for more information!</h4>
				<div>
					{ this.state.lessons.map((lesson)=><Lesson key={lesson.id} teacher={lesson.teacher} subject={lesson.subject} description={lesson.description} beginDate={lesson.beginDate} endDate={lesson.endDate} />)}
				</div>
			</div>
		);
	}

}