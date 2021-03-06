import Phaser from 'phaser';
import { handRectangle, handHeight, handWidth, handYctr } from '../../const';
import GameScreen from '../Game';
import { CDCard, CDCardRecord } from './CDCard';

export class HandArea {
  cards: CDCard[];
  x: number;
  y: number;
  scene: GameScreen;

  constructor(scene: GameScreen, x: number, y: number) {
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
    this.arrangeCards();
    cards.forEach((card) => {
      card.visible = true;
      card.addToScene(this.scene);
    });
    return this;
  };

  replaceCards = (cardRecords: CDCardRecord[]) => {
    this.cards = cardRecords.map((cardRecord) => {
      const card = new CDCard(this.scene, 0, 0, {
        ...cardRecord.json,
        id: cardRecord.id,
      }).addToScene(this.scene);

      return card;
    });
    this.arrangeCards();
    return this;
  };

  arrangeCards = () => {
    const yCtr = handYctr;
    const { cards } = this;
    if (cards.length === 0) {
      return;
    }
    const cardWidth = cards[0].displayWidth + 5;
    const cardsWidth = cards.length * cardWidth;
    if (cardsWidth <= handWidth) {
      const paddingX =
        (handWidth - cardsWidth) / 2 + handRectangle.left + cardWidth / 2;
      this.cards.forEach((card: CDCard, i: number) => {
        card.setPos(paddingX + i * cardWidth, yCtr);
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

  findCard(id: number): CDCard | undefined {
    return this.cards.find((cdCard) => cdCard.id === id);
  }

  removeCard(id: number): CDCard {
    // this keeps all cards except the one with the id passed in.
    const foundCard = this.findCard(id);
    if (!foundCard) {
      console.error(`card ${id} not found in hand`);
    } else {
      foundCard.removeFromScene();
      console.log(`Card ${id} with name ${foundCard.name} removed from hand`);
    }
    this.cards = this.cards.filter((cdCard) => cdCard.id !== id);
    this.arrangeCards();
    return foundCard || this.cards[0];
  }

  removeAllCards(): CDCard[] {
    const retval = this.cards;
    this.cards = [];
    return retval;
  }

  updateCards = (manaCur: number) => {
    this.cards.forEach((card) => {
      card.setDraggable(manaCur);
    });
  };
}
