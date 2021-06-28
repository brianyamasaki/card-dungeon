import { BattleAction, BattleActionJson } from './utilities/BattleAction';

export enum CardLocation {
  Deck,
  Discard,
  Hand
}

export type CardJson = {
  name:string,
  description:string;
  imageUrl:string;
  cost:number;
  actions: BattleActionJson[];
}

export class Card {
  static currentIndex = 0;
  index;
  name;
  description;
  imageUrl; 
  cost;
  actions: BattleAction[];
  private _isSelected: boolean = false;
  location:CardLocation = CardLocation.Deck;

  constructor(json: CardJson) {
    const {name, description, imageUrl, cost, actions} = json;

    this.index = Card.currentIndex++;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.cost = cost;
    this.actions = actions.map((json: BattleActionJson) => new BattleAction(json))
  }

  public toGroup(group: CardLocation) {
    this.location = group;
  }

  // following allow setting isSelected IFF in your hand.
  set isSelected(toSelect: boolean) {
    if (this.location === CardLocation.Hand) {
      this._isSelected = toSelect;
    }
  }

  // following allows getting isSelected from _isSelected;
  get isSelected() {
    return this._isSelected;
  }

}

