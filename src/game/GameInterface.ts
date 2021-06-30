import Controller from "./Controller";
import { CardLocation, Card, CardJson } from "./Card";
import { CardGroup } from './CardGroup';

import Hero, { HeroJson } from "./Hero";
import { Monster, MonsterJson } from "./Monster";
import Action from "./utilities/Action";

import dummyJsonA from './data/cards/dummyA.json';
import dummyJsonB from './data/cards/dummyB.json';
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
      new Card(dummyJsonB as CardJson),
      new Card(dummyJsonA as CardJson),
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

  public playCardInHand(card: Card, action: Action) {
    const gameState = this.controller.getGameState();

    // deal with cost of card
    gameState.subtractFromMana(card.cost);

    // move the card
    gameState.getHand().removeCard(card);
    gameState.getDiscard().addCard(card);

    // TBD carry out damage
  }
}

export default GameInterface;
