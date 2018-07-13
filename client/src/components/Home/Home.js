import React, { Component } from "react";

import { Jumbotron, Container } from 'reactstrap';

const Home = (props) => {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">CodingCollab</h1>
          <p className="lead">Write some code and earn some cash - for you and for charity!</p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Home;