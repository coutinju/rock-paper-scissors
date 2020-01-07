import { ScoreService } from "./score.service";
import { Result } from '../../model/api/result.model';
import { Shape } from '../../enum/shape.enum';
import { Winner } from '../../enum/winner.enum';
import { take } from 'rxjs/operators';

describe('ScoreService', () => {
  let service: ScoreService;

  beforeEach(() => {
    service = new ScoreService();
  });

  it('#setPlayersScores should increment the score of player1', (done) => {
    service.setPlayersScores(new Result(Shape.SCISSORS, Shape.PAPER, Winner.PLAYER1));
    service.getPlayer1Score().subscribe(score => {
      expect(score).toBe(1);
      service.getPlayer2Score().subscribe(score => {
        expect(score).toBe(0);
        done();
      });
    });
  });

  it('#setPlayersScores should increment the score of player2', (done) => {
    service.setPlayersScores(new Result(Shape.PAPER, Shape.SCISSORS, Winner.PLAYER2));
    service.getPlayer1Score().subscribe(score => {
      expect(score).toBe(0);
      service.getPlayer2Score().subscribe(score => {
        expect(score).toBe(1);
        done();
      });
    });
  });

  it('#setPlayersScores should not increment the scores', (done) => {
    service.setPlayersScores(new Result(Shape.ROCK, Shape.ROCK, Winner.DRAW));
    service.getPlayer1Score().subscribe(score => {
      expect(score).toBe(0);
      service.getPlayer2Score().subscribe(score => {
        expect(score).toBe(0);
        done();
      });
    });
  });

  it('#resetScores should reset the score of both players', (done) => {
    service.setPlayersScores(new Result(Shape.SCISSORS, Shape.PAPER, Winner.PLAYER1));
    service.setPlayersScores(new Result(Shape.PAPER, Shape.SCISSORS, Winner.PLAYER2));
    service.getPlayer1Score().pipe(take(1)).subscribe(score => {
      expect(score).toBe(1);
      service.getPlayer2Score().pipe(take(1)).subscribe(score => {
        expect(score).toBe(1);
      });
    });
    service.resetScores();
    service.getPlayer1Score().subscribe(score => {
      expect(score).toBe(0);
      service.getPlayer2Score().subscribe(score => {
        expect(score).toBe(0);
        done();
      });
    });
  });
});