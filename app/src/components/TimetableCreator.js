import React from 'react';
import Lesson from './Lesson';

export default class TimetableCreator extends React.Component {
    constructor() {
        super();
        this.state = {
            subject: "",
            teacher: "",
            lessonID: 0,
            lessons: []
        }
    }

    onSubjectChange(event) {
        this.setState({
            subject: event.target.value
        });
    }
    onTeacherChange(event) {
        this.setState({
            teacher: event.target.value
        });
    }
    addLesson() {
        this.setState({
            lessons: this.state.lessons.concat([
                {id:this.state.lessonID,subject:this.state.subject,teacher:this.state.teacher}
            ])
        });
        this.state.lessonID++;
    }
    render() {
        return (
            <div>
                <div>
                   {this.state.lessons.map( (lesson) => <Lesson key={lesson.id} {...lesson}/>)}
                </div>
                <div>
                    <input
                        type="text"
                        name="subject"
                        value={this.state.subject}
                        onChange={(e)=>this.onSubjectChange(e)}/>
                    <input
                        type="text"
                        name="teacher"
                        value={this.state.teacher}
                        onChange={(e)=>this.onTeacherChange(e)}/>
                    <button
                        onClick={()=>this.addLesson()}>Add Lesson</button>
                </div>
            </div>
        )
    }
}