import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/service/internal/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  displayWaiting: Observable<boolean> = this.loadingService.getDisplayWaiting();
  displayBug: Observable<boolean> = this.loadingService.getDisplayBug();

  constructor(
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
  }

}
