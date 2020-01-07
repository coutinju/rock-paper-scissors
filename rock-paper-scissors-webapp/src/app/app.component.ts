import { Component, OnInit, isDevMode } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private title: string;

  constructor(
    private titleService: Title
  ) {}

  ngOnInit() {
    this.title = "Rock Paper Scissors"
    this.titleService.setTitle(this.title);
  }

}
