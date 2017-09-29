import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Timetable from './components/Timetable';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<Timetable  lessons={lessons}/>, document.getElementById('root'));
registerServiceWorker();
