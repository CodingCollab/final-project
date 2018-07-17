import React, { Component } from "react";
import { 
  Card, 
  Button, 
  CardImg, 
  CardTitle, 
  CardText, 
  CardGroup,
  CardBody,
  Jumbotron,
  Container
  } from 'reactstrap';
  import "./Home.css";


class Home extends Component {
  render () {
    return (
    <div>

    <h1 className="header" >CodeCollab</h1>
    <h4 className="subhead">Use your coding skills to earn quick cash - for you and for charity!</h4>
    
    <br></br>

    <CardGroup top width="85%">
      <Card>
        <CardImg top width="100%" object-fit="cover" src="https://www.mxcursos.com/image/cache/data/Thumbs2017/javascript-cr-292x175.png" alt="Javascript" />
        <CardBody>
          <CardTitle>JavaScript</CardTitle>
          <CardText>One of the web's most popular programming languages and adds interactivity to websites.</CardText>
          <Button name="javascriptBtn">View Javascript Tasks</Button>
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" object-fit="cover" src="data:image/png;base64,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" alt="PHP" />
        <CardBody>
          <CardTitle>PHP</CardTitle>
          <CardText>A server-side scripting language for creating dynamic and interactive web pages.</CardText>
          <Button name="phpBtn">View PHP Tasks</Button>
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" object-fit="cover" src="https://www2.bc.edu/tim-townsend/images/html_css.png" alt="HTML/CSS" />
        <CardBody>
          <CardTitle>HTML/CSS</CardTitle>
          <CardText>These two languages combine to form the backbone of almost all web pages.</CardText>
          <Button name="htmlcssBtn">View HTML/CSS Tasks</Button>
        </CardBody>
      </Card>
    </CardGroup>
    
    <br></br>

    <CardGroup>
      <Card>
        <CardImg top width="100%" src="https://ptpimg.me/67j0yz.png" alt="Node" />
        <CardBody>
          <CardTitle>Node</CardTitle>
          <CardText>An open-source, cross-platform JavaScript run-time environment that brings JS server-side.</CardText>
          <Button name="nodeBtn">View Node Tasks</Button>
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" src="https://ptpimg.me/jx6w82.png" alt="React" />
        <CardBody>
          <CardTitle>React</CardTitle>
          <CardText>A popular JavaScript library for building user interfaces.</CardText>
          <Button name="reactBtn">View React Tasks</Button>
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" src="https://ptpimg.me/v6819k.png" alt="MySQL" />
        <CardBody>
          <CardTitle>MySQL</CardTitle>
          <CardText>An open-source relational database management system.</CardText>
          <Button name="mysqlBtn">View MySQL Tasks</Button>
        </CardBody>
      </Card>
    </CardGroup>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    </div>
    )
};
}

export default Home;