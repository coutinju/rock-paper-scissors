import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ShapesMenuComponent } from './shapes-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { By } from '@angular/platform-browser';
import { ShapeService } from 'src/app/shared/service/internal/shape.service';
import { take } from 'rxjs/operators';
import { Shape } from 'src/app/shared/enum/shape.enum';
import { GameService } from 'src/app/shared/service/external/game/game.service';
import { Result } from 'src/app/shared/model/api/result.model';
import { Winner } from 'src/app/shared/enum/winner.enum';
import { of } from 'rxjs';
import { Mode } from 'src/app/shared/enum/mode.enum';
import { DebugElement } from '@angular/core';

describe('ShapesMenuComponent', () => {
  let component: ShapesMenuComponent;
  let fixture: ComponentFixture<ShapesMenuComponent>;
  let shapeService: ShapeService;
  let gameService: GameService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapesMenuComponent ],
      imports: [
        HttpClientModule,
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapesMenuComponent);
    component = fixture.componentInstance;
    shapeService = fixture.debugElement.injector.get(ShapeService);
    gameService = fixture.debugElement.injector.get(GameService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 3 shapes', () => {
    const shapes = fixture.debugElement.queryAll(By.css('#shapes > svg > g[ng-reflect-ng-switch]'));
    expect(shapes.length).toEqual(3);
  });

  it('should display rock shape', () => {
    const rockShape = shapeDebugElement("ROCK");;
    expect(rockShape).toBeTruthy();
  });

  it('should display paper shape', () => {
    const paperShape = shapeDebugElement("PAPER");
    expect(paperShape).toBeTruthy();
  });

  it('should display scissors shape', () => {
    const scissorsShape = shapeDebugElement("SCISSORS");
    expect(scissorsShape).toBeTruthy();
  });

  it('should display help button', () => {
    const helpButton = fixture.debugElement.query(By.css('#shapes > svg > g > circle'));
    expect(helpButton).toBeTruthy();
  });

  it('should change the shape selected by player1', (done) => {
    let spy = spyOn(gameService, 'getManualModeResult').and.returnValue(of(new Result(Shape.PAPER, Shape.ROCK, Winner.PLAYER1)));

    const paperShape = shapeDebugElement("PAPER");
    paperShape.triggerEventHandler('click', null);
    fixture.detectChanges();

    shapeService.getPlayer1Shape().pipe(take(1)).subscribe(player1Shape => {
      expect(player1Shape).toBe(Shape.PAPER);
      done();
    });
  });

  it('should not change the shape selected by player1 while in IDLE mode', () => {
    spyOn(shapeService, 'setPlayer1Shape');

    component.mode = Mode.IDLE;
    const scissorsShape = shapeDebugElement("SCISSORS");
    scissorsShape.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(shapeService.setPlayer1Shape).toHaveBeenCalledTimes(0);
  });

  function shapeDebugElement(shape: string): DebugElement {
    return fixture.debugElement.query(By.css(`#shapes-svg-g-${shape}`));
  }
});
