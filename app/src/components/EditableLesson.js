import React from 'react';

export default class EditableLesson extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			teacher: props.teacher,
			subject: props.subject,
			description: props.description,
			beginDate: props.beginDate,
			endDate: props.endDate,
			editing: false
		};
	}

	onTeacherChange(event) {
		this.setState({
			teacher: event.target.value
		});
	}
	onSubjectChange(event) {
		this.setState({
			subject: event.target.value
		});
	}
	onDescriptionChange(event) {
		this.setState({
			description: event.target.value
		});
	}
	onBeginDateChange(event) {
		this.setState({
			beginDate: event.target.value
		});
	}
	onEndDateChange(event) {
		this.setState({
			endDate: event.target.value
		});
	}
	edit() {
		this.setState({
			editing: !this.state.editing
		});
	}
	saveLesson() {
		console.log("Lesson saved...");

		this.setState({
			editing: !this.state.editing
		});
	}
	render() {
		if (this.state.editing) {
			return (
				<div className="lesson disable-hover">
					<div className="lesson-box">
						<span className="lesson-label"><b>Teacher:</b></span>
						<div className="lesson-input">
							<input className="form-control" spellCheck="false" value={this.state.teacher} onChange={ (event)=>this.onTeacherChange(event) }/>
						</div>
					</div>
					<div className="lesson-box">
						<span className="lesson-label"><b>Subject:</b></span>
						<div className="lesson-input">
							<input className="form-control" spellCheck="false" value={this.state.subject} onChange={ (event)=>this.onSubjectChange(event) }/>
						</div>
					</div>
					<div className="lesson-box">
						<div className="lesson-label-textarea"><b>Description:</b></div>
						<div>
							<textarea className="form-control" rows="3" spellCheck="false" value={this.state.description} onChange={ (event)=>this.onDescriptionChange(event) }/>
						</div>
					</div>
					<div className="lesson-box">
						<span className="lesson-label"><b>Begin Date:</b></span>
						<div className="lesson-input">
							<input className="form-control" spellCheck="false" value={this.state.beginDate} onChange={ (event)=>this.onBeginDateChange(event) }/>
						</div>
					</div>
					<div className="lesson-box">
						<span className="lesson-label"><b>End Date:</b></span>
						<div className="lesson-input">
							<input className="form-control" spellCheck="false" value={this.state.endDate} onChange={ (event)=>this.onEndDateChange(event) }/>
						</div>
					</div>
					<button className="btn btn-md btn-primary btn-block" onClick={ ()=>this.saveLesson() }>Save</button>
				</div>
			);
		}

		return (
			<div className="lesson" onClick={ ()=>this.edit() }>
				<div className="row">
					<div className="col">{this.state.teacher}</div>
					<div className="col"><b>{this.state.subject}</b></div>
					<div className="col-12"><i>{this.state.beginDate + ' - ' + this.state.endDate}</i></div>
				</div>
			</div>
		);
	}

}