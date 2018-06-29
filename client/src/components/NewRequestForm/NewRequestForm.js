import React, { Component } from "react";
import "./NewRequestForm.css";
import "react-day-picker/lib/style.css";
import DayPickerInput from "react-day-picker"

class NewRequestForm extends Component {
  // Setting the component's initial state
  state = {
    userName: "",
    requestName: "",
    requestContent: "",
    requestPrice: "",
    requestDueDate: ""
  };

  // setting an undefined date and handler to change it
  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.state = {
      selectedDay: undefined,
    };
  }
  handleDayChange(day) {
    this.setState({ selectedDay: day });
  }

  handleFormSubmit = event => {

    this.setState({
      userName: "",
      requestName: "",
      requestContent: "",
      requestPrice: "",
      requestDueDate: ""  
    });
  };

  // begining the form

  render() {
    //setting the day on the date picker calendar to today's date
    const { selectedDay } = this.state;
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
            value={this.state.lastName}
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
