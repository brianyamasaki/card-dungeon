import Phaser from 'phaser';
import { deckWidth, deckHeight, nameTextStyle } from '../../const';
import { CDCard } from '../classes/CDCard';
import { CDDiscard } from './CDDiscard';

export class CDDeck extends Phaser.GameObjects.Sprite {
  scene: Phaser.Scene;
  countText: Phaser.GameObjects.Text;
  // non-Phaser members
  cdCards: CDCard[] = [];
  discard: CDDiscard | null = null;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this.scene = scene;
    scene.add.existing(this);
    this.countText = new Phaser.GameObjects.Text(
      scene,
      x - 4,
      y - 25,
      '0',
      nameTextStyle
    );
    this.setDisplaySize(deckWidth, deckHeight);
    scene.add.existing(this.countText);
  }

  updateCount() {
    this.countText.setText(this.cdCards.length.toString());
  }

  destroy() {
    this.countText.destroy();
    super.destroy();
  }

  // non-Phaser methods
  setupDiscard(discard: CDDiscard) {
    this.discard = discard;
    return this;
  }

  addCards(cdCards: CDCard[]) {
    // non-phaser code
    this.cdCards = this.cdCards.concat(cdCards);
    // Phaser code
    cdCards.forEach((card) => {
      card.visible = false;
    });
    this.updateCount();
    return this;
  }

  shuffle() {
    this.shuffleCards(this.cdCards);
    return this;
  }

  shuffleCards(cdCards: CDCard[]) {
    const count = cdCards.length;
    for (let i = 0; i < count; i++) {
      const swapPos = Math.trunc(Math.random() * count);
      const cdCardSaved = cdCards[i];
      if (swapPos !== i) {
        cdCards[i] = cdCards[swapPos];
        cdCards[swapPos] = cdCardSaved;
      }
    }
  }

  takeCardsFromDiscard() {
    const { discard } = this;
    if (discard) {
      const cardsFromDiscard = discard.removeAllCards();
      this.shuffleCards(cardsFromDiscard);
      this.cdCards = this.cdCards.concat(cardsFromDiscard);
      this.updateCount();
    }
  }

  removeCards(count: number): CDCard[] {
    if (count > this.cdCards.length) {
      this.takeCardsFromDiscard();
    }
    const cardsRemoved = this.cdCards.splice(0, count);
    this.updateCount();
    return cardsRemoved;
  }
}
