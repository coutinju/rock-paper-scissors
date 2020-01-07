import { Shape } from '../../enum/shape.enum';
import { Winner } from '../../enum/winner.enum';

export class Result {
  constructor(
    public player1Shape: Shape,
    public player2Shape: Shape,
    public winner: Winner
  ){}
}