export enum BattleTarget {
  TargetSelf = "targetSelf",
  TargetEnemy = "targetEnemy",
  TargetAllEnemies = "targetAll",
  TargetHero = "targetHero"
  // if you add anything here, please add it to objBattleTarget for quick value checking
};

// Allows a fast check that battle target string is one of the above.
export const objBattleTarget = {
  [BattleTarget.TargetSelf]: true,
  [BattleTarget.TargetEnemy]: true,
  [BattleTarget.TargetAllEnemies]: true,
  [BattleTarget.TargetHero]: true
};