import Phaser from 'phaser';
import GameScreen from '../Game';
import {
  heroIdMin,
  heroHeight,
  heroWidth,
  nameTextStyle,
  statsTextStyle,
} from '../../const';
import { HeroJson } from '../../../../constJson';
import NumCurMax from '../../classes/NumCurMax';
import { EffectsOverTurns } from '../../classes/EffectsOverTurns';
import { Action } from '../../classes/Action';
import {
  GameEmitter,
  GE_DelExpiredEffects,
  GE_DamageHero,
} from '../../classes/GameEmitter';

export class CDHero extends Phaser.GameObjects.Sprite {
  scene: Phaser.Scene;
  heroName: Phaser.GameObjects.Text;
  heroHealth: Phaser.GameObjects.Text;
  x: number;
  y: number;
  // static id
  private static currentId = heroIdMin;
  // non-Phaser data
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  health: NumCurMax;
  armor: number;
  strengthDelta: number = 0;
  defenseDelta: number = 0;
  healthEffectsList: EffectsOverTurns[] = [];

  constructor(scene: GameScreen, x: number, y: number, json: HeroJson) {
    super(scene, x, y, json.imageUrl);
    this.x = x;
    this.y = y;
    this.scene = scene;
    const minDim = Math.min(heroWidth, heroHeight);

    this.setDisplaySize(minDim, minDim);
    this.setData('isHero', true);
    scene.add.existing(this);

    // non-Phaser data initialization
    this.id = CDHero.currentId++;
    this.name = json.name;
    this.description = json.description || '';
    this.imageUrl = json.imageUrl;
    this.armor = 0;
    this.health = new NumCurMax(json.health);

    // Phaser initialization
    this.heroName = new Phaser.GameObjects.Text(
      scene,
      this.x - 125,
      this.y - heroHeight / 2,
      this.name,
      {
        ...nameTextStyle,
        fixedWidth: 250,
      }
    );
    this.heroHealth = new Phaser.GameObjects.Text(
      scene,
      this.x - 125,
      this.y + heroHeight / 2,
      this.statusString(),
      {
        ...statsTextStyle,
        fixedWidth: 250,
      }
    );
    scene.add.existing(this.heroName);
    scene.add.existing(this.heroHealth);
    GameEmitter.getInstance()
      .on(GE_DelExpiredEffects, this.cleanUpEffectsList)
      .on(GE_DamageHero, this.useHealthEffectsList);
  }

  statusString = (): string => {
    const healthLine = `Health: ${this.health}`;
    const strengthLine = `Strength: ${this.strengthDelta}`;
    const armorLine = `Armor: ${this.armor}`;
    return `${healthLine}\n${strengthLine}\n${armorLine}`;
  };

  destroy() {
    this.heroHealth.destroy();
    this.heroName.destroy();
    super.destroy();
  }

  // non-Phaser methods
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

  updateHealth() {
    this.heroHealth.setText(this.statusString());
  }

  resetArmor() {
    this.armor = 0;
  }

  // go through healthEffectsList and remove expired healthEffects
  cleanUpEffectsList = () => {
    this.healthEffectsList = this.healthEffectsList.filter(
      (eot) => !eot.expired
    );
  };

  // iterate through healthEffectsList and inflict damage or healing effects
  useHealthEffectsList = () => {
    this.healthEffectsList.forEach((eot) => {
      this.health.causeDamage(eot.getDamage());
    });
    this.updateHealth();
  };
}
