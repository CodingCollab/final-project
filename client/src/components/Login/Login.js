import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
 } from 'reactstrap';

class Login extends Component {
  state = {
    userName: "",
    password: ""
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

    handleFormSubmit = event => {

      event.preventDefault()
      // logic
      console.log(this.state)
  
      this.setState({
        userName: "",
        password: ""
      });
    };

  render() {
      return (
        <div>
        <Form className="form">
          <input
            value={this.state.userName}
            name="userName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="User Name"
          />
          <Input
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}
            type="password"
            placeholder="Password"
          />      
          <div className="container-login100-form-btn">
             <Button className="login100-form-btn" onClick={this.handleFormSubmit}>
                Login
             </Button>
          </div>
        </Form>

          <div className="text-center p-t-12">
            <span className="txt1">
              Forgot
            </span>
            <a className="txt2" href="/lostPass">
              Username / Password?
            </a>
          </div>
          <div className="text-center p-t-136">
            <a className="txt2" href="/NewUserForm">
              Create your Account
              <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" />
             </a>
          </div>
        </div>
      );
}
}

export default Login;