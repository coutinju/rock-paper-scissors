import { NgModule } from "@angular/core";
import { ShapesMenuComponent } from './shapes-menu/shapes-menu.component';
import { SharedModule } from '../shared/shared.module';
import { ArenaComponent } from './arena/arena.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
    declarations: [ShapesMenuComponent, ArenaComponent, LoadingComponent],
    imports: [SharedModule],
    exports: [ShapesMenuComponent, ArenaComponent, LoadingComponent]
})
export class GameModule { }