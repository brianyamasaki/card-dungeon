import React from 'react';
import { Row, Col } from 'reactstrap';
import Deck from './Deck';
import Discard from './Discard';
import ProtagonistState from './ProtagonistState';
import './GameState.css';

const GameState = () => (
  <Row className='game-state'>
    <Col>
      <Deck />
    </Col>
    <Col>
      <Discard />
    </Col>
    <Col>
      <ProtagonistState />
    </Col>
  </Row>
);

export default GameState;
