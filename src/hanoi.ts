import * as readlineSync from "readline-sync";
import { Disc } from "./disc";
import { HanoiError, Tower } from "./tower";

export class Hanoi {
  private _towers: Tower[];
  private _nbDiscs: number;

  constructor(nbTowers: number, nbDisc: number) {
    this._towers = [];
    for (let i = 0; i < nbTowers; i++) {
      this._towers.push(new Tower());
    }
    for (let i = nbDisc; i > 0; i--) {
      this._towers[0].addDisc(new Disc(i));
    }
    this._nbDiscs = nbDisc;
  }

  print(): void {
    for (let i = 0; i < this._towers.length; i++) {
      console.log(`Tower ${i}: ` + this._towers[i].toString());
    }
  }

  private askTower(message: string): number {
    const index = Number(readlineSync.question(message));

    if (index < 0 || index >= this._towers.length) throw new HanoiError("Invalid tower");

    return index;
  }

  private turn(): void {
    this.print();

    const from = this.askTower("From : ");
    const disc = this._towers[from].topDisc;
    const to = this.askTower("To : ");

    this._towers[to].addDisc(disc);
    this._towers[from].removeDisc();
  }

  play(): number {
    let nbMoves = 0;

    while (this._towers[this._towers.length - 1].size() < this._nbDiscs) {
      this.turn();
      nbMoves++;
    }

    return nbMoves;
  }
}
