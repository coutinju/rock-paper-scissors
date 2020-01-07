import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModeService } from 'src/app/shared/service/internal/mode.service';
import { Mode } from 'src/app/shared/enum/mode.enum';
import { Observable } from 'rxjs';
import { ScoreService } from 'src/app/shared/service/internal/score.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent {
  player1Score: Observable<number> = this.scoreService.getPlayer1Score();
  player2Score: Observable<number> = this.scoreService.getPlayer2Score();

  mode: Observable<Mode> = this.modeService.getMode();
  modeEnum = Mode;

  constructor(
    private modeService: ModeService,
    private scoreService: ScoreService
  ) { }

}
