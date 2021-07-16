import Phaser from 'phaser';
import { Monster } from '../../../../game/Monster';

export class CDMonster extends Phaser.GameObjects.Sprite {
  monster: Monster;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    monster: Monster
  ) {
    super(scene, x, y, texture);
    this.monster = monster;
    this.setInteractive({ droppable: true });
    this.input.dropZone = true;

    this.setData('isMonster', true);
  }
}
