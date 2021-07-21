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
    this.mana.resetMana();

    this.handArea
      .addCards(this.deck.removeCards(5))
      .updateCards(this.mana.getCur());
    // monster actions recalculated
    this.monsterArea.chooseActions();

    // hero armor is reset
    this.hero.resetArmor();

    return this;
  }

  playCardInHand(cdCard: CDCard, id: number | null) {
    // moves the card to discard
    this.discard.addCard(this.handArea.removeCard(cdCard.id));
    this.mana.useMana(cdCard.cost);

    // Cause damage
    const monsters = this.monsterArea.findMonsters(id ? [id] : null);
    cdCard.battleActions.playCard(monsters, this.hero);

    // remove dead monsters
    this.monsterArea.checkForDeadMonsters();

    // updates cards so they can be dragged or not depending on mana available
    this.handArea.updateCards(this.mana.getCur());
  }

  // following method must be bound because it's used in a callback
  endTurn = () => {
    // enemy actions occur here
    this.monsterArea.attackHero(this.hero);

    // move cards from hand to discard
    this.discard.addCards(this.handArea.removeAllCards());

    // reset enemy armor to 0
    this.monsterArea.resetArmor();

    // increment Effects indexes

    // prepare for the player
    this.startTurn();
  };
}
