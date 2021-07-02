import { Card, CardLocation, RCard } from './Card';
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
  public removeCard(cardId: number): Card | null {
    let removedCard: Card | null = null;
    // use the filter method to create an all new array for everything except the passed in card
    this.cards = this.cards.filter((item: Card) => {
      if (item.id !== cardId) {
        return true;
      }
      removedCard = item;
      return false;
    });
    return removedCard;
  }

  // shuffle cards in group
  public shuffle() {
    console.error('Not Yet Implemented');
  }

  public getCards(): Card[] {
    return this.cards;
  }

  public getRCards(): RCard[] {
    return this.cards.map(card => card.getRCard());
  }

}