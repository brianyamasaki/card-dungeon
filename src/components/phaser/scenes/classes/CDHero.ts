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
import NumCurMax, { NumCurMaxRecord } from '../../classes/NumCurMax';
import {
  EffectsOverTurns,
  EffectsOverTurnsRecord,
} from '../../classes/EffectsOverTurns';
import { Action } from '../../classes/Action';
import {
  GameEmitter,
  GE_DelExpiredEffects,
  GE_DamageHero,
  GE_GameOver,
} from '../../classes/GameEmitter';
import { Burning } from './Burning';

export type CDHeroRecord = {
  id: number;
  name: string;
  armor: number;
  health: NumCurMaxRecord;
  strengthDelta: number;
  healthEffectsList: EffectsOverTurnsRecord[];
};

export const initCDHeroRecord: CDHeroRecord = {
  id: 0,
  name: '',
  armor: 0,
  health: { cur: 0, max: 0 },
  strengthDelta: 0,
  healthEffectsList: [],
};

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
  healthEffectsList: EffectsOverTurns[] = [];
  burningIndicator: Burning;

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
    this.burningIndicator = new Burning(
      scene,
      this.x - 125,
      this.y + heroHeight / 2
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
    this.burningIndicator.destroy();
    super.destroy();
  }

  // non-Phaser methods
  acceptAction(action: Action) {
    const { healthEffects, armorUpEffects } = action;
    if (healthEffects && healthEffects.effectsLength() > 0) {
      if (healthEffects.effectsLength() > 1) {
        healthEffects.setInCharacter(true);
        this.healthEffectsList.push(healthEffects);
      } else {
        this.health.causeDamage(this.armorModifier(healthEffects.getDamage()));
      }
    }
    if (armorUpEffects && armorUpEffects.effectsLength() > 0) {
      // currently we don't support long term armor ups
      this.armor += armorUpEffects.getDamage();
    }
    if (this.health.getCur() <= 0) {
      GameEmitter.getInstance().emit(GE_GameOver, { gameWon: false });
    }
    this.updateHealth();
  }

  armorModifier(damage: number): number {
    const armorInitial = this.armor;
    if (damage + this.armor < 0) {
      this.armor = 0;
    } else {
      this.armor = damage + this.armor;
    }
    return damage + armorInitial;
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
    let burningTotal = 0;
    this.healthEffectsList.forEach((eot) => {
      const damageIncoming = this.armorModifier(eot.getDamage());
      this.health.causeDamage(damageIncoming);
      if (eot.verb === 'Burn') {
        burningTotal += damageIncoming;
      }
    });
    this.burningIndicator.updateValue(burningTotal);
    this.updateHealth();
  };

  public getRecord(): CDHeroRecord {
    const { id, name, armor, strengthDelta, health, healthEffectsList } = this;
    return {
      id,
      name,
      armor,
      health: health.getRecord(),
      strengthDelta,
      healthEffectsList: healthEffectsList.map((eot) => eot.getRecord()),
    };
  }
}
