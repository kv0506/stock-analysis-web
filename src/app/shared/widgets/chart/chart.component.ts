import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

declare const TradingView: any;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input() public symbol: string;
  @Input() public width: number;
  public controlId: string;

  ngOnInit(): void {
    this.controlId = Date.now().toString(36);
  }

  ngAfterViewInit() {
    new TradingView.widget({
      width: this.width,
      symbol: `BSE:${this.symbol}`,
      interval: "D",
      timezone: "Asia/Kolkata",
      theme: "light",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      withdateranges: true,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      show_popup_button: true,
      popup_width: 1366,
      popup_height: 768,
      studies: [
        {
          id: "MAExp@tv-basicstudies",
          version: 60,
          inputs: {
            length: 50,
          },
        },
        {
          id: "MAExp@tv-basicstudies",
          version: 60,
          inputs: {
            length: 100,
          },
        },
        {
          id: "MACD@tv-basicstudies",
        },
      ],
      studies_overrides: {
        "macd.macd.color": "#008000",
        "macd.signal.color": "#FF0000",
        "macd.macd.linewidth": 2,
        "macd.signal.linewidth": 2,
        "ema.ma.linewidth": 2,
        "ema.ma.color.0": "#008000",
        "ema.ma.color.1": "#FF0000",
      },
      container_id: this.controlId,
    });
  }
}
