import mongoose, { Schema, Document } from 'mongoose';
import dieSchema, { Die, defaultDice } from './dice';
import playerSchema, { Player } from './player';
import { RollsPerRound } from './constants';

export enum GameStatus {
  New = 'new',
  Rolling = 'rolling',
  Moving = 'moving',
  Complete = 'complete'
}

export interface Game extends Document {
  name: string;
  dice: Die[];
  status: GameStatus;
  round: number;
  rollsRemainingInRound: number;
  currentRoller: number;
  players: Player[];
}
 
const gameSchema = new Schema({
  name: { type: String, required: true },
  dice: { type: [dieSchema], required: true, default: defaultDice },
  status: { type: String, required: true, enum: Object.values(GameStatus), default: GameStatus.New },
  round: { type: Number, required: true, default: 1 },
  rollsRemainingInRound: { type: Number, required: true, default: RollsPerRound },
  currentRoller: { type: Number, required: true, default: 0 },
  players: { type: [playerSchema], required: true }
});
 
const GameModel = mongoose.model<Game>('Game', gameSchema);
 
export default GameModel;