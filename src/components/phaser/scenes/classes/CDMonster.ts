import Phaser from 'phaser';
import { nameTextStyle, statsTextStyle, monsterIdMin } from '../../const';
import { MonsterJson } from '../../../../constJson';
import NumCurMax from '../../../../game/utilities/NumCurMax';
import { BattleActions } from '../../../../game/utilities/BattleActions';

export class CDMonster extends Phaser.GameObjects.Sprite {
  // Phaser members
  monsterName: Phaser.GameObjects.Text;
  monsterHealth: Phaser.GameObjects.Text;
  // non-Phaser members
  private static currentId = monsterIdMin;
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  armor: number;
  health: NumCurMax;
  battleActions: BattleActions;

  constructor(scene: Phaser.Scene, x: number, y: number, json: MonsterJson) {
    super(scene, x, y, json.imageUrl);
    this.setInteractive({ droppable: true });
    this.input.dropZone = true;

    this.setData('isMonster', true);

    scene.add.existing(this);
    // non-Phaser initialization
    this.id = CDMonster.currentId++;
    this.name = json.name;
    this.description = json.description;
    this.imageUrl = json.imageUrl;
    this.armor = json.armor;
    this.health = new NumCurMax(json.health);
    this.battleActions = new BattleActions(json.battleActions);

    // Phaser initialization
    this.monsterName = new Phaser.GameObjects.Text(
      scene,
      x - 125,
      y,
      this.name,
      {
        ...nameTextStyle,
        fixedWidth: 250,
      }
    );
    this.monsterHealth = new Phaser.GameObjects.Text(
      scene,
      x - 125,
      y,
      `Health: ${this.health.getCur()} / ${this.health.getMax()}`,
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
