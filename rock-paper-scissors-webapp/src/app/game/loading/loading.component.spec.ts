import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoadingComponent } from './loading.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoadingService } from 'src/app/shared/service/internal/loading.service';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let loadingService: LoadingService;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingComponent ],
      imports: [ SharedModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    loadingService = fixture.debugElement.injector.get(LoadingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display the loading element by default', async() => {
    expect(fixture.debugElement.query(By.css('#loading'))).toBeFalsy();
  });

  it('should display the waiting symbol', async() => {
    loadingService.setDisplayWaiting(true);
    fixture.detectChanges();
    loadingService.getDisplayWaiting().subscribe(() => {
      expect(fixture.debugElement.query(By.css('#loading > .spinner'))).toBeTruthy();
    });
  });

  it('should display the bug symbol', async() => {
    loadingService.setDisplayBug(true);
    fixture.detectChanges();
    loadingService.getDisplayBug().subscribe(() => {
      expect(fixture.debugElement.query(By.css('#loading > .bug'))).toBeTruthy();
    });
  });
});
