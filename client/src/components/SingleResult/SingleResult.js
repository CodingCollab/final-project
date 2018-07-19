// Last Update by Kevin Glasow on 07/18/2018

// *********************************************************************************
// SingleResult.js - component to render the full details on one post
// *********************************************************************************

// DEPENDENCIES
// =============================================================
import React, { Component } from "react";
import "../Pages/style.css"
// import Axios from "axios";

// RENDER A SIMPLE COMPONENT TO DISPLAY THE SEARCH RESULTS
// =============================================================
class SingleResult extends Component {
    render () {
        return (
          <div className="singleResult">
            <h3>
                Request Title
            </h3>
            <ul>
                <li>
                    Requested By:
                </li>
                <li>
                    Request Description:
                </li>
                <li>
                    Price:
                </li>
                <li>
                    Request Due Date:
                </li>
                <li>
                    Requester Email:
                </li>
            </ul>
          </div>
          );
      }
};

export default SingleResult;