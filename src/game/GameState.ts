import { CardGroup } from './CardGroup';
import NumCurMax, { initRNumCurMax, RNumCurMax } from './utilities/NumCurMax';
import { EffectsOverTurns, REffectsOverTurns } from './utilities/EffectsOverTurns';
import Hero, {initRHero, RHero} from './Hero';
import { Monster, RMonster } from './Monster';
import { CardLocation, RCard } from './Card';

export type RGameState = {
  deck: RCard[];
  hand: RCard[];
  discard: RCard[];
  hero: RHero;
  monsters: RMonster[];
  mana: RNumCurMax;
  strengthDelta: number;
  defenseDelta: number;
  damageOverTurns: REffectsOverTurns[];
};

export const initRGameState: RGameState = {
  deck: [] as RCard[],
  hand: [] as RCard[],
  discard: [] as RCard[],
  hero: initRHero,
  monsters: [] as RMonster[],
  mana: initRNumCurMax,
  strengthDelta: 0,
  defenseDelta: 0,
  damageOverTurns: [] as REffectsOverTurns[]
};

export default class GameState {
  private deck: CardGroup;
  private hand: CardGroup;
  private discard: CardGroup;
  private hero: Hero;
  private monsters: Monster[];
  private mana: NumCurMax = new NumCurMax(3);
  private strengthDelta = 2;
  private defenseDelta = -1;

  // Burning, Poison and other things that damage multiple points over turns get added here
  damageOverTurns: EffectsOverTurns[] = [];

  constructor(hero:Hero, monsters: Monster[], deck: CardGroup, hand: CardGroup) {
    this.hero = hero;
    this.monsters = monsters;

    this.deck = deck;
    this.hand = hand;
    this.discard = new CardGroup(CardLocation.Discard, []);
  }

  public getHero(): Hero {
    return this.hero;
  }

  public getMonsters(): Monster[] {
    return this.monsters;
  }
  
  public getDeck(): CardGroup {
    return this.deck;
  }

  public getHand(): CardGroup {
    return this.hand;
  }

  public getDiscard(): CardGroup {
    return this.discard;
  }

  public getRDeck(): RCard[] {
    return this.deck.getCards().map(card => card.getRCard());
  }

  public getRHand(): RCard[] {
    return this.hand.getCards().map(card => card.getRCard());
  }

  public getRDiscard(): RCard[] {
    return this.discard.getCards().map(card => card.getRCard());
  }

  public getRMana(): RNumCurMax {
    return this.mana.getRNumCurMax();
  }

  public getStrength(): number {
    return this.strengthDelta;
  }

  public getDefense(): number {
    return this.defenseDelta;
  }

  public getRGameState(): RGameState {
    const { strengthDelta, defenseDelta } = this;
  
    return {
      deck: this.deck.getRCards(),
      hand: this.hand.getRCards(),
      discard: this.discard.getRCards(),
      hero: this.hero.getRHero(),
      monsters: this.monsters.map(monster => monster.getRMonster()),
      mana: this.mana.getRNumCurMax(),
      strengthDelta,
      defenseDelta,
      damageOverTurns: this.damageOverTurns.map(dot => dot.getREffectsOverTurns())
    }
  }

  public subtractFromMana(cost: number) {
    this.mana.addToDelta(cost);
  }
}
