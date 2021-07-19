import { CardJson, HeroJson, MonsterJson } from '../../../constJson';

// loading JSON using Webpack at compile time
import blockJson from '../../../game/data/cards/block.json';
import fireballJson from '../../../game/data/cards/fireball.json';
import leechJson from '../../../game/data/cards/leech.json';
import poisonDartJson from '../../../game/data/cards/leech.json';

import heroAJson from '../../../game/data/heroes/heroA.json';
import monsterAJson from '../../../game/data/monsters/monsterA.json';

const cardList = [blockJson, fireballJson, leechJson, poisonDartJson];

const heroList = [heroAJson];
const monsterList = [monsterAJson];

type CardJsonItem = {
  name: string;
  data: CardJson;
};
type HeroJsonItem = {
  name: string;
  data: HeroJson;
};
type MonsterJsonItem = {
  name: string;
  data: MonsterJson;
};

export class AssetLibrary {
  cardsJson: CardJsonItem[] = [];
  monstersJson: MonsterJsonItem[] = [];
  heroesJson: HeroJsonItem[] = [];

  public preload() {
    cardList.forEach((json) => {
      this.cardsJson.push({
        name: json.name,
        data: json,
      });
    });
    heroList.forEach((json) => {
      this.heroesJson.push({
        name: json.name,
        data: json,
      });
    });
    monsterList.forEach((json) => {
      this.monstersJson.push({
        name: json.name,
        data: json,
      });
    });
  }

  public getCardJson(name: string): CardJson | null {
    const foundItem = this.cardsJson.find((item) => item.name === name);
    if (foundItem) {
      return foundItem.data;
    }
    return null;
  }

  public getAllCardsJson(): CardJson[] {
    return this.cardsJson.map((item) => item.data);
  }

  public getHeroJson(name: string): HeroJson | null {
    const foundItem = this.heroesJson.find((item) => item.name === name);
    if (foundItem) {
      return foundItem.data;
    }
    return null;
  }

  public getMonsterJson(name: string): MonsterJson | null {
    const foundItem = this.monstersJson.find((item) => item.name === name);
    if (foundItem) {
      return foundItem.data;
    }
    return null;
  }

  public getRandomHero(): HeroJson {
    if (this.heroesJson.length === 1) {
      return this.heroesJson[0].data;
    } else {
      const i = Math.trunc(Math.random() * this.heroesJson.length);
      return this.heroesJson[i].data;
    }
  }

  public getRandomMonster(): MonsterJson {
    if (this.monstersJson.length === 1) {
      return this.monstersJson[0].data;
    } else {
      const i = Math.trunc(Math.random() * this.monstersJson.length);
      return this.monstersJson[i].data;
    }
  }
}
