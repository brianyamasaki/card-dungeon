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

export const cardIdMin = 5000;

export class Card {
  static currentIndex = cardIdMin;
  id;
  name;
  description;
  imageUrl; 
  cost;
  actions: BattleAction[];
  private _isSelected: boolean = false;
  location:CardLocation = CardLocation.Deck;

  constructor(json: CardJson) {
    const {name, description, imageUrl, cost, actions} = json;

    this.id = Card.currentIndex++;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.cost = cost;
    this.actions = actions.map((json: BattleActionJson) => new BattleAction(json))
    if (!json.name || !json.description || json.cost === undefined || json.actions === undefined) {
      const str = `error loading Card - name:${name}, description:${description}, cost:${cost}, actions:${actions}`;
      console.error(str);
    }
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

