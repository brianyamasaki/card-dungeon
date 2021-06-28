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

  public toString() {
    return `${this.getCur()} / ${this.max}`;
  }
}

