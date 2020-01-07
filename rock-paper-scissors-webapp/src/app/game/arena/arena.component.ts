import { Component } from '@angular/core';
import { ShapeService } from 'src/app/shared/service/internal/shape.service';
import { Shape } from 'src/app/shared/enum/shape.enum';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss']
})
export class ArenaComponent  {
  player1Shape: Observable<Shape> = this.shapeService.getPlayer1Shape();
  player2Shape: Observable<Shape> = this.shapeService.getPlayer2Shape();

  shapeEnum = Shape;

  constructor(
    private shapeService: ShapeService
  ) { }

}
