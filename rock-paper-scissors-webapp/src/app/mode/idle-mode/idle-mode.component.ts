import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModeService } from 'src/app/shared/service/internal/mode.service';
import { Mode } from 'src/app/shared/enum/mode.enum';
import { GameService } from 'src/app/shared/service/external/game/game.service';
import { ShapeService } from 'src/app/shared/service/internal/shape.service';
import { ScoreService } from 'src/app/shared/service/internal/score.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-idle-mode',
  templateUrl: './idle-mode.component.html',
  styleUrls: ['./idle-mode.component.scss']
})
export class IdleModeComponent {
  mode: Observable<Mode> = this.modeService.getMode();
  modeEnum = Mode;

  private timeout = undefined;
  private static msBetweenCalls = 2000; // milliseconds
  // Time (ms) during which the mode will stay in the state transient
  private static msTransient = IdleModeComponent.msBetweenCalls + 500;

  constructor(
    private modeService: ModeService,
    private gameService: GameService,
    private shapeService: ShapeService,
    private scoreService: ScoreService
  ) { }

  onIdleChange() {
    switch (this.modeService.mode.value) {
      case Mode.MANUAL:
        this.scoreService.resetScores();
        this.modeService.setMode(Mode.IDLE);
        this.idleAction();
        break;
      case Mode.IDLE:
        this.modeService.setMode(Mode.TRANSIENT);
        setTimeout(() => {
          this.scoreService.resetScores();
          this.modeService.setMode(Mode.MANUAL);
        }, IdleModeComponent.msTransient);
        break;
    }
  }

  private idleAction() {
    this.gameService.getIdleModeResult()
      .subscribe(
        result => {
          this.shapeService.setPlayersShapes(result);
          this.scoreService.setPlayersScores(result);
          this.idleRestartAction();
        },
        error => {
          // Back to MANUAL mode
          this.onIdleChange();
        }
      );
  }

  private idleRestartAction() {
    // Preventing user from starting multiple timeout simultaneously
    if (Mode.IDLE === this.modeService.mode.value && !this.timeout) {
      this.timeout = setTimeout(() => {
        this.timeout = undefined;
        this.idleAction();
      }, IdleModeComponent.msBetweenCalls);
    }
  }
}
