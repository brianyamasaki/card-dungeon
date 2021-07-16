import Phaser from 'phaser';
import { deckWidth, deckHeight } from '../../const';
import { CardGroup } from '../../../../game/CardGroup';

export class CDDeck extends Phaser.GameObjects.Sprite {
  scene: Phaser.Scene;
  countText: Phaser.GameObjects.Text;
  deck: CardGroup;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    deck: CardGroup
  ) {
    super(scene, x, y, texture);
    this.scene = scene;
    scene.add.existing(this);
    this.deck = deck;
    this.countText = new Phaser.GameObjects.Text(
      scene,
      x,
      y,
      deck.cards.length.toString(),
      {}
    );
    this.setDisplaySize(deckWidth, deckHeight);
    scene.add.existing(this.countText);
  }
}
