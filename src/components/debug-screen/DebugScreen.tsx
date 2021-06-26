import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import YourHand from './YourHand';
import Antagonists from './Antagonists';
import GameState from './GameState';

import './DebugScreen.css';

const DebugScreen = () => (
  <div className='debug-screen'>
    <Row>
      <Col sm='12' md='6'>
        <h3>Your Cards</h3>
        <YourHand />
      </Col>
      <Col sm='12' md='6'>
        <h3>Antagonists</h3>
        <Antagonists />
      </Col>
      <Col sm='12' md='9'>
        <h3>Game State</h3>
        <GameState />
      </Col>
      <Col sm='12' md='3'>
        <Button color='primary'>End Turn</Button>
      </Col>
    </Row>
  </div>
);

export default DebugScreen;
