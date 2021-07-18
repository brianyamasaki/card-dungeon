import Phaser from 'phaser';
import { discardWidth, discardHeight, nameTextStyle } from '../../const';
import { CDCard } from './CDCard';

export class CDDiscard extends Phaser.GameObjects.Sprite {
  scene: Phaser.Scene;
  countText: Phaser.GameObjects.Text;
  cdCards: CDCard[];

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    cdCards: CDCard[]
  ) {
    super(scene, x, y, texture);
    this.scene = scene;
    scene.add.existing(this);
    this.cdCards = cdCards;
    this.countText = new Phaser.GameObjects.Text(
      scene,
      x - 4,
      y - 25,
      cdCards.length.toString(),
      nameTextStyle
    );
    this.setDisplaySize(discardWidth, discardHeight);
    scene.add.existing(this.countText);
  }

  addCard(cdCard: CDCard) {
    cdCard.visible = false;
    this.cdCards.push(cdCard);
  }

  updateCount(count: number) {
    this.countText.setText(count.toString());
  }

  destroy() {
    this.countText.destroy();
    super.destroy();
  }
}
