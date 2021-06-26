import React from 'react';
import CardInHand from './CardInHand';
import './YourHand.css';

const yourHand = () => (
  <ul className='your-hand'>
    <CardInHand />
    <CardInHand />
  </ul>
);

export default yourHand;
