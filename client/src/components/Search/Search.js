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
import axios from "axios";

// COMPONENTS
// =============================================================
// Setting empty state for the componenet 
class searchForm extends Component {
  // state = {
  //   searchType: "",
  //   searchTerm: "",
  //   tempUrl: "",
  //   param: "",
  //   paramName: ""
  // };


  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.state = {
      dropdownOpen: false,
      splitButtonOpen: false,
      searchType: "", // "Search Type",
      searchTerm: "",
      tempUrl: "",
      param: "",
      paramName: ""
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
    // const name = event.target.name;

    // Updating the input's state
    this.setState({
      searchType: value
    });

  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    if (name === "searchType") {
      document.getElementById("header").innerHTML = value;
    }
    // Updating the input's state
    this.setState({
      [name]: value
    });

  };

  // th

  handleFormSubmit = event => {

    event.preventDefault()
    // logic
    console.log(this.state)

    // this.setState({
    //   searchType: "", // "Search Type",
    //   searchTerm: "",
    //   tempUrl: "",
    //   param: "",
    //   paramName: ""
    // });

    var tempUrl = "", param = "", paramName = ""; //, 
    // axios(
    /* switch (this.state.searchType) {
      case "User Name":
        tempUrl = '/api/userget/user';
        console.log("User Name initial tempUrl: ", tempUrl);
        // params = {
        //   userName: 
        // }
        param = this.state.searchTerm;
        console.log("User Name param: ", param);
        // tempUrl =+ '?userName=' + param;
        // tempUrl = tempUrl + param;
        console.log("User Name modified tempUrl: ", tempUrl);
        paramName = 'userName';
        console.log("User Name paramName: ", paramName);
        break;
      // case "Request Description":
      //   tempUrl = '/';
      //   break;
      case "Request Name":
        tempUrl = '/api/posts';
        console.log("Request Name initial tempUrl: ", tempUrl);
        param = this.state.searchTerm;
        console.log("Request Name param: ", param);
        // tempUrl = + '?requestName=' + param;
        // console.log("User Name modified tempUrl: ", tempUrl);
        paramName = 'requestName';
        console.log("Request Name paramName: ", paramName);
        break;
      case "Language":
        tempUrl = '/api/posts/language';
        console.log("Language Name initial tempUrl: ", tempUrl);
        param = this.state.searchTerm;
        console.log("Language Name param: ", param);
        // tempUrl = + '?langName=' + param;
        // console.log("User Name modified tempUrl: ", tempUrl);
        paramName = 'langName';
        console.log("Language Name paramName: ", paramName);
        break;
      case "All":
      default:
        tempUrl = '/api/posts/';
        break;
    } */
    // )
    // .then(function (response) {
    // console.log("response: ", response);
    // })
    console.log("this.state.searchType: ", this.state.searchType);
    console.log("this.state.searchTerm: ", this.state.searchTerm);
    var aSearchTerm = this.state.searchTerm, tempResponse = [{}];
    console.log("aSearchTerm: ", aSearchTerm);
    if (/*paramName*/ this.state.searchType === "User Name") {
      axios({
        method: 'GET',
      // axios.get('/api/userget/user', {
        // url: '' // tempUrl, // '/api/posts/user',
        url: '/api/userget/',
        params: {
        // data: {
          // userName: this.state.searchTerm // param
          userName: aSearchTerm
          // test: "this is a test"
        }
      })
        .then(function (response) {
          console.log("response: ", response);
          tempResponse = response.data;
          return tempResponse;
        },
          (error) => {
            this.setState({
              error
            });
          }
        )
      }
    else if (paramName === "requestName") {
      axios({
        method: 'GET',
        url: tempUrl, // '/api/posts/user',
        params: {
          requestName: param
        }
      })
        .then(function (response) {
          console.log(response);
          // this.loadResults(response);
        });
    }
    else if (paramName === "langName") {
      axios({
        method: 'GET',
        url: tempUrl, // '/api/posts/user',
        params: {
          langName: param
        }
      })
        .then(function (response) {
          console.log(response);
        });
    }
    // axios({
    //   method: 'GET',
    //   url: tempUrl, // '/api/posts/user',
    //   params: {
    //     paramName: param
    //   }
    // })
    //   .then(function (response) {
    //     console.log(response);
    //   });
    // });

    // })
    // axios.get(tempUrl)
    // .then(function (response) {
    // console.log(response);
    // });
  };

  // RENDERING COMPONENT
  // =============================================================
  render() {
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
              <DropdownItem onClick={this.handleDropdownSelect} value="Request Name" name="searchType">Request Name</DropdownItem>
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
          />
          <InputGroupAddon addonType="append"><Button color="secondary" onClick={this.handleFormSubmit}>Search</Button></InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}

export default searchForm;