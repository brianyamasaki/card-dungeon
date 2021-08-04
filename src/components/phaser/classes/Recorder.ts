import { CDCard, CDCardRecord } from '../scenes/classes/CDCard';
import { CDMonster, CDMonsterRecord } from '../scenes/classes/CDMonster';
import {
  CDHero,
  CDHeroRecord,
  initCDHeroRecord,
} from '../scenes/classes/CDHero';
import { BattleActions } from './BattleActions';
import { Action } from './Action';
import { GameEmitter, GE_EndTurnRecorded } from './GameEmitter';

export type CardPlay = {
  card: CDCard;
  battleAction: BattleActions;
  monsterIds: number[];
};

export type MonsterAction = {
  monsterId: number;
  action: Action;
};

export type Turn = {
  start: {
    hand: CDCardRecord[];
    monsters: CDMonsterRecord[];
    discard: CDCardRecord[];
  };
  cardsPlayed: CDCardRecord[];
  monsterActions: MonsterAction[];
  end: {
    hand: CDCardRecord[];
    monster: CDMonsterRecord[];
    discard: CDCardRecord[];
    hero: CDHeroRecord;
  };
};

const initTurn: Turn = {
  start: {
    hand: [],
    monsters: [],
    discard: [],
  },
  cardsPlayed: [],
  monsterActions: [],
  end: {
    hand: [],
    monster: [],
    discard: [],
    hero: initCDHeroRecord,
  },
};

let instance: Recorder | null = null;

export class Recorder {
  turns: Turn[] = [];
  currentTurn: Turn;

  constructor() {
    this.currentTurn = this.initTurn();
  }

  static getInstance(): Recorder {
    if (instance === null) {
      instance = new Recorder();
    }
    return instance;
  }

  initTurn(): Turn {
    return Object.assign({}, initTurn);
  }

  startTurn(hand: CDCard[], monsters: CDMonster[], discard: CDCard[]) {
    const start = this.currentTurn.start;

    start.hand = hand.map((cdCard) => cdCard.getRecord());
    start.monsters = monsters.map((cdMonster) => cdMonster.getRecord());
    start.discard = discard.map((cdCard) => cdCard.getRecord());
  }

  playCard(card: CDCard) {
    this.currentTurn.cardsPlayed.push(card.getRecord());
  }

  monsterActions(monsterId: number, action: Action) {
    this.currentTurn.monsterActions.push({ monsterId, action });
  }

  endTurn(
    hand: CDCard[],
    monsters: CDMonster[],
    discard: CDCard[],
    hero: CDHero
  ) {
    const { end } = this.currentTurn;
    end.hand = hand.map((card) => card.getRecord());
    end.monster = monsters.map((cdMonster) => cdMonster.getRecord());
    end.discard = discard.map((card) => card.getRecord());
    end.hero = hero.getRecord();

    this.turns.push(this.currentTurn);
    this.currentTurn = this.initTurn();
    GameEmitter.getInstance().emit(GE_EndTurnRecorded);
  }

  serialize() {
    var dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(this.turns));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'savedState.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}
