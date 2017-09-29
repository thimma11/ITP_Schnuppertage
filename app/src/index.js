import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Timetable from './components/Timetable';
import registerServiceWorker from './registerServiceWorker';

const lessons = [
	{id:1, teacher:"Panhofer", subject:"INSY", description:"Informationssysteme", beginDate:"10:15", endDate:"10:25"},
	{id:2, teacher:"Wieninger", subject:"ITPP", description:"Informationstechnische Projekte", beginDate:"10:25", endDate:"10:40"},
	{id:3, teacher:"Wenzina", subject:"SEW", description:"Softwareentwicklung", beginDate:"10:40", endDate:"11:00"},
	{id:4, teacher:"Birnzain", subject:"SYTD", description:"Dezentrale Systeme", beginDate:"11:00", endDate:"11:15"}
];

ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<Timetable  lessons={lessons}/>, document.getElementById('root'));
registerServiceWorker();
