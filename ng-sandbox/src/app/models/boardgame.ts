import { BoardgameType } from './boardgameType';
import { User } from './user';

export class Boardgame {
  public id: string;
  public borrower?: User;
  constructor(
    public name: string,
    public type: BoardgameType,
    public purchaseDate: string,
    public timesPlayed: number,
    public owner: User,
  ) {
    this.id = Math.random().toString(16).slice(2);
  }
}
