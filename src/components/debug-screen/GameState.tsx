import React from 'react';
import { Row, Col } from 'reactstrap';
import DeckDisplay from './Deck';
import DiscardDisplay from './Discard';
import HeroState from './HeroState';
import GameState from '../../game/GameState';

import './GameState.css';

interface FunctionProps {
  gameState: GameState;
}

const GameStateDisplay = ({ gameState }: FunctionProps) => {
  return (
    <Row className='game-state'>
      <Col>
        <DeckDisplay deck={gameState.getDeck()} />
      </Col>
      <Col>
        <DiscardDisplay discard={gameState.getDiscard()} />
      </Col>
      <Col>
        <HeroState hero={gameState.getHero()} />
      </Col>
    </Row>
  );
};

export default GameStateDisplay;
