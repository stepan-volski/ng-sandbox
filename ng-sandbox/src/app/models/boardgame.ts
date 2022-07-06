import { BoardgameType } from "./boardgameType";

export class Boardgame {
  constructor(
    public name: string,
    public type: BoardgameType,
    public purchaseDate: string,
    public timesPlayed: number,
  ){}
}
