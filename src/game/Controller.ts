import { CardGroup } from './CardGroup';
import GameState from './GameState';
import Hero from './Hero';
import { Card } from './Card';
import { Monster } from './Monster';

class Controller {
  gameState: GameState;

  constructor(
    hero: Hero,
    monsters: Monster[],
    deck: CardGroup,
    hand: CardGroup
  ) {
    this.gameState = new GameState(hero, monsters, deck, hand);
  }

  public playCardInHand(card: Card, targetIds: number[] | null) {
    const gameState = this.gameState;
    // deal with cost of card
    gameState.subtractFromMana(card.cost);

    // move the card
    let movedCard = gameState.getHand().removeCard(card.id);
    if (movedCard) {
      gameState.getDiscard().addCard(movedCard);
    }

    // TBD carry out damage
  }

  public getGameState() {
    return this.gameState;
  }
}

export default Controller;
