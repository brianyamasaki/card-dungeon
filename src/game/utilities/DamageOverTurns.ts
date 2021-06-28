export type DamageOverTurnsJson = {
  name:string;
  damageArray:number[];
}

export class DamageOverTurns {
  name:string;
  currentIndex;
  damagePerTurn:number[];
  expired = false;

  constructor(damageOverTurns: DamageOverTurnsJson) {
    this.name = damageOverTurns.name;
    this.currentIndex = 0;
    this.damagePerTurn = damageOverTurns.damageArray;
  }

  // increment currentIndex and set expired if true
  public nextTurn() {
    if (this.expired) return;
    this.currentIndex += 1;
    if (this.currentIndex >= this.damagePerTurn.length) {
      this.expired = true;
    }
  }

  public getDamage() {
    return this.damagePerTurn[this.currentIndex];
  }

  public toString() {
    return `${this.name} (-${this.getDamage()})`
  }

}