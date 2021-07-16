import Phaser from 'phaser';
import { discardWidth, discardHeight } from '../../const';
import { CardGroup } from '../../../../game/CardGroup';

export class CDDiscard extends Phaser.GameObjects.Sprite {
  scene: Phaser.Scene;
  countText: Phaser.GameObjects.Text;
  discard: CardGroup;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    discard: CardGroup
  ) {
    super(scene, x, y, texture);
    this.scene = scene;
    scene.add.existing(this);
    this.discard = discard;
    this.countText = new Phaser.GameObjects.Text(
      scene,
      x,
      y,
      discard.cards.length.toString(),
      {}
    );
    this.setDisplaySize(discardWidth, discardHeight);
    scene.add.existing(this.countText);
  }
}
