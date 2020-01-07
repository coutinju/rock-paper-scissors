import { HttpHeaders, HttpErrorResponse, HttpXsrfTokenExtractor } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoadingService } from '../internal/loading.service';

export abstract class ExternalCommunicationService {

  public static SERVER_URL = environment.restApiUrl + "rest/";

  protected static REQUEST_TIMEOUT_MS = 3000;

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    protected loadingService: LoadingService
  ) { }

  // Default handleError from https://angular.io/guide/http
  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}