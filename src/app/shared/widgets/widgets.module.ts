import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartComponent} from './chart/chart.component';
import {TickerComponent} from "./ticker/ticker.component";

@NgModule({
  declarations: [
    ChartComponent,
    TickerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ChartComponent,
    TickerComponent
  ]
})
export class WidgetsModule {
}
