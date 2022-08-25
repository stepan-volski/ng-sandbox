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
    public imageUrl: string = '../../../assets/game-icon.png',
    public description: string = '',
  ) {
    this.id = Math.random().toString(16).slice(2);
  }
}
