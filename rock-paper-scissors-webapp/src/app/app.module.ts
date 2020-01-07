import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { GameModule } from './game/game.module';
import { ScoreModule } from './score/score.module';
import { ModeModule } from './mode/mode.module';
import { ExternalCommunicationModule } from './shared/service/external/external-communication.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRestInterceptor } from './shared/service/injector/http-rest-interceptor';

@NgModule({
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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRestInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
