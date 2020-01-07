import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Shape } from '../../enum/shape.enum';
import { Result } from '../../model/api/result.model';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
  // Using a ReplaySubject instead of BehaviorSubject not to call the backend at initialization
  private player1Shape: ReplaySubject<Shape> = new ReplaySubject(1);
  private player2Shape: ReplaySubject<Shape> = new ReplaySubject(1);

  setPlayer1Shape(player1Shape: Shape): void {
    this.player1Shape.next(player1Shape);
  }

  getPlayer1Shape(): Observable<Shape> {
    return this.player1Shape;
  }

  setPlayer2Shape(player2Shape: Shape): void {
    this.player2Shape.next(player2Shape);
  }

  getPlayer2Shape(): Observable<Shape> {
    return this.player2Shape;
  }
  
  setPlayersShapes(result: Result): void {
    this.player1Shape.next(result.player1Shape);
    this.player2Shape.next(result.player2Shape);
  }
}