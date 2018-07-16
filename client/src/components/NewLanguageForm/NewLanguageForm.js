import React, { Component } from "react";
import { form } from "reactstrap";
import "./NewLanguageForm.css";
import "../Pages/style.css";
import axios from "axios";

class NewLanguageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      langName: ""
    };
  }

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

    axios({
      method: 'POST',
      url: '/api/langpost',
      data: {
        langName: this.state.langName
      }
    })
      .then(function (response) {
        console.log("response: ", response);
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  // begining the form

  render() {
    const { error, isLoaded, langName } = this.state;
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
      return (
        <div>
          <p>
            Please fill out the following form to submit a new language tag.
        </p>
          <form className="form validate-form" onSubmit={this.handleFormSubmit}>
            <div className="validate-input" data-validate="Must have a language">
              <input
                value={this.state.langName}
                name="langName"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Language Tag"
              />
            </div>
            <button id="btnSubmit">Submit</button>
          </form>
        </div>
      );
    }
  }
}

export default NewLanguageForm;
