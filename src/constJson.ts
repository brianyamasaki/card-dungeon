export type ActionJson = {
  description: string;
  verb: string;
  target: string;
  healthEffects: number[];
  armorUpEffects: number[];
};

export type BattleActionsJson = {
  actionsCountMax: number;
  actions: ActionJson[];
};

export type CardJson = {
  name: string;
  description: string;
  imageUrl: string;
  cost: number;
  battleActions: BattleActionsJson;
};

export type HeroJson = {
  name: string;
  description?: string;
  imageUrl: string;
  health: number;
  armor: number;
};

export type MonsterJson = {
  name: string;
  description: string;
  imageUrl: string;
  armor: number;
  health: number;
  battleActions: BattleActionsJson;
};
