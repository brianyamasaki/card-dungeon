export const splashScreenId = 'SplashScreen';
export const startGameScreenId = 'StartGame';
export const gameScreenId = 'GameScreen';

export const phaserAssetsFolder = 'assets/phaser/';

export const cardDimensions = {
  height: 225,
  width: 150,
};

export const cardPadding = 5;

export const cardAspectRatio = cardDimensions.height / cardDimensions.width;

export const paddedGameRectangle = {
  top: 20,
  bottom: 580,
  left: 20,
  right: 980,
};

// area for cards within the game
export const handRectangle = {
  left: 100,
  right: 900,
  top: 420,
  bottom: 580,
};
export const handXctr = (handRectangle.right + handRectangle.left) / 2;
export const handYctr = (handRectangle.bottom + handRectangle.top) / 2;
export const handWidth = handRectangle.right - handRectangle.left;
export const handHeight = handRectangle.bottom - handRectangle.top;

// area for monster within the game
export const monsterRectangle = {
  left: 450,
  right: 900,
  top: 20,
  bottom: 350,
};
export const monsterXctr = (monsterRectangle.left + monsterRectangle.right) / 2;
export const monsterYctr = (monsterRectangle.top + monsterRectangle.bottom) / 2;

export const heroRectangle = {
  left: 100,
  right: 300,
  top: 150,
  bottom: 350,
};
export const heroXCtr = (heroRectangle.left + heroRectangle.right) / 2;
export const heroYCtr = (heroRectangle.top + heroRectangle.bottom) / 2;
export const heroWidth = heroRectangle.right - heroRectangle.left;
export const heroHeight = heroRectangle.bottom - heroRectangle.top;

export const arenaRectangle = {
  left: 100,
  right: 450,
  top: paddedGameRectangle.top,
  bottom: handRectangle.top - 10,
};

export const arenaXCtr = (arenaRectangle.left + arenaRectangle.right) / 2;
export const arenaYCtr = (arenaRectangle.top + arenaRectangle.bottom) / 2;
export const arenaWidth = arenaRectangle.right - arenaRectangle.left;
export const arenaHeight = arenaRectangle.bottom - arenaRectangle.top;

export const deckRectangle = {
  left: 10,
  right: 90,
  top: 510,
  bottom: 590,
};
export const deckXCtr = (deckRectangle.left + deckRectangle.right) / 2;
export const deckYCtr = (deckRectangle.top + deckRectangle.bottom) / 2;
export const deckWidth = deckRectangle.right - deckRectangle.left;
export const deckHeight = deckRectangle.bottom - deckRectangle.top;

export const discardRectangle = {
  left: 910,
  right: 990,
  top: 510,
  bottom: 590,
};
export const discardXCtr = (discardRectangle.left + discardRectangle.right) / 2;
export const discardYCtr = (discardRectangle.top + discardRectangle.bottom) / 2;
export const discardWidth = discardRectangle.right - discardRectangle.left;
export const discardHeight = discardRectangle.bottom - discardRectangle.top;

export const endTurnRectangle = {
  left: 910,
  right: 990,
  top: 450,
  bottom: 500,
};

export const endTurnXCtr = (endTurnRectangle.left + endTurnRectangle.right) / 2;
export const endTurnYCtr = (endTurnRectangle.top + endTurnRectangle.bottom) / 2;
export const endTurnWidth = endTurnRectangle.right - endTurnRectangle.left;
export const endTurnHeight = endTurnRectangle.bottom - endTurnRectangle.top;

export const manaRectangle = {
  left: 10,
  right: 80,
  top: 450,
  bottom: 500,
};
export const manaXCtr = (manaRectangle.left + manaRectangle.right) / 2;
export const manaYCtr = (manaRectangle.top + manaRectangle.bottom) / 2;
export const manaWidth = manaRectangle.right - manaRectangle.left;
export const manaHeight = manaRectangle.bottom - manaRectangle.top;

export type callBack = () => void;

export const nameTextStyle = {
  fontFamily: 'Arial, sans serif',
  fontSize: '20px',
  color: 'black',
  align: 'center',
};

export const statsTextStyle = {
  fontFamily: 'Arial, sans serif',
  fontSize: '16px',
  color: 'black',
  align: 'center',
};
