// Last Update by Kevin Glasow on 07/12/2018

// *********************************************************************************
// search.js - component to render on page to search for posts
// *********************************************************************************

// DEPENDENCIES
// =============================================================

import React, { Component } from "react";
import { form } from "reactstrap";
import "../Pages/style.css"

// SEARCH LOGIC
// =============================================================

class searchForm extends Component {
    // Setting the component's initial state
    state = {
      searchTerm: "",
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
          searchTerm: "",
          });
      };
    

// RENDERING SEARCH BAR
// =============================================================

  render() {
      return (
          <div>
              <p>
                  Search for posts here!
              </p>
              <form className="form">
          <input
            value={this.state.searchTerm}
            name="searchTerm"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Search Stuff"
          />
           <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
         </div>
      );
  }
}

// EXPORTING COMPONENT
// =============================================================

export default searchForm;