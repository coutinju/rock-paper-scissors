import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from 'rxjs';
import { Result } from '../../model/api/result.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private player1Score: BehaviorSubject<number> = new BehaviorSubject(0);
  private player2Score: BehaviorSubject<number> = new BehaviorSubject(0);

  getPlayer1Score(): Observable<number> {
    return this.player1Score;
  }

  getPlayer2Score(): Observable<number> {
    return this.player2Score;
  }
  
  setPlayersScores(result: Result): void {
    switch (result.winner) {
      case "PLAYER1":
        this.player1Score.next(this.player1Score.getValue() + 1);
        break;
      case "PLAYER2":
        this.player2Score.next(this.player2Score.getValue() + 1);
        break;
      case "DRAW":
      default:
        // No winner score doesn't increment
        break;
    }
  }

  resetScores() {
    this.player1Score.next(0);
    this.player2Score.next(0);
  }
}