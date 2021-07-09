export const splashScreenId = 'SplashScreen';
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

export const handRectangle = {
  left: 100,
  right: 900,
  top: 355,
  bottom: 580,
};

export type callBack = () => void;
