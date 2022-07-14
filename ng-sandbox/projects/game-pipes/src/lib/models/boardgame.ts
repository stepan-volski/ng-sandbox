import { BoardgameType } from "./boardgameType";

export class Boardgame {
  public id: string;
  constructor(
    public name: string,
    public type: BoardgameType,
    public purchaseDate: string,
    public timesPlayed: number,
  ){
    this.id = Math.random().toString(16).slice(2);
  }
}
