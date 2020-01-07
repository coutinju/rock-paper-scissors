import { TestBed } from '@angular/core/testing';
import { ExternalCommunicationService } from './external-communication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedModule } from '../../shared.module';
import { LoadingService } from '../internal/loading.service';

class MockExternalCommunicationService extends ExternalCommunicationService {}

describe('ExternalCommunicationService', () => {
  let mockExternalCommunicationService: MockExternalCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
    mockExternalCommunicationService = new MockExternalCommunicationService(TestBed.get(LoadingService));
  });

  it('should be created', () => {
    expect(mockExternalCommunicationService).toBeTruthy();
  });

  it('should handle ErrorEvent', () => {
    const spyConsole = spyOn(console, 'error');
    const errorEvent = new ErrorEvent('ERROR', {message: 'Error'});
    mockExternalCommunicationService['handleError'](new HttpErrorResponse({error: errorEvent}));
    expect(spyConsole).toHaveBeenCalledWith('An error occurred:', 'Error');
  });

  it('should handle any HttpErrorResponse which is not an ErrorEvent', () => {
    const spyConsole = spyOn(console, 'error');
    mockExternalCommunicationService['handleError'](new HttpErrorResponse({status: 404, error: 'Error 404'}));
    expect(spyConsole).toHaveBeenCalledWith('Backend returned code 404, body was: Error 404');
  });

  it('should throw an error', (done) => {
    mockExternalCommunicationService['handleError'](new HttpErrorResponse({})).subscribe({
      error: (err) => {
        expect(err).toEqual('Something bad happened; please try again later.');
        done();
      }
    });
  });
});
