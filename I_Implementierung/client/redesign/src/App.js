import React from 'react';
import Dropdown from 'react-dropdown';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedOption: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(selectedOption) {
    this.setState({ selectedOption: selectedOption.value });
  }


  render() {
    return <Dropdown options={['Zwettl', 'Krems']} onChange={ this.handleChange } value={ this.state.selectedOption } placeholder="Select your location" />;
  }
}

export default App;
