import React, { Component } from "react";
import "./NewUserForm.css";

class NewUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // error: null,
      // isLoaded: false,
      firstName: "",
      lastName: "",
      userName: "",
      userPass: "",
      email: ""
    };
  }
  // Setting the component's initial state
  // state = {
  // langName: ""
  // };

  // componentDidUpdate() {
  //   fetch("newLanguage.html")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         this.setState({
  //           isLoaded: true,
  //           langName: result.langName
  //         });
  //       },
  //       (error) => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     )
  // }
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

    const myPost = {
      method: 'POST',
      data: this.state
    };

    fetch("newUser", myPost)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            firstName: result.firstName,
            lastName: result.lastName,
            userName: result.userName,
            userPass: result.userPass,
            email: result.email
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    // this.setState({
    //   langName: ""
    // });
  };

  // begining the form

  render() {
    const { error, isLoaded, firstName, lastName, userName, userPass, email } = this.state;
    if (error) {
      return (
        <div>
          <div>There was an error creating a new user</div>
          {console.log(error)}
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
          <form className="form">
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
            <input
              value={this.state.userPass}
              name="userPass"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Password"
            />
            <input
              value={this.state.email}
              name="email"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Email"
            />
            <button onClick={this.handleFormSubmit}>Submit</button>
          </form>
        </div>
      );
    }
  }
}

export default NewUserForm;
