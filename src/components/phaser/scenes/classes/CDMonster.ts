import Phaser from 'phaser';
import { nameTextStyle, statsTextStyle, monsterIdMin } from '../../const';
import { MonsterJson } from '../../../../constJson';
import NumCurMax from '../../classes/NumCurMax';
import { BattleActions } from '../../classes/BattleActions';
import { Action } from '../../classes/Action';
import { EffectsOverTurns } from '../../classes/EffectsOverTurns';

export class CDMonster extends Phaser.GameObjects.Sprite {
  // Phaser members
  monsterName: Phaser.GameObjects.Text;
  monsterHealth: Phaser.GameObjects.Text;
  monsterAction: Phaser.GameObjects.Text;
  // non-Phaser members
  private static currentId = monsterIdMin;
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  armor: NumCurMax;
  health: NumCurMax;
  healthEffectsList: EffectsOverTurns[] = [];
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
    this.armor = new NumCurMax(json.armor);
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
    this.monsterAction = new Phaser.GameObjects.Text(scene, x - 125, y, '', {
      ...statsTextStyle,
      fixedWidth: 250,
    });
    this.monsterHealth = new Phaser.GameObjects.Text(
      scene,
      x - 145,
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

  updateHealth() {
    this.monsterHealth.setText(
      `Health: ${this.health.getCur()} / ${this.health.getMax()}`
    );
  }

  // non-Phaser methods
  acceptAction(action: Action) {
    const { healthEffects, armorUpEffects } = action;
    if (healthEffects) {
      if (healthEffects.effectsLength() > 1) {
        this.healthEffectsList.push(healthEffects);
      }
      this.health.causeDamage(healthEffects.getDamage());
    }
    if (armorUpEffects) {
      // currently we don't support long term armor ups
      this.armor.addToDelta(armorUpEffects.getDamage());
    }
    this.updateHealth();
  }

  chooseAction(): Action {
    const { actions } = this.battleActions;
    let iAction = 0;
    if (actions.length > 1) {
      iAction = Math.trunc(Math.random() * actions.length);
    }
    return actions[iAction];
  }
}
