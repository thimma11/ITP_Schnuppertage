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
				<h4><i>Click a box for more information!</i></h4>
				<div>
					{ this.state.lessons.map((lesson)=>lesson) }
				</div>
			</div>
		);
	}

}