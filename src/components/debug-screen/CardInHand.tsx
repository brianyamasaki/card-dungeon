import React from 'react';
import { Button } from 'reactstrap';

import './CardInHand.css';

const cardInHand = () => (
  <li className='card-in-hand'>
    <span>
      CardName (24 of 30) - etc
      <br />
      Do 3 damage
    </span>
    <span>
      <Button color='primary'>Attack</Button>
    </span>
  </li>
);

export default cardInHand;
