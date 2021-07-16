import Phaser from 'phaser';
import { handRectangle, handHeight, handWidth, handYctr } from '../../const';
import { CDCard } from './CDCard';

const cardPos: number[][] = [
  [],
  [0],
  [-0.0969, 0.0969],
  [-0.1938, 0, 0.1938],
  [-0.2906, -0.0969, 0.0969, 0.2906],
  [-0.4844, -0.2906, -0.0969, 0.0969, 0.2906, 0.4844],
];
// const cardPos: number[][] = [
//   [],
//   [0.5],
//   [0.4031, 0.5969],
//   [0.3063, 0.5, 0.6938],
//   [0.2094, 0.4031, 0.5969, 0.7906],
//   [0.1125, 0.3063, 0.5, 0.6938, 0.8875],
// ];

export class HandArea {
  cards: CDCard[];
  x: number;
  y: number;
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.cards = [];

    // debug
    scene.add.existing(
      new Phaser.GameObjects.Rectangle(
        scene,
        x,
        y,
        handWidth,
        handHeight,
        0xdddddd,
        0.3
      )
    );
  }

  addCards = (cards: CDCard[]) => {
    this.cards = this.cards.concat(cards);
    cards.forEach((card) => {
      this.scene.add.existing(card);
    });
    this.arrangeCards();
  };

  arrangeCards = () => {
    const yCtr = handYctr;
    if (this.cards.length < cardPos.length) {
      this.cards.forEach((card: CDCard, i) => {
        const xCtr =
          (cardPos[this.cards.length][i] + 0.5) * handWidth +
          handRectangle.left;
        card.setPos(xCtr, yCtr);
      });
      return;
    }
    const xPerCard = handWidth / this.cards.length;
    const xPerCardHalf = xPerCard / 2;
    this.cards.forEach((card: CDCard, i) => {
      const xCtr = i * xPerCard + xPerCardHalf;
      card.setPos(xCtr, yCtr);
    });
  };
}
