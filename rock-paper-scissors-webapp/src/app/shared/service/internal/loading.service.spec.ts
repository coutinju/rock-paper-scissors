import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    service = new LoadingService();
  });

  it('#getDisplayWaiting should return Behavior with initial value false', (done) => {
    service.getDisplayWaiting().subscribe(displayWaiting => {
      expect(service['displayWaiting'].value).toBe(false);
      expect(service['displayBug'].value).toBe(false);
      done();
    });
  });

  it('#setDisplayWaiting(true) should set displayWaiting to true and displayBug to false', (done) => {
    service.setDisplayWaiting(true);
    service.getDisplayWaiting().subscribe(_ => {
      expect(service['displayWaiting'].value).toBe(true);
      expect(service['displayBug'].value).toBe(false);
      done();
    });
  });

  it('#setDisplayWaiting(false) should set displayWaiting & displayBug to false', (done) => {
    service.setDisplayWaiting(false);
    service.getDisplayWaiting().subscribe(_ => {
      expect(service['displayWaiting'].value).toBe(false);
      expect(service['displayBug'].value).toBe(false);
      done();
    });
  });

  it('#setDisplayBug(true) should set displayBug to true and displayWaiting to false', (done) => {
    service.setDisplayBug(true);
    service.getDisplayBug().subscribe(_ => {
      expect(service['displayWaiting'].value).toBe(false);
      expect(service['displayBug'].value).toBe(true);
      done();
    });
  });

  it('#setDisplayBug(false) should set displayBug & displayWaiting to false', (done) => {
    service.setDisplayBug(false);
    service.getDisplayBug().subscribe(_ => {
      expect(service['displayWaiting'].value).toBe(false);
      expect(service['displayBug'].value).toBe(false);
      done();
    });
  });
});