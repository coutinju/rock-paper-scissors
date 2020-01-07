import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModeService } from 'src/app/shared/service/internal/mode.service';
import { ShapeService } from '../../shared/service/internal/shape.service';
import { Point } from '../../shared/model/display/point.model';
import { Shape } from '../../shared/enum/shape.enum';
import { Sector } from '../../shared/model/display/sector.model';
import { Mode } from 'src/app/shared/enum/mode.enum';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/shared/service/external/game/game.service';
import { ScoreService } from 'src/app/shared/service/internal/score.service';

@Component({
  selector: 'app-shapes-menu',
  templateUrl: './shapes-menu.component.html',
  styleUrls: ['./shapes-menu.component.scss']
})
export class ShapesMenuComponent implements OnInit, OnDestroy {
  shapes = [ Shape.ROCK, Shape.SCISSORS, Shape.PAPER ];
  shapeEnum = Shape;

  boxSize = 100;
  stroke = 2;
  outerRadius = this.boxSize - this.stroke;
  innerRadius = 30;

  sectors: Sector[] = [];
  pathFormat = (p1: Point, p2: Point) => `M 0 0 ${p1.x} ${p1.y} A ${this.outerRadius} ${this.outerRadius} 0 0 1 ${p2.x} ${p2.y} Z`;

  mode: Mode = Mode.MANUAL;
  private modeSubscription: Subscription;

  constructor(
    private shapeService: ShapeService,
    private modeService: ModeService,
    private gameService: GameService,
    private scoreService: ScoreService
  ) { }

  ngOnInit() {
    this.computeRoots();
    this.modeSubscription = this.modeService.getMode().subscribe(
      mode => this.mode = mode
    );
  }

  private computeRoots() {
    this.sectors = [];
    const shapesLength = this.shapes.length;

    const teta = 2*Math.PI/shapesLength;
    let angle = 0;

    for (let i=0; i < shapesLength; i++) {
      const p1 = this.generatePoint(angle, this.outerRadius);
      const p2 = this.generatePoint(angle+teta, this.outerRadius);

      const shapeChoiceRadius = (this.outerRadius - this.innerRadius)/2 + this.innerRadius;
      const symbolPosition = this.generatePoint(angle+teta/2, shapeChoiceRadius);

      const sector = new Sector(p1, p2, symbolPosition, this.shapes[i]);
      this.sectors.push(sector);

      angle += teta;
    }

    this.updatePaths();
  }

  private generatePoint(angle: number, radius: number): Point {
    const x = Math.cos(angle)*radius;
    const y = Math.sin(angle)*radius;
    return new Point(x, y);
  }

  private updatePaths() {
    this.sectors.forEach(sector => {
      sector.path = this.pathFormat(sector.ellipseP1, sector.ellipseP2);
    });
  }

  onShapeSelected(shapeSelected: Shape) {
    if (this.mode === Mode.MANUAL) {
      this.gameService.getManualModeResult(shapeSelected)
        .subscribe(
          result => {
            this.shapeService.setPlayer1Shape(shapeSelected);
            this.shapeService.setPlayer2Shape(result.player2Shape);
            this.scoreService.setPlayersScores(result);
          }
        );
    }
  }

  ngOnDestroy() {
    this.modeSubscription.unsubscribe();
  }
}
