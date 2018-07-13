// Last Update by Kevin Glasow on 07/12/2018

// *********************************************************************************
// search.js - component to render on page to search for posts
// *********************************************************************************

// DEPENDENCIES
// =============================================================

import React, { Component } from "react";
import "../Pages/style.css";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// SEARCH LOGIC
// =============================================================

class searchForm extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      // Begining search bar portion of the form
      <div>
        <Form>
          <FormGroup>
            <Input type="text" name="searchTerm" placeholder="Search Term" />
          </FormGroup>
          {/*Begining dropdown  */}
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            Search Category
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Search Category</DropdownItem>
            <DropdownItem>User Name</DropdownItem>
            <DropdownItem>Request Description</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Any</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        
        </Form>
      </div>
    );
  }
}

// EXPORTING COMPONENT
// =============================================================

export default searchForm;