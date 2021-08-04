import Phaser from 'phaser';
import {
  discardWidth,
  discardHeight,
  nameTextStyle,
  callBack,
} from '../../const';
import GameScreen from '../Game';
import { CDCard, CDCardRecord } from './CDCard';

export class CDDiscard extends Phaser.GameObjects.Sprite {
  scene: GameScreen;
  countText: Phaser.GameObjects.Text;
  cdCards: CDCard[] = [];
  onClickHandler: callBack | null = null;

  constructor(scene: GameScreen, x: number, y: number, texture: string) {
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
    this.setInteractive().on(
      Phaser.Input.Events.GAMEOBJECT_POINTER_UP,
      this.handlePointerUp,
      this
    );
  }

  setOnClickHandler = (cb: callBack) => {
    this.onClickHandler = cb;
    return this;
  };

  handlePointerUp = (pointer: Phaser.Input.Pointer) => {
    if (this.onClickHandler) {
      this.onClickHandler();
    }
  };

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

  replaceCards = (cardRecords: CDCardRecord[]) => {
    this.cdCards = cardRecords.map((cr) => {
      const card = new CDCard(this.scene, 0, 0, cr.json);
      card.id = cr.id;
      return card;
    });
  };

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
