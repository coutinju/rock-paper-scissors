import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreboardComponent } from './scoreboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ModeService } from 'src/app/shared/service/internal/mode.service';
import { Mode } from 'src/app/shared/enum/mode.enum';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { ScoreService } from 'src/app/shared/service/internal/score.service';
import { Result } from 'src/app/shared/model/api/result.model';
import { Shape } from 'src/app/shared/enum/shape.enum';
import { Winner } from 'src/app/shared/enum/winner.enum';

describe('ScoreboardComponent', () => {
  let component: ScoreboardComponent;
  let fixture: ComponentFixture<ScoreboardComponent>;
  let modeService: ModeService;
  let scoreService: ScoreService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreboardComponent ],
      imports: [ SharedModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboardComponent);
    component = fixture.componentInstance;
    modeService = fixture.debugElement.injector.get(ModeService);
    scoreService = fixture.debugElement.injector.get(ScoreService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the score 0-0 initially', () => {
    const scorePlayer1 = scorePlayerHtmlEl(1);
    expect(scorePlayer1.innerText).toBe("0");
    
    const scorePlayer2 = scorePlayerHtmlEl(2);
    expect(scorePlayer2.innerText).toBe("0");
  });

  it('should only increment the score of player1 when he wins', () => {
    scoreService.setPlayersScores(new Result(Shape.SCISSORS, Shape.PAPER, Winner.PLAYER1));
    fixture.detectChanges();

    const scorePlayer1 = scorePlayerHtmlEl(1);
    expect(scorePlayer1.innerText).toBe("1");
    
    const scorePlayer2 = scorePlayerHtmlEl(2);
    expect(scorePlayer2.innerText).toBe("0");
  });

  it('should only increment the score of player2 when he wins', () => {
    scoreService.setPlayersScores(new Result(Shape.ROCK, Shape.PAPER, Winner.PLAYER2));
    fixture.detectChanges();

    const scorePlayer1 = scorePlayerHtmlEl(1);
    expect(scorePlayer1.innerText).toBe("0");
    
    const scorePlayer2 = scorePlayerHtmlEl(2);
    expect(scorePlayer2.innerText).toBe("1");
  });

  it('should not increment any score when there is a draw', () => {
    scoreService.setPlayersScores(new Result(Shape.PAPER, Shape.PAPER, Winner.DRAW));
    fixture.detectChanges();

    const scorePlayer1 = scorePlayerHtmlEl(1);
    expect(scorePlayer1.innerText).toBe("0");
    
    const scorePlayer2 = scorePlayerHtmlEl(2);
    expect(scorePlayer2.innerText).toBe("0");
  });

  it('should display a human icon for player1 initially', () => {
    fixture.detectChanges();
    const iconPlayer1 = iconPlayerDe(1);
    expect(iconPlayer1.attributes['ng-reflect-icon']).toEqual('fas,user');
  });

  it('should display a robot icon for player2', () => {
    const iconPlayer2 = iconPlayerDe(2);
    expect(iconPlayer2.attributes['ng-reflect-icon']).toEqual('fas,robot');
  });

  it('should display a robot icon for player1 while in IDLE mode', () => {
    modeService.setMode(Mode.IDLE);
    fixture.detectChanges();

    const iconPlayer1 = iconPlayerDe(1);
    expect(iconPlayer1.attributes['ng-reflect-icon']).toEqual('fas,robot');
  });

  it('should display a robot icon for player1 while in TRANSIENT mode', () => {
    modeService.setMode(Mode.TRANSIENT);
    fixture.detectChanges();

    const iconPlayer1 = iconPlayerDe(1);
    expect(iconPlayer1.attributes['ng-reflect-icon']).toEqual('fas,robot');
  });

  function scorePlayerHtmlEl(playerNumber: number): HTMLElement {
    return fixture.debugElement.query(By.css(`#scoreboard > #player${playerNumber}-score > span`)).nativeElement;
  }

  function iconPlayerDe(playerNumber: number): DebugElement {
    return fixture.debugElement.query(By.css(`#scoreboard > #player${playerNumber}-score > fa-icon`));
  }
});
