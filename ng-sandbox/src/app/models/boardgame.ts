import { BoardgameType } from './boardgameType';
import { User } from './user';

export class Boardgame {
  public id: string;
  public lentFromUser?: User;
  public lentToUser?: User;
  public lentId?: string;
  constructor(
    public name: string,
    public type: BoardgameType,
    public purchaseDate: string,
    public timesPlayed: number
  ) {
    this.id = Math.random().toString(16).slice(2);
  }
}
