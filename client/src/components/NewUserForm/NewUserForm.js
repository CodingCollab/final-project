import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./NewUserForm.css";
import "../Pages/style.css";
import axios from "axios";

class NewUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      firstName: "",
      lastName: "",
      userName: "",
      userPass: "",
      email: "",
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  // create new user from form data
  // uncomment the lines with /* */ if you need to test the route in console logs
  handleFormSubmit = event => {
    /* console.log("The handleFormSubmit has been triggered"); */

    event.preventDefault()

    axios({
      method: 'POST',
      url: '/api/userpost',
      data: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        userName: this.state.userName,
        userPass: this.state.userPass,
        email: this.state.email
      }
    })
    .then((response) => {
      this.toggle();
    },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  };

  toggle() {
    this.setState({
      modal: !this.state.modal,
      error: null,
      isLoaded: false,
      firstName: "",
      lastName: "",
      userName: "",
      userPass: "",
      email: "",
    });
  }

  // begining the form

  render() {
    const { error, isLoaded, firstName, lastName, userName, userPass, email } = this.state;
    if (error) {
      return (
        <div>
          <div>There was an error creating a new user</div>
          <div>The error is: {JSON.stringify(error)}</div>
        </div>
      );
    }
    // else if (!isLoaded) {
    // return <div>Currently Loading</div>
    // }
    else {
      return (
        <div>
          <p>
            Please fill out the following form to create your new user account.
        </p>
          <form className="form validate-form" onSubmit={this.handleFormSubmit}>

            <input
              value={this.state.firstName}
              name="firstName"
              onChange={this.handleInputChange}
              type="text"
              placeholder="First Name"
            />
            <input
              value={this.state.lastName}
              name="lastName"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Last Name"
            />
            <input
              value={this.state.userName}
              name="userName"
              onChange={this.handleInputChange}
              type="text"
              placeholder="User Name"
            />
            <div className="validate-input" data-validate="Valid password is required">
              <input
                value={this.state.userPass}
                name="userPass"
                onChange={this.handleInputChange}
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="validate-input" data-validate="valid email is required: ex@abc.xyz">
              <input
                value={this.state.email}
                name="email"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Email"
              />
            </div>
            <Button id="btnSubmit">Submit</Button>
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
  };
};

export default NewUserForm;
