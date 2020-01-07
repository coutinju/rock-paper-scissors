import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { ExternalCommunicationModule } from './shared/service/external/external-communication.module';
import { GameModule } from './game/game.module';
import { ModeModule } from './mode/mode.module';
import { ScoreModule } from './score/score.module';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientModule,
        BrowserModule,
        ExternalCommunicationModule,
        SharedModule,
        GameModule,
        ScoreModule,
        ModeModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Rock Paper Scissors'`, () => {
    expect(component['title']).toEqual('Rock Paper Scissors');
  });
});
