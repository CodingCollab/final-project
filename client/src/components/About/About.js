import React, { Component } from "react";

class About extends Component {
    render () {
      return (
        
        <div className="home">
            <h1>About CodeCollab</h1>
            <br></br>
            <p>CodeCollab is a full stack web app built using React, Sequalize and Node, as well as other 
              technologies. The designers (Lawrence S., Kevin G., Matt S., and Brian Z.) have built 
              this as their final project in Case Western Reserve University's Coding Bootcamp.</p>

            <p>This app allows a community of coders to meet with users who need their 
               specialty in a specific language. Users can post new requests for specialists in a 
               specific coding language or sign up to complete requests in a language they're familiar
               with. Users can also put a small dollar amount on their request to encourage more high quality solutions.</p>
               
               <p><a href="https://github.com/CodingCollab"> The GitHub repository can be viewed here. </a></p>
        </div>
        );
    }
  };

export default About;