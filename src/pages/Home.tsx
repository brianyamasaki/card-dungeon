import React from 'react';
import { Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

const Home = () => (
  <Container>
    <Row>
      <h1>Home Page</h1>
      <p>Welcome to our game, blah, blah</p>
      <Link className='btn btn-primary' to='/debugScreen'>
        Debug Screen for Game
      </Link>
    </Row>
  </Container>
);

export default Home;
