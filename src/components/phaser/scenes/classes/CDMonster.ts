import Phaser from 'phaser';
import { nameTextStyle, statsTextStyle, monsterIdMin } from '../../const';
import { MonsterJson } from '../../../../constJson';
import NumCurMax from '../../classes/NumCurMax';
import { BattleActions } from '../../classes/BattleActions';
import { Action } from '../../classes/Action';
import { EffectsOverTurns } from '../../classes/EffectsOverTurns';
import { CDHero } from './CDHero';

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
  armor: number;
  health: NumCurMax;
  healthEffectsList: EffectsOverTurns[] = [];
  battleActions: BattleActions;
  nextAction: Action | null = null;

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
    this.armor = 0;
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
      this.healthString(),
      {
        ...statsTextStyle,
        fixedWidth: 250,
      }
    );
    this.monsterAction = new Phaser.GameObjects.Text(scene, x - 125, y, '', {
      ...statsTextStyle,
      fixedWidth: 250,
    });
    scene.add.existing(this.monsterName);
    scene.add.existing(this.monsterHealth);
    scene.add.existing(this.monsterAction);
  }

  setPlace(x: number, y: number, minDim: number) {
    this.setPosition(x, y).setDisplaySize(minDim, minDim);
    const textOffset = minDim / 2 + 10;
    this.monsterName.setPosition(x - 125, y - textOffset - 25);
    this.monsterHealth.setPosition(x - 125, y + textOffset);
    this.monsterAction.setPosition(x - 125, y - textOffset);
  }

  destroy() {
    this.monsterName.destroy();
    this.monsterHealth.destroy();
    this.monsterAction.destroy();
    super.destroy();
  }

  // non-Phaser methods
  healthString(): string {
    return `Health: ${this.health.getCur()} / ${this.health.getMax()}`;
  }

  updateHealth() {
    this.monsterHealth.setText(this.healthString());
  }

  resetArmor() {
    this.armor = 0;
  }

  acceptAction(action: Action) {
    const { healthEffects, armorUpEffects } = action;
    if (healthEffects && healthEffects.effectsLength() > 0) {
      if (healthEffects.effectsLength() > 1) {
        this.healthEffectsList.push(healthEffects);
      } else {
        this.health.causeDamage(healthEffects.getDamage());
      }
    }
    if (armorUpEffects && armorUpEffects.effectsLength() > 0) {
      // currently we don't support long term armor ups
      this.armor += armorUpEffects.getDamage();
    }
    this.updateHealth();
  }

  chooseAction() {
    const { actions } = this.battleActions;
    let iAction = 0;
    if (actions.length > 1) {
      iAction = Math.trunc(Math.random() * actions.length);
    }
    this.nextAction = actions[iAction];
    this.monsterAction.setText(this.nextAction.description);
    return this;
  }

  attackHero(hero: CDHero) {
    this.nextAction?.actOnHero(hero, this);
  }
}
