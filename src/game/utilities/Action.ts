import { EffectsOverTurns, REffectsOverTurns } from './EffectsOverTurns';
import { BattleTarget, objBattleTarget } from './BattleTarget';
import { ActionJson } from '../../constJson';

export type RAction = {
  description: string;
  verb: string;
  target: BattleTarget;
  healthEffects: REffectsOverTurns | null;
  armorUpEffects: REffectsOverTurns | null;
};

export class Action {
  description: string;
  verb: string;
  target: BattleTarget;
  healthEffects: EffectsOverTurns | null;
  armorUpEffects: EffectsOverTurns | null;

  constructor(json: ActionJson) {
    if (json.description === undefined || json.verb === undefined) {
      console.error(`description or verb cannot be empty`);
    }
    this.description = json.description;
    this.verb = json.verb;
    if (objBattleTarget[json.target as BattleTarget]) {
      this.target = json.target as BattleTarget;
    } else {
      this.target = BattleTarget.TargetAllEnemies;
      console.error(`${json.target} is not a valid target`);
    }
    this.healthEffects = new EffectsOverTurns(
      this.description,
      this.target,
      json.healthEffects || []
    );
    this.armorUpEffects = new EffectsOverTurns(
      this.description,
      this.target,
      json.armorUpEffects || []
    );
  }

  public getRAction(): RAction {
    return {
      description: this.description,
      verb: this.verb,
      target: this.target,
      healthEffects: this.healthEffects
        ? this.healthEffects.getREffectsOverTurns()
        : null,
      armorUpEffects: this.armorUpEffects
        ? this.armorUpEffects.getREffectsOverTurns()
        : null,
    };
  }
}
