import {Component, Input, OnInit} from '@angular/core';
import {Index} from "../../models";

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit {
  @Input() public index: Index;

  constructor() {
  }

  public ngOnInit() {
  }

  public getBackground(): string {
    return this.index.change > 0 ? 'bg-success' : 'bg-danger';
  }
}
