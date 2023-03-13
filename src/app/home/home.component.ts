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
  public columnCounts: Array<number> = new Array<number>();
  public symbols: Array<string>;
  public chartWidth: number = 800;
  public bootstrapColClass: string;
  public selectedUser: string;
  public selectedColumnCount: number = 2;
  public flexLayout: boolean = true;

  constructor(private dataService: DataService) {
  }

  public ngOnInit() {
    this.calculateColumnCount();
    this.calculateChartWidth();
    this.initializeIndexes();
    this.loadIndexes();
    this.getUsers();
  }

  public userChanged() {
    if (this.selectedUser) {
      const user = this.users.find(x => x.name == this.selectedUser);
      if (user) {
        this.symbols = user.symbols;
      }
    } else {
      this.symbols = new Array<string>();
    }
  }

  public columnCountChanged() {
    this.calculateChartWidth();
    this.selectedUser = "";
    this.userChanged();
  }

  private calculateColumnCount() {
    const screenWidth = Math.floor(window.innerWidth - 50);
    const possibleColumnCount = Math.floor(screenWidth / this.chartWidth);

    for (let i = 0; i <= possibleColumnCount; i++) {
      this.columnCounts.push(i + 1);
    }

    if (this.selectedColumnCount > possibleColumnCount) {
      this.selectedColumnCount = possibleColumnCount;
    }

    if (screenWidth < 500) {
      this.flexLayout = false;
    }
  }

  private calculateChartWidth() {
    const screenWidth = Math.floor(window.innerWidth - 50);
    this.chartWidth = Math.floor(screenWidth / this.selectedColumnCount);
    this.bootstrapColClass = `col-${Math.floor(12 / this.selectedColumnCount)}`;
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
    if (day > 0 && day < 6 && hour >= 9 && hour < 16) {
      return true;
    }
    return false;
  }

  private loadIndexes() {
    this.getIndexes();
    setInterval(() => {
      if (this.isMarketOpen()) {
        this.getIndexes();
      }
    }, 6000);
  }

  private getIndexes() {
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

  private getUsers() {
    this.dataService.getUsers().subscribe((resp: UserCollection) => {
      this.users = resp.users;
    })
  }
}
