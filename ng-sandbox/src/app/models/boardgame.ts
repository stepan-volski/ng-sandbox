import { BoardgameType } from "./boardgameType";

// export type Boardgame = {
//     name: string,
//     type: BoardgameType,
//     purchaseDate: Date,
//     timesPlayed: number,
// }

export class Boardgame {
  constructor(
    public name: string,
    public type: BoardgameType,
    public purchaseDate: Date,
    public timesPlayed: number,
  ){}
}
