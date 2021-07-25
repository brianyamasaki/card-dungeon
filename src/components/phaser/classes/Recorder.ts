import { CDCard, CDCardRecord } from '../scenes/classes/CDCard';
import { CDMonster, CDMonsterRecord } from '../scenes/classes/CDMonster';
import {
  CDHero,
  CDHeroRecord,
  initCDHeroRecord,
} from '../scenes/classes/CDHero';
import { BattleActions } from './BattleActions';

export type CardPlay = {
  card: CDCard;
  battleAction: BattleActions;
  monsterIds: number[];
};

export type MonsterAction = {
  monsterId: number;
  battleActions: BattleActions;
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

export class Recorder {
  turns: Turn[] = [];
  currentTurn: Turn;

  constructor() {
    this.currentTurn = this.initTurn();
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

  monsterActions(monsterId: number, battleActions: BattleActions) {
    this.currentTurn.monsterActions.push({ monsterId, battleActions });
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
  }

  serialize() {
    var dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(this.turns));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'savedState' + '.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}
