import { Shape } from '../../enum/shape.enum';

export class Request {
  constructor(
    public player1ShapeSelected: Shape
  ) {}
}