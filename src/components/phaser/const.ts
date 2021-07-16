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
  top: 355,
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
  top: 100,
  bottom: 300,
};
export const heroXCtr = (heroRectangle.left + heroRectangle.right) / 2;
export const heroYCtr = (heroRectangle.top + heroRectangle.bottom) / 2;
export const heroWidth = heroRectangle.right - heroRectangle.left;
export const heroHeight = heroRectangle.bottom - heroRectangle.top;

export type callBack = () => void;
