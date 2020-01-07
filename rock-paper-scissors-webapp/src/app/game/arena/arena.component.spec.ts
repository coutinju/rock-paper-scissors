import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenaComponent } from './arena.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { By } from '@angular/platform-browser';
import { ShapeService } from 'src/app/shared/service/internal/shape.service';
import { Shape } from 'src/app/shared/enum/shape.enum';
import { DebugElement } from '@angular/core';


describe('ArenaComponent', () => {
  let component: ArenaComponent;
  let fixture: ComponentFixture<ArenaComponent>;
  let shapeService: ShapeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArenaComponent ],
      imports: [
        HttpClientModule,
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenaComponent);
    component = fixture.componentInstance;
    shapeService = fixture.debugElement.injector.get(ShapeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initially display ROCK shapes', () => {
    const itemDebugElementPlayer1 = playerChoiceIcon(1);
    expect(itemDebugElementPlayer1.attributes['ng-reflect-icon']).toEqual('fas,hand-rock');

    const itemDebugElementPlayer2 = playerChoiceIcon(2);
    expect(itemDebugElementPlayer2.attributes['ng-reflect-icon']).toEqual('fas,hand-rock');
  });

  it('should display PAPER shape for player 1', () => {
    shapeService.setPlayer1Shape(Shape.PAPER);
    fixture.detectChanges();

    const itemDebugElementPlayer1 = playerChoiceIcon(1);
    expect(itemDebugElementPlayer1.attributes['ng-reflect-icon']).toEqual('fas,hand-paper');
  });

  it('should display SCISSORS shape for player 2', () => {
    shapeService.setPlayer2Shape(Shape.SCISSORS);
    fixture.detectChanges();

    const itemDebugElementPlayer1 = playerChoiceIcon(2);
    expect(itemDebugElementPlayer1.attributes['ng-reflect-icon']).toEqual('fas,hand-scissors');
  });

  it('should display ROCK shape for player 1 by default', () => {
    shapeService.setPlayer1Shape(undefined);
    fixture.detectChanges();

    const itemDebugElementPlayer1 = playerChoiceIcon(1);
    expect(itemDebugElementPlayer1.attributes['ng-reflect-icon']).toEqual('fas,hand-rock');
  });

  function playerChoiceIcon(playerNumber: number): DebugElement {
    return fixture.debugElement.query(By.css(`#player${playerNumber}-choice > fa-icon`))
  }
});
