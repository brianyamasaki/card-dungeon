import { Card, CardLocation } from './Card';
export class CardGroup {
  cards: Card[];
  location: CardLocation;

  constructor(location: CardLocation, cards: Card[]) {
    this.location = location || CardLocation.Deck;
    this.cards = cards || [];
  }

  // add card to group
  public addCard(card: Card) {
    this.cards.push(card);
    card.toGroup(this.location);
  }

  // remove card from group
  public removeCard(card: Card) {
    // use the filter method to create an all new array for everything except the passed in card
    this.cards = this.cards.filter((item: Card) => item.id !== card.id);
  }

  // shuffle cards in group
  public shuffle() {
    console.error('Not Yet Implemented');
  }

  public getCards(): Card[] {
    return this.cards;
  }

}