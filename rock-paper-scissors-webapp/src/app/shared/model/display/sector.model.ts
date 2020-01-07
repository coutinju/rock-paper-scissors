import { Point } from './point.model';
import { Shape } from '../../enum/shape.enum';

export class Sector {
  public path: string;

  constructor (
    public ellipseP1: Point,
    public ellipseP2: Point,
    public symbolPosition: Point,
    public shape: Shape
  ) { } 
}