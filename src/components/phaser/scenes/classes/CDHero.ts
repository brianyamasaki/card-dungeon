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
  armor: NumCurMax;
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
    this.armor = new NumCurMax(json.armor);
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
      `Health: ${this.health.getCur()} / ${this.health.getMax()}`,
      {
        ...statsTextStyle,
        fixedWidth: 250,
      }
    );
    scene.add.existing(this.heroName);
    scene.add.existing(this.heroHealth);
  }

  destroy() {
    this.heroHealth.destroy();
    this.heroName.destroy();
    super.destroy();
  }

  // non-Phaser methods
  acceptAction(action: Action) {
    const { healthEffects, armorUpEffects } = action;
    if (healthEffects) {
      if (healthEffects.effectsLength() > 1) {
        this.healthEffectsList.push(healthEffects);
      }
      this.health.addToDelta(healthEffects.getDamage());
    }
    if (armorUpEffects) {
      // currently we don't support long term armor ups
      this.armor.addToDelta(armorUpEffects.getDamage());
    }
  }
}
