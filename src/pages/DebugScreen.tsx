import React from 'react';
import { Container } from 'reactstrap';
import DebugScreen from '../components/debug-screen/DebugScreen';

const DebugScreenPage = () => (
  <Container fluid='true'>
    <h1>Debug Screen Page</h1>
    <DebugScreen />
  </Container>
);

export default DebugScreenPage;
