import { Injectable } from '@angular/core';
import { ExternalCommunicationService } from '../external-communication.service';
import { LoadingService } from '../../internal/loading.service';
import { Shape } from 'src/app/shared/enum/shape.enum';
import { Observable } from 'rxjs';
import { Result } from 'src/app/shared/model/api/result.model';
import { Request } from 'src/app/shared/model/api/request.model';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';
import { catchError, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService extends ExternalCommunicationService {

  private gameRestApi = ExternalCommunicationService.SERVER_URL + 'game';

  constructor(
    protected loadingService: LoadingService,
    protected httpClient: HttpClient
  ) {
    super(loadingService);
  }

  getManualModeResult(player1ShapeSelected: Shape): Observable<Result> {
    const request = new Request(player1ShapeSelected);
    return this.httpClient.post<Result>(`${this.gameRestApi}/result`, request, this.httpOptions)
      .pipe(
        timeout(ExternalCommunicationService.REQUEST_TIMEOUT_MS),
        catchError(this.handleError)
      );
  }

  getIdleModeResult(): Observable<Result> {
    return this.httpClient.get<Result>(`${this.gameRestApi}/result`, this.httpOptions)
      .pipe(
        timeout(ExternalCommunicationService.REQUEST_TIMEOUT_MS),
        catchError(this.handleError)
      );
  }
}
