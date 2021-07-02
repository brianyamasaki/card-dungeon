import React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { Row, Col, Button } from 'reactstrap';
import YourHand from './YourHand';
import Monsters from './Monsters';
import GameStateDisplay from './GameState';
import GameInterface from '../../game/GameInterface';
import { gameStateAtom, heroNameState } from './recoilState';

import './DebugScreen.css';

const DebugScreen = () => {
  const setGameStateAtom = useSetRecoilState(gameStateAtom);
  const heroName = useRecoilValue(heroNameState);

  const newGame = () => {
    const gameInterface = new GameInterface();
    const gameState = gameInterface.getGameState();
    setGameStateAtom(gameState.getRGameState());
  };

  if (!heroName) {
    return (
      <Button
        size='large'
        color='primary'
        className='turn-buttons'
        onClick={newGame}
      >
        Start Game
      </Button>
    );
  }

  return (
    <div className='debug-screen'>
      <Row>
        <Col sm='12' md='6'>
          <h3>{heroName}</h3>
          <YourHand />
        </Col>
        <Col sm='12' md='6'>
          <h3>Monsters</h3>
          <Monsters />
        </Col>
        <Col sm='12' md='9'>
          <GameStateDisplay />
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
