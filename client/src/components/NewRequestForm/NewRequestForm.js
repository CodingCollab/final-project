import React, { Component } from "react";
import "./NewRequestForm.css";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "../Pages/style.css";
import axios from "axios";
import CustomModal from "../CustomModal";

class NewRequestForm extends Component {
  // Setting the component's initial state
  // state = {
  //   userName: "",
  //   requestName: "",
  //   requestContent: "",
  //   requestPrice: "",
  //   requestDueDate: undefined
  // };

  // setting an undefined date and handler to change it
  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      userName: "",
      requestName: "",
      requestLang: "",
      requestContent: "",
      requestPrice: "",
      requestDueDate: undefined,
      modal: false
    };

    
    this.toggle = this.toggle.bind(this);
  }

  handleDayChange(day) {
    console.log('father son and holy spirit ', day)
    this.setState({ requestDueDate: day });
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
    var tRes = "";
    axios({
      method: 'POST',
      url: '/api/reqpost',
      data: {
        userName: this.state.userName,
        requestName: this.state.requestName,
        requestLang: this.state.requestLang,
        requestContent: this.state.requestContent,
        requestPrice: this.state.requestPrice,
        requestDueDate: this.state.requestDueDate
      }
    })
      .then(function (response) {
        // this.setState({ tempRes: response.statusText });
        console.log("response: ", response);
        console.log("response.statusText: ", response.statusText);
        tRes = response.statusText;
        console.log("tRes: ", tRes);
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );

      this.state.tempRes = tRes;
      // console.log("tempRes: ", tempRes);
      this.setState({ tempRes: tRes });
      // console.log("tempRes after setState: ", tempRes);
      console.log("this.state.tempRes after setState: ", this.state.tempRes);
  };

  toggle() {
    this.setState({
      modal: !this.state.modal,
      error: null,
      isLoaded: false,
      userName: "",
      requestName: "",
      requestLang: "",
      requestContent: "",
      requestPrice: "",
      requestDueDate: undefined,
    });
  }

  // begining the form

  render() {
    //setting the day on the date picker calendar to today's date
    const { requestDueDate, error, isLoaded, userName, requestName, requestContent, requestPrice, tempRes } = this.state;

    if (error) {
      return (
        <div>
          <div>There was an error submitting the new language tag</div>
          {console.log(error)}
        </div>
      );
    }
    // else if (!isLoaded) {
    // return <div>Currently Loading</div>
    // }
    else {
      if (tempRes === "OK") {
        console.log("tempRes in the if statement: ", tempRes);
        CustomModal;
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
              value={this.state.requestLang}
              name="requestLang"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Requested Language"
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
              {requestDueDate && <p>Day: {requestDueDate.toLocaleDateString()}</p>}
              {!requestDueDate && <p>Choose a day</p>}
              <DayPickerInput onDayChange={this.handleDayChange} />
            </div>
            <button onClick={this.handleFormSubmit}>Submit</button>
          </form>
        </div>
        );
      }
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
              value={this.state.requestLang}
              name="requestLang"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Requested Language"
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
              {requestDueDate && <p>Day: {requestDueDate.toLocaleDateString()}</p>}
              {!requestDueDate && <p>Choose a day</p>}
              <DayPickerInput onDayChange={this.handleDayChange} />
            </div>
            <Button onClick={this.handleFormSubmit}> 
                Submit
            </Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Post Successful!</ModalHeader>
              <ModalBody>
                This data has been posted successfully to the Database. Great job!!
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle}>Okay!</Button>{' '}
              </ModalFooter>
            </Modal>
         </form>
        </div>
                       
      );

    }
  }
}

export default NewRequestForm;
