import { handRectangle, cardDimensions } from '../../const';
import { CDCard } from '../Game';
  const cardPos:number[][] = [
    [], 
    [0.5], 
    [.4031, .5969],
    [.3063, .5, .6938],
    [.2094, .4031, .5969, .7906],
    [.1125, .3063, .5, .6938, .8875],
  ];

  export const arrangeCards = (hand: CDCard[]) => {
    const yCtr = handRectangle.top + cardDimensions.height / 2;
    if (hand.length < cardPos.length) {
      const handRectangleWidth = handRectangle.right - handRectangle.left;
      hand.forEach((card: CDCard, i) => {
        const xCtr = cardPos[hand.length][i] * handRectangleWidth + handRectangle.left;
        card.sprite.setPosition(
          xCtr, 
          yCtr);
      })
      return;
    }
    const handWidth = handRectangle.right - handRectangle.left;
    const xPerCard =  handWidth / hand.length;
    const xPerCardHalf = xPerCard / 2;
    hand.forEach((card: CDCard, i) => {
      const sprite = card.sprite;
      const xCtr = (i * xPerCard) + xPerCardHalf + handRectangle.left;
      sprite.setPosition(xCtr, yCtr);
    })
  }
