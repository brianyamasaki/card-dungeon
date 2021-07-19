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
    this.handArea.addCards(this.deck.removeCards(5));
    return this;
  }

  playCardInHand(cdCard: CDCard, id: number | null) {
    // moves the card to discard
    this.discard.addCard(this.handArea.removeCard(cdCard.id));
    this.mana.useMana(cdCard.cost);
    this.handArea.updateCards(this.mana.getCur());
  }

  // following must be bound
  endTurn = () => {
    // what do we do here?

    console.log('end turn');
    this.discard.addCards(this.handArea.removeAllCards());

    this.mana.resetMana();
  };

  getImageLibrary() {
    return this.imageLibrary;
  }

  getAssetLibrary() {
    return this.assetLibrary;
  }
}
