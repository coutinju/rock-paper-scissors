import { ModeService } from "./mode.service";
import { Mode } from '../../enum/mode.enum';
import { BehaviorSubject } from 'rxjs';

describe('ModeService', () => {
  let service: ModeService;

  beforeEach(() => {
    service = new ModeService();
  });

  it('#getMode should return Behavior with initial value MANUAL', (done) => {
    service.getMode().subscribe(mode => {
      expect(mode).toBe(Mode.MANUAL);
      done();
    });
  });

  it('#setMode should change Behavior value', (done) => {
    service.setMode(Mode.IDLE);
    service.getMode().subscribe(mode => {
      expect(mode).toBe(Mode.IDLE);
      done();
    });
  });
});