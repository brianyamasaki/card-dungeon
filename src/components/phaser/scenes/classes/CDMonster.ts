import Phaser from 'phaser';
import { Monster } from '../../../../game/Monster';
import { nameTextStyle, statsTextStyle } from '../../const';

export class CDMonster extends Phaser.GameObjects.Sprite {
  monster: Monster;
  monsterName: Phaser.GameObjects.Text;
  monsterHealth: Phaser.GameObjects.Text;

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

    scene.add.existing(this);
    this.monsterName = new Phaser.GameObjects.Text(
      scene,
      x - 125,
      y,
      monster.name,
      {
        ...nameTextStyle,
        fixedWidth: 250,
      }
    );
    this.monsterHealth = new Phaser.GameObjects.Text(
      scene,
      x - 125,
      y,
      `Health: ${monster.health.getCur()} / ${monster.health.getMax()}`,
      {
        ...statsTextStyle,
        fixedWidth: 250,
      }
    );
    scene.add.existing(this.monsterName);
    scene.add.existing(this.monsterHealth);
  }

  setPlace(x: number, y: number, minDim: number) {
    this.setPosition(x, y).setDisplaySize(minDim, minDim);
    const textOffset = minDim / 2 + 10;
    this.monsterName.setPosition(x - 125, y - textOffset);
    this.monsterHealth.setPosition(x - 125, y + textOffset);
  }

  destroy() {
    this.monsterName.destroy();
    this.monsterHealth.destroy();
    super.destroy();
  }
}
