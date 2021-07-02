import React from 'react';
import { Row, Col } from 'reactstrap';
import DeckDisplay from './Deck';
import DiscardDisplay from './Discard';
import HeroState from './HeroState';

import './GameState.css';

const GameStateDisplay = () => {
  return (
    <Row className='game-state'>
      <Col>
        <DeckDisplay />
      </Col>
      <Col>
        <DiscardDisplay />
      </Col>
      <Col>
        <HeroState />
      </Col>
    </Row>
  );
};

export default GameStateDisplay;
