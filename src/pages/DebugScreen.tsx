import React from 'react';
import { Container } from 'reactstrap';
import DebugScreen from '../components/debug-screen/DebugScreen';
import GameInterface, { gameInterface } from '../game/GameInterface';

const DebugScreenPage = () => {
  if (!gameInterface) {
    new GameInterface();
  }
  return (
    <Container fluid='true'>
      <h1>Debug Screen Page</h1>
      <DebugScreen />
    </Container>
  );
};

export default DebugScreenPage;
