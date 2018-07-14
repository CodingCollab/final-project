// Last Update by Kevin Glasow on 07/14/2018

// *********************************************************************************
// Search.js - component to contain serch logic and rendering
// *********************************************************************************

// DEPENDENCIES
// =============================================================
import React, { Component } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  Input,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
 } from 'reactstrap';

// DEPENDENCIES
// =============================================================
// Setting empty state for the componenet 
class searchForm extends Component {
  state = {
    searchType: "",
    searchTerm: ""
  };


  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.state = {
      dropdownOpen: false,
      splitButtonOpen: false,
      searchType: "Search Type",
      searchTerm: ""
    };
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }

  handleDropdownSelect = event => {
    let value = event.target.value;
    const name = event.target.name;
    
    console.log(name);
    console.log(value);
    // Updating the input's state
    this.setState({
      searchType: value
      // [name]: value
    });

    console.log(this.state.searchType);
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    if(name==="searchType"){
      console.log("here");
      document.getElementById("header").innerHTML = value;
    }
    // Updating the input's state
    this.setState({
      [name]: value
    });

    console.log(this.state);
  };

  handleFormSubmit = event => {

    event.preventDefault()
    // logic
    console.log(this.state)

    this.setState({
      searchType: "Search Type",
      searchTerm: ""
      });


  };

// RENDERING COMPONENT
// =============================================================
  render() {
    console.log(this.state);
    return (
      <div>
        <InputGroup>
          <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitButtonOpen} toggle={this.toggleSplit}>
            <DropdownToggle caret>
              {this.state.searchType} 
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header value={this.state.searchType}>Search Type</DropdownItem>
              <DropdownItem onClick={this.handleDropdownSelect} value="User Name" name="searchType">User Name</DropdownItem>
              <DropdownItem onClick={this.handleDropdownSelect} value="Request Description" name="searchType">Request Description</DropdownItem>
              <DropdownItem onClick={this.handleDropdownSelect} value="Language" name="searchType">Language</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={this.handleDropdownSelect} value="All" name="searchType">All</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
          <Input 
            value={this.state.searchTerm}
            name="searchTerm"
            onChange={this.handleInputChange}
            type="text"
            // placeholder="Search Term"
          />
          <InputGroupAddon addonType="append"><Button color="secondary" onClick={this.handleFormSubmit}>Search</Button></InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}

export default searchForm;