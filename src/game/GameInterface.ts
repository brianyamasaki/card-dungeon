import Controller from './Controller';
import { CardLocation, Card, RCard } from './Card';
import { CardGroup } from './CardGroup';
import { RAction } from '../components/phaser/classes/Action';

import Hero from './Hero';
import { Monster } from './Monster';
import { CardJson, HeroJson, MonsterJson } from '../constJson';

// import dummyJsonA from './data/cards/dummyA.json';
// import dummyJsonB from './data/cards/dummyB.json';
// import fireballJson from './data/cards/fireball.json';
// import blockJson from './data/cards/block.json';
// import poisonDartJson from './data/cards/poisonDart.json';
// import leechJson from './data/cards/leech.json';
import heroJsonA from './data/heroes/heroA.json';
// import monsterJsonA from './data/monsters/monsterA.json';

export var gameInterface: GameInterface | null = null;

class GameInterface {
  controller: Controller;

  constructor() {
    const cards: Card[] = [
      // new Card(fireballJson as CardJson),
      // new Card(blockJson as CardJson),
      // new Card(poisonDartJson as CardJson),
      // new Card(leechJson as CardJson),
    ];
    const deck = new CardGroup(CardLocation.Deck, cards);
    const handCards: Card[] = [
      // new Card(fireballJson as CardJson),
      // new Card(blockJson as CardJson),
      // new Card(poisonDartJson as CardJson),
      // new Card(leechJson as CardJson),
    ];
    const hand = new CardGroup(CardLocation.Hand, handCards);
    const hero = new Hero(heroJsonA as HeroJson);
    const monsters: Monster[] = [
      // new Monster(monsterJsonA as MonsterJson),
      // new Monster(monsterJsonA as MonsterJson),
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

  public playCardInHand(card: RCard, action: RAction, targetIds: number[]) {
    const gameState = this.controller.getGameState();
    let movedCard: Card | null;

    // deal with cost of card
    gameState.subtractFromMana(card.cost);

    // TBD carry out damage
    if (action.healthEffects) {
      const effect = action.healthEffects.effect;

      targetIds.forEach((id) => {
        const foundMonster = gameState.getMonster(id);

        if (foundMonster) {
          foundMonster.healthEffect(effect);
        } else if (gameState.getHero().id === id) {
          gameState.getHero().healthEffect(effect);
        }
      });
    }

    // move the card
    movedCard = gameState.getHand().removeCard(card.id);
    if (movedCard) {
      gameState.getDiscard().addCard(movedCard);
    }
  }
}

export default GameInterface;
