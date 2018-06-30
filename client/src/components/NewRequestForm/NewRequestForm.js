import React, { Component } from "react";
import "./NewRequestForm.css";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class NewRequestForm extends Component {
  // Setting the component's initial state
  state = {
    userName: "",
    requestName: "",
    requestContent: "",
    requestPrice: "",
    selectedDay: undefined
  };

  // setting an undefined date and handler to change it
  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
  }
  handleDayChange(day) {
    console.log('father son and holy spirit ', day)
    this.setState({ selectedDay: day });
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {

    event.preventDefault()
    // logic
    console.log(this.state)

    this.setState({
      userName: "",
      requestName: "",
      requestContent: "",
      requestPrice: "",
      selectedDay: undefined
    });
  };

  // begining the form

  render() {
    //setting the day on the date picker calendar to today's date
    const { selectedDay } = this.state ;
    return (
      <div>
        <p>
          Please fill out the following form to submit a new request.
        </p>
        <form className="form">
          <input
            value={this.state.userName}
            name="userName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="User Name"
          />
          <input
            value={this.state.requestName}
            name="requestName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Request Name"
          />
          <input
            value={this.state.requestContent}
            name="requestContent"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Describe your request here"
          />
          <input
            value={this.state.requestPrice}
            name="requestPrice"
            onChange={this.handleInputChange}
            type="text"
            placeholder="How much is this worth to you?"
          />
         {/* enter the calendar element */}
         <div>
          {selectedDay && <p>Day: {selectedDay.toLocaleDateString()}</p>}
          {!selectedDay && <p>Choose a day</p>}
          <DayPickerInput onDayChange={this.handleDayChange} />
         </div>
          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default NewRequestForm;
