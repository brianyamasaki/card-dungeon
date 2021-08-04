import Phaser from 'phaser';
import { CDCard } from './CDCard';
import {
  showCardsXCtr,
  showCardsYCtr,
  showCardsWidth,
  showCardsHeight,
  showCardsCardHeight,
  showCardsCardWidth,
  showCardsRectangle,
} from '../../const';
import GameScreen from '../Game';
import { TextButton } from './TextButton';

const backgroundColor = 0x333366;

const cardGap = 10;

const cardWidth = showCardsCardWidth + cardGap;
const cardWidthHalf = cardWidth / 2;
const cardHeight = showCardsCardHeight + cardGap;
const cardHeightHalf = cardHeight / 2;
const mpXctr = [
  showCardsRectangle.left + cardGap + cardWidthHalf,
  showCardsRectangle.left + cardGap + cardWidth + cardWidthHalf,
  showCardsRectangle.left + cardGap + cardWidth * 2 + cardWidthHalf,
  showCardsRectangle.left + cardGap + cardWidth * 3 + cardWidthHalf,
  showCardsRectangle.left + cardGap + cardWidth * 4 + cardWidthHalf,
];

const mpYctr = [
  showCardsRectangle.top + cardGap + cardHeightHalf,
  showCardsRectangle.top + cardGap + cardHeight + cardHeightHalf,
  showCardsRectangle.top + cardGap + cardHeight * 2 + cardHeightHalf,
  showCardsRectangle.top + cardGap + cardHeight * 3 + cardHeightHalf,
  showCardsRectangle.top + cardGap + cardHeight * 4 + cardHeightHalf,
];
const backgroundDepth = 1000;
const controlDepth = 1001;
const cardDepth = 1002;

export default class ShowCards extends Phaser.GameObjects.Rectangle {
  cards: CDCard[] = [];
  closeButton: TextButton;

  constructor(scene: GameScreen) {
    super(
      scene,
      showCardsXCtr,
      showCardsYCtr,
      showCardsWidth,
      showCardsHeight,
      backgroundColor
    );
    this.depth = backgroundDepth;
    this.closeButton = new TextButton(
      this.scene,
      showCardsRectangle.right - 50,
      showCardsRectangle.top,
      'Close',
      50,
      this.onClose
    ).setDepth(controlDepth);
    scene.add.existing(this.closeButton);
  }

  removeAllCards() {
    this.cards.forEach((card) => {
      card.setDepth(0);
      card.setVisible(false);
      card.removeFromScene();
    });
    this.cards = [];
  }

  replaceCards(cards: CDCard[]) {
    this.removeAllCards();
    cards.forEach((card, i) => {
      card.alpha = 1;
      card.visible = true;
      card.x = mpXctr[i % 5];
      card.y = mpYctr[Math.floor(i / 5)];
      card.setDepth(cardDepth);
      card.addToScene(this.scene);
      // card.input.draggable = false;
      card.disableInteractive();
    });
    this.cards = cards;
    return this;
  }

  onClose = () => {
    this.removeAllCards();
    this.closeButton.setVisible(false);
    this.visible = false;

    return this;
  };
}
