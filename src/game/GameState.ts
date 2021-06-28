import { CardGroup } from './CardGroup';
import NumCurMax from './utilities/NumCurMax';
import { EffectsOverTurns } from './utilities/EffectsOverTurns';
import Hero from './Hero';
import { Monster } from './Monster';
import { CardLocation } from './Card';

export default class GameState {
  private deck: CardGroup;
  private hand: CardGroup;
  private discard: CardGroup;
  private hero: Hero;
  private monsters: Monster[];
  private mana: NumCurMax = new NumCurMax(3);
  private strengthDelta = 0;
  private defenseDelta = 0;

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
    return this.deck || [];
  }

  public getHand(): CardGroup {
    return this.hand || [];
  }

  public getDiscard(): CardGroup {
    return this.discard || [];
  }
}