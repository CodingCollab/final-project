import React, { Component } from "react";
import { footer } from "reactstrap";

class Footer extends Component {
    render () {
      return (
        
        <footer className="py-3 bg-dark fixed-bottom">
          <div className="container">
            <p className="m-0 text-center text-white">Copyright © CodingCollabs 2018</p>
          </div>
        </footer>
        );
    }
  };

export default Footer;