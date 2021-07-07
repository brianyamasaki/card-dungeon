import { BattleActions, BattleActionsJson, RBattleAction } from './utilities/BattleActions';

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
  battleActions: BattleActionsJson;
}

export const cardIdMin = 5000;

export type RCard = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  cost: number;
  battleActions: RBattleAction;
}

export class Card {
  static currentIndex = cardIdMin;
  id;
  name;
  description;
  imageUrl; 
  cost;
  battleActions: BattleActions;
  private _isSelected: boolean = false;
  location:CardLocation = CardLocation.Deck;

  constructor(json: CardJson) {
    const {name, description, imageUrl, cost} = json;

    this.id = Card.currentIndex++;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.cost = cost;
    this.battleActions = new BattleActions(json.battleActions);
    if (!json.name || !json.description || json.cost === undefined || json.battleActions === undefined) {
      const str = `error loading Card - name:${name}, description:${description}, cost:${cost}, battleActions:${this.battleActions}`;
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

  public getRCard(): RCard {
    const { id, name, description, imageUrl, cost} = this;
    return {
      id,
      name, 
      description,
      imageUrl,
      cost,
      battleActions: this.battleActions.getRBattleAction()
    }
  }

}

