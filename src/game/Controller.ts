import { Card } from './Card';
import { CardGroup } from './CardGroup';
import { BattleAction } from './utilities/BattleAction';
import GameState from './GameState';
import Hero from './Hero';
import { Monster } from './Monster';

class Controller {
  gameState:GameState;

  constructor(hero: Hero, monsters: Monster[], deck: CardGroup, hand: CardGroup) {
    this.gameState = new GameState(hero, monsters, deck, hand);
  }
  

  public selectCard(card: Card, action: BattleAction, index?: number) {

  }
  public getGameState() {
    return this.gameState;
  }
}

export default Controller;