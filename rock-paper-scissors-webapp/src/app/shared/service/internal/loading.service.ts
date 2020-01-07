import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private displayWaiting: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private displayBug: BehaviorSubject<boolean> = new BehaviorSubject(false);

  getDisplayWaiting(): Observable<boolean> {
    return this.displayWaiting;
  }

  getDisplayBug(): Observable<boolean> {
    return this.displayBug;
  }

  setDisplayWaiting(displayWaiting: boolean): void {
    this.displayWaiting.next(displayWaiting);
    this.displayBug.next(false);
  }

  setDisplayBug(displayBug: boolean): void {
    this.displayBug.next(displayBug);
    this.displayWaiting.next(false);
  }
}