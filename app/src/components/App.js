import React from 'react';
import ReactDom from 'react-dom';
import LoginRegister from './LoginRegister';


class App extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="App">
                <LoginRegister />
            </div>
        )
    }

}


export default App;