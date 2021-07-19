import Phaser from 'phaser';
import { discardWidth, discardHeight, nameTextStyle } from '../../const';
import { CDCard } from './CDCard';

export class CDDiscard extends Phaser.GameObjects.Sprite {
  scene: Phaser.Scene;
  countText: Phaser.GameObjects.Text;
  cdCards: CDCard[] = [];

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
    this.setDisplaySize(discardWidth, discardHeight);
    scene.add.existing(this.countText);
  }

  updateCount() {
    this.countText.setText(this.cdCards.length.toString());
    return this;
  }

  // Non-Phaser methods

  addCard(cdCard: CDCard) {
    // Non-Phaser code
    this.cdCards.push(cdCard);
    // Phaser code to hide the card
    cdCard.visible = false;
    this.updateCount();
    return this;
  }

  addCards(cdCards: CDCard[]) {
    // Non-Phaser code
    this.cdCards = this.cdCards.concat(cdCards);
    // Phaser code to hide the cards
    cdCards.forEach((card) => {
      card.visible = false;
    });
    this.updateCount();
    return this;
  }

  removeAllCards(): CDCard[] {
    const retval = this.cdCards;
    this.cdCards = [];
    this.countText.setText('0');
    return retval;
  }

  destroy() {
    this.countText.destroy();
    super.destroy();
  }
}
