import { NgModule } from "@angular/core";
import { IdleModeComponent } from './idle-mode/idle-mode.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [IdleModeComponent],
    imports: [SharedModule],
    exports: [IdleModeComponent]
})
export class ModeModule {}