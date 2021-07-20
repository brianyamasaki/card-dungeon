import Phaser from 'phaser';
import { phaserAssetsFolder } from '../const';

import imageList from '../../../imageList.json';

export class ImageLibrary {
  cardImageKeys: string[] = [];
  monsterImageKeys: string[] = [];
  heroImageKeys: string[] = [];

  preload(scene: Phaser.Scene) {
    const { cardImages, monsterImages, heroImages, errorCardImage } = imageList;
    if (
      cardImages &&
      cardImages.length &&
      monsterImages &&
      monsterImages.length &&
      heroImages &&
      monsterImages.length
    ) {
      this.loadImages(scene, cardImages, this.cardImageKeys);
      this.loadImages(scene, monsterImages, this.monsterImageKeys);
      this.loadImages(scene, heroImages, this.heroImageKeys);
      scene.load.image(
        'errorCardImage',
        `${phaserAssetsFolder}${errorCardImage}`
      );
    } else {
      console.error(
        'imageList.json must have cardImages, monsterImages and heroImages as arrays of URL strings'
      );
    }
  }

  private loadImages(
    scene: Phaser.Scene,
    imageUrls: string[],
    imageKeys: string[]
  ) {
    imageUrls.forEach((imageUrl) => {
      const modKey = imageUrl;
      imageKeys.push(modKey);
      const url = `${phaserAssetsFolder}${imageUrl}`;
      scene.load.image(modKey, url);
    });
  }
}
