export class User {
  constructor(
    public email: string,
    public id: string,
    public createdDateStamp: number
  ) {}

  isUserExpired() {
    return this.createdDateStamp + 60 * 60 * 1000 < new Date().getTime();
  }
}
