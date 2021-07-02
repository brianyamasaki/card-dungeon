import Controller from "./Controller";
import { CardLocation, Card, CardJson, RCard } from "./Card";
import { CardGroup } from './CardGroup';
import { RBattleAction } from "./utilities/BattleAction";

import Hero, { HeroJson } from "./Hero";
import { Monster, MonsterJson } from "./Monster";

// import dummyJsonA from './data/cards/dummyA.json';
// import dummyJsonB from './data/cards/dummyB.json';
import fireballJson from './data/cards/fireball.json';
import blockJson from './data/cards/block.json';
import poisonDartJson from './data/cards/poisonDart.json';
import leechJson from './data/cards/leech.json';
import heroJsonA from './data/heroes/heroA.json';
import monsterJsonA from './data/monsters/monsterA.json';


export var gameInterface: GameInterface | null = null;

class GameInterface {
  controller: Controller;

  constructor() {
    const cards: Card[] = [
      new Card(fireballJson as CardJson),
      new Card(blockJson as CardJson),
      new Card(poisonDartJson as CardJson),
      new Card(leechJson as CardJson)
    ];
    const deck = new CardGroup(CardLocation.Deck, cards);
    const handCards: Card[] = [
      new Card(fireballJson as CardJson),
      new Card(blockJson as CardJson),
      new Card(poisonDartJson as CardJson),
      new Card(leechJson as CardJson)
    ];
    const hand = new CardGroup(CardLocation.Hand, handCards);
    const hero = new Hero(heroJsonA as HeroJson)
    const monsters:Monster[] = [
      new Monster(monsterJsonA as MonsterJson),
      new Monster(monsterJsonA as MonsterJson)
    ];
    this.controller = new Controller(hero, monsters, deck, hand);
    gameInterface = this;
  }

  public getController() {
    return this.controller;
  }

  public getGameState() {
    return this.controller.getGameState();
  }

  public playCardInHand(card: RCard, battleAction: RBattleAction, targetIds: number[]) {
    const gameState = this.controller.getGameState();
    let movedCard: Card | null;

    // deal with cost of card
    gameState.subtractFromMana(card.cost);

    // move the card
    movedCard = gameState.getHand().removeCard(card.id);
    if (movedCard) {
      gameState.getDiscard().addCard(movedCard);
    }

    // TBD carry out damage
  }
}

export default GameInterface;
