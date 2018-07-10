import React, { Component } from "react";
import "./NewLanguageForm.css";

class NewLanguageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // error: null,
      // isLoaded: false,
      langName: ""
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

    fetch("newLanguage.html", myPost)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            langName: result.langName
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
          <form className="form">
            <input
              value={this.state.langName}
              name="langName"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Language Tag"
            />
            <button onClick={this.handleFormSubmit}>Submit</button>
          </form>
        </div>
      );
    }
  }
}

export default NewLanguageForm;
