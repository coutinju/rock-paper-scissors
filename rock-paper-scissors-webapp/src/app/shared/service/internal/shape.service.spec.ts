import { ShapeService } from "./shape.service";
import { Shape } from '../../enum/shape.enum';
import { Result } from '../../model/api/result.model';
import { Winner } from '../../enum/winner.enum';

describe('ShapeService', () => {
  let service: ShapeService;

  beforeEach(() => {
    service = new ShapeService();
  });

  it('#getPlayer1Shape should return ReplaySubject when it is changed with #setPlayer1Shape', (done) => {
    service.setPlayer1Shape(Shape.ROCK)
    service.getPlayer1Shape().subscribe(shape => {
      expect(shape).toBe(Shape.ROCK);
      done();
    });
  });

  it('#getPlayer2Shape should return ReplaySubject when it is changed with #setPlayer2Shape', (done) => {
    service.setPlayer2Shape(Shape.PAPER)
    service.getPlayer2Shape().subscribe(shape => {
      expect(shape).toBe(Shape.PAPER);
      done();
    });
  });

  it('#setPlayerShapes should change both players shape', (done) => {
    service.setPlayersShapes(new Result(Shape.PAPER, Shape.SCISSORS, Winner.PLAYER2));
    service.getPlayer1Shape().subscribe(shape => {
      expect(shape).toBe(Shape.PAPER);
      service.getPlayer2Shape().subscribe(shape => {
        expect(shape).toBe(Shape.SCISSORS);
        done();
      });
    });
  });
});