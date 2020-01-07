import { NgModule } from '@angular/core';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ScoreboardComponent],
  imports: [SharedModule],
  exports: [ScoreboardComponent]
})
export class ScoreModule {}