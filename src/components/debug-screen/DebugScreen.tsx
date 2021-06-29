import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import YourHand from './YourHand';
import Monsters from './Monsters';
import GameStateDisplay from './GameState';
import { gameInterface } from '../../game/GameInterface';

import './DebugScreen.css';

export var drawIndex = 0;

const DebugScreen = () => {
  if (gameInterface === null) return null;

  const gameState = gameInterface.getGameState();
  const heroName = gameState.getHero().name;
  const cards = gameState.getHand();
  const monsters = gameState.getMonsters();

  return (
    <div className='debug-screen'>
      <Row>
        <Col sm='12' md='6'>
          <h3>{heroName || 'Your Hero'}</h3>
          <YourHand cardgroup={cards} />
        </Col>
        <Col sm='12' md='6'>
          <h3>Monsters</h3>
          <Monsters monsters={monsters} />
        </Col>
        <Col sm='12' md='9'>
          <GameStateDisplay gameState={gameState} />
        </Col>
        <Col sm='12' md='3'>
          <Button size='large' color='primary' className='turn-buttons'>
            End Turn
          </Button>
          <br />
          <Button size='large' color='danger' className='turn-buttons'>
            Restart Game
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default DebugScreen;
