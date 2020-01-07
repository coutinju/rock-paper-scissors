import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { Mode } from '../../enum/mode.enum';

@Injectable({
  providedIn: 'root'
})
export class ModeService {
  mode: BehaviorSubject<Mode> = new BehaviorSubject(Mode.MANUAL);

  getMode(): Observable<Mode> {
    return this.mode;
  }

  setMode(mode: Mode): void {
    this.mode.next(mode);
  }
}