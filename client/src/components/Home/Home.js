import React from 'react';
import { Card, Button, CardTitle, CardImg, CardText, Row, Col } from 'reactstrap';

const Example = (props) => {
  return (
    <Row>
      <Col md="4">
        <Card body>
          <CardTitle>Special Title Treatment</CardTitle>
          <CardImg top width="100%"  src="https://ptpimg.me/156kw0.jpg
" alt="Card image cap" />
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button>Go somewhere</Button>
        </Card>
      </Col>
      <Col md="4">
        <Card body>
          <CardTitle>Special Title Treatment</CardTitle>
          <CardImg top width="100%" src="https://ptpimg.me/156kw0.jpg
" alt="Card image cap" />
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button>Go somewhere</Button>
        </Card>
      </Col>
    </Row>
  );
};

export default Example;