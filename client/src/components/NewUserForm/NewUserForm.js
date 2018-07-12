import React, { Component } from "react";
import { form } from "reactstrap";
import "./NewUserForm.css";
import "../Pages/style.css";

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

    const myRequest = new Request("/api/userpost", {
      method: 'POST',
      // body: '{"firstName": ' + this.state.firstName + ', "lastName": '+ this.state.lastName + '", "userName": "this.state.userName", "userPass": "this.state.userPass", "email": "this.state.email"}'
      body: `{"firstName": "${this.state.firstName}", "lastName": "${this.state.lastName}", "userName": "${this.state.userName}", "userPass": "${this.state.userPass}", "email": "${this.state.email}"}`
    });
    // const myPost = {
    //   method: "POST",
    //   data: this.state
    // };

    // /*fetch*/Request("http://localhost/api", myPost)
    fetch(myRequest)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            // isLoaded: true,
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
          <div>The error is: {/*console.log(*/toString(error)/*)*/}</div>
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
          <form className="form validate-form">

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
            <button onClick={this.handleFormSubmit}>Submit</button>
          </form>
        </div>
      );
    }
  }
}

export default NewUserForm;
