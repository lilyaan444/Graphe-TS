import { Disc } from "./disc";

export class HanoiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HanoiError";
  }
}

export class Tower {
  private _discs: Disc[];

  constructor() {
    this._discs = [];
  }

  isEmpty(): boolean {
    return this._discs.length === 0;
  }

  size(): number {
    return this._discs.length;
  }

  get topDisc(): Disc {
    if (this.isEmpty()) throw new HanoiError("No disc");
    return this._discs[this._discs.length - 1];
  }

  addDisc(disc: Disc): void {
    if (!this.isEmpty() && this._discs[this._discs.length - 1].value < disc.value)
      throw new HanoiError("Disc is too big");
    this._discs.push(disc);
  }

  removeDisc(): Disc {
    if (this.isEmpty()) throw new HanoiError("No disc to remove");
    return this._discs.pop()!;
  }

  toString(): string {
    return this._discs.map((disc) => disc.value).join(" ");
  }
}
