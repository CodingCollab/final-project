// Last Update by Kevin Glasow on 07/12/2018

// *********************************************************************************
// Results.js - component to render formatted search results
// *********************************************************************************

// DEPENDENCIES
// =============================================================

import React, { Component } from "react";
import "../Pages/style.css";
import axios from "axios";
import tempResponse from "../Search/Search.js";

// RENDERING
// =============================================================

class Results extends Component {
    // componentDidMount() {
    //     this.loadResults();
    // };

    userResults = () => {
        // axios.get()
        this.setState({
            users: tempResponse.data,
            requestedbies: tempResponse.data,
            results: tempResponse.data,
            userName: "",
            requestName: "",
            requestContent: "",
            requestOpen: "",
            requestContent: "",
            requestDueDate: "",
            requestCompletedDate: "",
            requestPrice: ""
        })
        console.log("users: ", this.state.users);
        console.log("requestedbies: ", this.state.requestedbies);
        console.log("results: ", this.state.results);
        console.log("userName: ", tempResponse.userName);
        console.log("requestName: ", tempResponse.requestName);
        console.log("requestContent: ", tempResponse.requestContent);
        console.log("requestOpen: ", tempResponse.requestOpen);
        console.log("requestContent: ", tempResponse.requestContent);
        console.log("requestDueDate: ", tempResponse.requestDueDate);
        console.log("requestCompletedDate: ", tempResponse.requestCompletedDate);
        console.log("requestPrice: ", tempResponse.requestPrice);

        this.newMethod();
    }

    newMethod() {
        // var reqArray = [{}];
        // for (var x = 0; x < tempResponse.length; x++) {
        //     reqArray.push({
        //         userName: tempResponse[x].userName,
        //         requestName: tempResponse[x].requestName,
        //         requestContent: tempResponse[x].requestContent,
        //         requestOpen: tempResponse[x].requestOpen,
        //         requestContent: tempResponse[x].requestContent,
        //         requestDueDate: tempResponse[x].requestDueDate,
        //         requestCompletedDate: tempResponse[x].requestCompletedDate,
        //         requestPrice: tempResponse[x].requestPrice
        //     });
        // }
        axios.apply()
    }

    // console.log(Results);
    render() {
        // const { reqArray } = this.newMethod;
        return (

            <div>
                <div className="home">
                    <p>
                        If you can read this it means that I understand how to display multiple components.
                </p>
                </div>
                <div>
                    <p>
                        Here are the results:
                </p>
                    <p>
                        {/* {this.userResults.toString()} */}
                        {/* {reqArray.forEach(element => {
                            reqArray[element].userName;
                            reqArray[element].requestName;
                            reqArray[element].requestContent;
                            reqArray[element].requestOpen;
                            reqArray[element].requestContent;
                            reqArray[element].requestDueDate;
                            reqArray[element].requestCompletedDate;
                            reqArray[element].requestPrice;
                        })} */}
                        {this.newMethod()}
                    </p>
                </div>
            </div>
        );
    }
};

export default Results;