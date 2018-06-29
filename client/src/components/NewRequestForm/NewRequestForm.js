import React, { Component } from "react";
import "./NewRequestForm.css";

class NewRequestForm extends Component {
  // Setting the component's initial state
  state = {
    userName: "",
    requestName: "",
    requestContent: "",
    requestPrice: "",
    requestDueDate: ""
  };

  // determine what validation is necessary 

  // handleInputChange = event => {
  //   // Getting the value and name of the input which triggered the change
  //   let value = event.target.value;
  //   const name = event.target.name;

  //   if (name === "password") {
  //     value = value.substring(0, 15);
  //   }
  //   // Updating the input's state
  //   this.setState({
  //     [name]: value
  //   });
  // };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    // event.preventDefault();
    // if (!this.state.firstName || !this.state.lastName) {
    //   alert("Fill out your first and last name please!");
    // } else if (this.state.password.length < 6) {
    //   alert(
    //     `Choose a more secure password ${this.state.firstName} ${this.state
    //       .lastName}`
    //   );
    // } else {
    //   alert(`Hello ${this.state.firstName} ${this.state.lastName}`);
    // }

    this.setState({
      userName: "",
      requestName: "",
      requestContent: "",
      requestPrice: "",
      requestDueDate: ""  
    });
  };

  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
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
          <input
            value={this.state.requestDueDate}
            name="requestDueDate"
            onChange={this.handleDueDate}
            type="text"
            placeholder="When do you need this by?"
          />
          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default NewRequestForm;
