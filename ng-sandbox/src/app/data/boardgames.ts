import { Boardgame } from "../models/boardgame";

export const boardgames: Boardgame[] = [
  {
    name: 'Bang',
    type: 'party',
    purchaseDate: new Date(2021, 11, 23),
    timesPlayed: 20,
  },
  {
    name: '7 Wonders',
    type: 'amero',
    purchaseDate: new Date(2020, 6, 14),
    timesPlayed: 15,
  },
  {
    name: 'Munchkin',
    type: 'party',
    purchaseDate: new Date(2020, 6, 14),
    timesPlayed: 7,
  },
  {
    name: 'Jaipur',
    type: 'euro',
    purchaseDate: new Date(2015, 5, 23),
    timesPlayed: 9,
  },
  {
    name: 'Patchwork',
    type: 'amero',
    purchaseDate: new Date(2014, 11, 9),
    timesPlayed: 11,
  },
  {
    name: 'Alias',
    type: 'party',
    purchaseDate: new Date(2022, 7, 11),
    timesPlayed: 25,
  },
]
