import {Component, OnInit} from '@angular/core';
import {Index, IndexCollection} from "../shared/models";
import {User, UserCollection} from "../shared/models/user";
import {DataService} from "../shared/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public indexes: Array<Index>;
  public users: Array<User>;
  public symbols: Array<string>;
  public chartWidth: number = 800;
  public columnCount: number;
  public bootstrapColClass: string;
  public selectedUser: string;

  constructor(private dataService: DataService) {
  }

  public ngOnInit() {
    this.calculateChartWidth();
    this.initializeIndexes();
    this.getIndexes();
    this.getUsers();
  }

  public userChanged() {
    if (this.selectedUser) {
      const user = this.users.find(x => x.name == this.selectedUser);
      if (user) {
        this.symbols = user.symbols;
      }
    }
  }

  private calculateChartWidth() {
    const screenWidth = Math.floor(window.innerWidth - 50);
    const possibleColumnCount = Math.floor(screenWidth / this.chartWidth);
    const columnWidth = Math.floor(screenWidth / possibleColumnCount);

    if (this.chartWidth < columnWidth) {
      this.chartWidth = columnWidth;
    } else if (this.chartWidth > screenWidth) {
      this.chartWidth = screenWidth;
    }

    this.columnCount = Math.floor(screenWidth / this.chartWidth);
    this.bootstrapColClass = `col-${Math.floor(12 / this.columnCount)}`;
  }

  private initializeIndexes() {
    this.indexes = new Array<Index>();

    const nifty50 = new Index();
    nifty50.name = 'NIFTY 50';
    this.indexes.push(nifty50);

    const niftyBank = new Index();
    niftyBank.name = 'NIFTY BANK';
    this.indexes.push(niftyBank);
  }

  private isMarketOpen(): boolean {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    if (day > 0 && day < 7 && hour >= 9 && hour < 16) {
      return true;
    }
    return false;
  }

  private getIndexes() {
    setInterval(() => {
      if (this.isMarketOpen()) {
        this.dataService.getIndexes().subscribe((resp: IndexCollection) => {
          this.indexes.forEach(i => {
            const index = resp.result.find(x => x.name === i.name);
            if (index) {
              i.current = index.current;
              i.change = index.change;
              i.advances = index.advances;
              i.declines = index.declines;
              i.unchanged = index.unchanged;
            }
          });
        });
      }
    }, 6000);
  }

  private getUsers() {
    this.dataService.getUsers().subscribe((resp: UserCollection) => {
      this.users = resp.users;
    })
  }
}
