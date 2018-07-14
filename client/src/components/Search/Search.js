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

class searchForm extends Component {
  state = {
    searchType: "",
    searchText: ""
  };


  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.state = {
      dropdownOpen: false,
      splitButtonOpen: false
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
      searchType: "",
      searchText: ""
      });
  };


  render() {
    return (
      <div>
        <InputGroup>
          <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitButtonOpen} toggle={this.toggleSplit}>
            <DropdownToggle caret>
              Search Type 
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Search Type</DropdownItem>
              <DropdownItem>User Name</DropdownItem>
              <DropdownItem>Request Description</DropdownItem>
              <DropdownItem>Language</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>All</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
          <Input placeholder="Search Term" />
          <InputGroupAddon addonType="append"><Button color="secondary" onClick={this.handleFormSubmit}>Search</Button></InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}

export default searchForm;