import { ImageLibrary } from '../../classes/ImageLibrary';
import { AssetLibrary } from '../../classes/AssetLibrary';
import { HandArea } from './HandArea';
import { MonsterArea } from './MonsterArea';
import { CDHero } from './CDHero';
import { CDDeck } from './CDDeck';
import { CDDiscard } from './CDDiscard';
import { CDMana } from './CDMana';
import { CDMonster } from './CDMonster';
import { CDCard } from './CDCard';

export class CDController {
  imageLibrary: ImageLibrary;
  assetLibrary: AssetLibrary;
  handArea: HandArea;
  monsterArea: MonsterArea;
  hero: CDHero;
  deck: CDDeck;
  discard: CDDiscard;
  mana: CDMana;

  constructor(
    imageLibrary: ImageLibrary,
    assetLibrary: AssetLibrary,
    handArea: HandArea,
    monsterArea: MonsterArea,
    hero: CDHero,
    deck: CDDeck,
    discard: CDDiscard,
    mana: CDMana
  ) {
    this.imageLibrary = imageLibrary;
    this.assetLibrary = assetLibrary;
    this.handArea = handArea;
    this.monsterArea = monsterArea;
    this.hero = hero;
    this.deck = deck;
    this.discard = discard;
    this.mana = mana;
    deck.setupDiscard(discard);
  }

  startGame(monsters: CDMonster[], cards: CDCard[]) {
    this.monsterArea.addMonsters(monsters);
    this.deck.addCards(cards).shuffle();
    return this;
  }

  startTurn() {
    this.handArea
      .addCards(this.deck.removeCards(5))
      .updateCards(this.mana.getCur());
    this.monsterArea.chooseActions();
    return this;
  }

  playCardInHand(cdCard: CDCard, id: number | null) {
    // moves the card to discard
    this.discard.addCard(this.handArea.removeCard(cdCard.id));
    this.mana.useMana(cdCard.cost);

    // Cause damage
    const monsters = this.monsterArea.findMonsters(id ? [id] : null);
    cdCard.battleActions.playCard(monsters, this.hero);

    // Phaser code
    this.handArea.updateCards(this.mana.getCur());
  }

  // following must be bound because it's used in a callback
  endTurn = () => {
    // what do we do here?

    // move cards from hand to discard
    this.discard.addCards(this.handArea.removeAllCards());

    // if (action.healthEffects) {
    //   const effect = action.healthEffects.effect;

    //   targetIds.forEach((id) => {
    //     const foundMonster = gameState.getMonster(id);

    //     if (foundMonster) {
    //       foundMonster.healthEffect(effect);
    //     } else if (gameState.getHero().id === id) {
    //       gameState.getHero().healthEffect(effect);
    //     }
    //   });
    // }

    this.mana.resetMana();

    // increment Effects indexes

    // prepare for the player
    this.startTurn();
  };
}
