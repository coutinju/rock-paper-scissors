import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IdleModeComponent } from './idle-mode.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { By } from '@angular/platform-browser';
import { ModeService } from 'src/app/shared/service/internal/mode.service';
import { Mode } from 'src/app/shared/enum/mode.enum';
import { GameService } from 'src/app/shared/service/external/game/game.service';
import { Result } from 'src/app/shared/model/api/result.model';
import { Shape } from 'src/app/shared/enum/shape.enum';
import { Winner } from 'src/app/shared/enum/winner.enum';
import { of } from 'rxjs';

// TODO: test spinner displayed
describe('IdleModeComponent', () => {
  let component: IdleModeComponent;
  let fixture: ComponentFixture<IdleModeComponent>;
  let modeService: ModeService;
  let gameService: GameService;
  let msWait3Calls = (5/2)*IdleModeComponent['msBetweenCalls'];

  const timesCssSelector = '#idle > fa-stack > .times';
  const cogsCssSelector = '#idle > fa-stack > .cogs';
  const gamepadCssSelector = '#idle > fa-stack > .gamepad';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdleModeComponent ],
      imports: [ 
        SharedModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdleModeComponent);
    component = fixture.componentInstance;
    modeService = fixture.debugElement.injector.get(ModeService);
    gameService = fixture.debugElement.injector.get(GameService);
    spyOn(gameService, 'getIdleModeResult').and.returnValues(
      of(new Result(Shape.ROCK, Shape.SCISSORS, Winner.PLAYER1)),
      of(new Result(Shape.PAPER, Shape.PAPER, Winner.DRAW)),
      of(new Result(Shape.SCISSORS, Shape.ROCK, Winner.PLAYER2))
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display manual mode activated by default', () => {
    const gamepadDisplay = fixture.debugElement.query(By.css(gamepadCssSelector));
    expect(gamepadDisplay).toBeTruthy();
    
    const cogsDisplay = fixture.debugElement.query(By.css(cogsCssSelector));
    expect(cogsDisplay).toBeFalsy();
    
    const timesDisplay = fixture.debugElement.query(By.css(timesCssSelector));
    expect(timesDisplay).toBeFalsy();
  });

  it('should display idle mode when gamepad is clicked', fakeAsync(() => {
    const cogsDisplay = fixture.debugElement.query(By.css(cogsCssSelector));
    expect(cogsDisplay).toBeFalsy();

    const gamepadDisplay = fixture.debugElement.query(By.css(gamepadCssSelector));
    expect(gamepadDisplay).toBeTruthy();
    gamepadDisplay.triggerEventHandler('click', null);
    tick(100);
    let timeout = component['timeout'];
    clearTimeout(timeout);
    fixture.detectChanges();
    expect(modeService.mode.value).toBe(Mode.IDLE);
    
    const timesDisplay = fixture.debugElement.query(By.css(timesCssSelector));
    expect(timesDisplay).toBeTruthy();
  }));

  it('should call the backend 3 times while in IDLE mode', fakeAsync(() => {
    const gamepadDisplay = fixture.debugElement.query(By.css(gamepadCssSelector));
    gamepadDisplay.triggerEventHandler('click', null);
    tick(msWait3Calls);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(gameService.getIdleModeResult).toHaveBeenCalledTimes(3);
      let timeout = component['timeout'];
      clearTimeout(timeout);
    });
  }));

  it('should display cogs (TRANSIENT mode) when times icon is clicked then switch to MANUAL mode', fakeAsync(() => {
    // Initialization IDLE mode
    modeService.setMode(Mode.IDLE);
    fixture.detectChanges();

    let cogsDisplay = fixture.debugElement.query(By.css(cogsCssSelector));
    expect(cogsDisplay).toBeFalsy();

    // Click on IDLE mode display element to switch to TRANSIENT then MANUAL mode
    let timesDisplay = fixture.debugElement.query(By.css(timesCssSelector));
    timesDisplay.triggerEventHandler('click', null);
    fixture.detectChanges();

    cogsDisplay = fixture.debugElement.query(By.css(cogsCssSelector));
    expect(cogsDisplay).toBeTruthy();

    timesDisplay = fixture.debugElement.query(By.css(timesCssSelector));
    expect(timesDisplay).toBeFalsy();

    tick(IdleModeComponent['msTransient'] + 100);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(modeService.mode.value).toBe(Mode.MANUAL);
      cogsDisplay = fixture.debugElement.query(By.css(cogsCssSelector));
      expect(cogsDisplay).toBeFalsy();
    });
  }));
});
