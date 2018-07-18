import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./NewLanguageForm.css";
import "../Pages/style.css";
import axios from "axios";

class NewLanguageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      langName: "",
      modal: false
    };

    this.toggle = this.toggle.bind(this);
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

    axios({
      method: 'POST',
      url: '/api/langpost',
      data: {
        langName: this.state.langName
      }
    })
      .then((response) => {
        console.log("response: ", response);
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
      langName: ""
    });
  }

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
  }
}

export default NewLanguageForm;
