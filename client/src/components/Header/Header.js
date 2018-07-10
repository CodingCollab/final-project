import React, { Component } from "react";
import { navbar} from "reactstrap";

class Header extends Component {
    render () {
      return (
  
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <a className="navbar-brand" href="#">
              <img src="https://ptpimg.me/8f7267.jpg
  
            " style={{display: 'inline-block'}} />
              <span style={{display: 'inline-block'}}>CodingCollabs</span>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/NewRequestForm">New Request</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Search">Search</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login/Sign Up</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="newLanguage.html">Language Form</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="newRequest.html">Request Form</a>
                </li>
                {/* from Lawrence
                  <li className="nav-item">
                    <a className="nav-link" href="login.html">Login/Sign Up</a>
                  </li>
                */}
              </ul>
            </div>
          </div>
        </nav>
      );
    }
}

export default Header;