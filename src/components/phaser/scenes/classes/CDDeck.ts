import Phaser from 'phaser';
import { deckWidth, deckHeight, nameTextStyle } from '../../const';
import { CDCard } from '../classes/CDCard';

export class CDDeck extends Phaser.GameObjects.Sprite {
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
    this.setDisplaySize(deckWidth, deckHeight);
    scene.add.existing(this.countText);
  }

  updateCount(count: number) {
    this.countText.setText(count.toString());
  }

  destroy() {
    this.countText.destroy();
    super.destroy();
  }
}
