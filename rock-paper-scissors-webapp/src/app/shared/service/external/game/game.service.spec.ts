import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Result } from 'src/app/shared/model/api/result.model';
import { Shape } from 'src/app/shared/enum/shape.enum';
import { Winner } from 'src/app/shared/enum/winner.enum';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRestInterceptor } from '../../injector/http-rest-interceptor';

describe('GameService', () => {
  let httpTestingController: HttpTestingController;
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpRestInterceptor,
          multi: true
        }
      ]
    })
    .compileComponents();
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getManualModeResult should call the backend and match data of the result for MANUAL mode', () => {
    const mockRequest = new Result(Shape.ROCK, Shape.SCISSORS, Winner.PLAYER1);

    service.getManualModeResult(Shape.ROCK)
      .subscribe(result => {
        expect(result.player1Shape).toEqual(Shape.ROCK);
        expect(result.player2Shape).toEqual(Shape.SCISSORS);
        expect(result.winner).toEqual(Winner.PLAYER1);
      });

    const req = httpTestingController.expectOne(req => req.method === 'POST' && req.url === 'http://localhost:8080/rest/game/result');

    req.flush(mockRequest);
  });

  it('#getIdleModeResult should call the backend and match data of the result for IDLE mode', () => {
    const mockRequest = new Result(Shape.PAPER, Shape.PAPER, Winner.DRAW);

    service.getIdleModeResult()
      .subscribe(result => {
        expect(result.player1Shape).toEqual(Shape.PAPER);
        expect(result.player2Shape).toEqual(Shape.PAPER);
        expect(result.winner).toEqual(Winner.DRAW);
      });

    const req = httpTestingController.expectOne(req => req.method === 'GET' && req.url === 'http://localhost:8080/rest/game/result');

    req.flush(mockRequest);
  });
  
  afterEach(() => {
    httpTestingController.verify();
  });
});
