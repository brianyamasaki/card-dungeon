export type RNumCurMax = {
  max: number;
  cur: number;
};

export const initRNumCurMax: RNumCurMax = {
  max: 0,
  cur: 0
}

export default class NumCurMax {
  max = 0;
  delta = 0;
  constructor(max: number) {
    this.max = max;
  }

  public setDelta(delta:number) {
    this.delta = delta
  }

  public addToDelta(delta:number) {
    this.delta += delta;
  }

  public increaseMax(delta: number) {
    this.max += delta;
  }

  public getCur() {
    return this.max - this.delta;
  }

  public getMax(){
    return this.max;
  }

  public getRNumCurMax() {
    return {
      max: this.max,
      cur: this.max - this.delta
    };
  }

  public toString() {
    return `${this.getCur()} / ${this.max}`;
  }
}

