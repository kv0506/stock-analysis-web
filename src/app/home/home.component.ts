import {Component, OnInit} from '@angular/core';
import {Index, IndexCollection} from "../shared/models";
import {HttpClient} from "@angular/common/http";
import {User, UserCollection} from "../shared/models/user";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public indexes: Array<Index>;
  public users: Array<User>;
  public symbols: Array<string>;
  public chartWidth: number = 620;
  public columnCount: number;
  public bootstrapColClass: string;
  public selectedUser: string;

  constructor(private http: HttpClient) {
  }

  public ngOnInit() {
    this.calculateChartWidth();
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

  private getIndexes() {
    this.http.get<IndexCollection>('https://stock-analysis.azurewebsites.net/api/live-market').subscribe((resp: IndexCollection) => {
      this.indexes = resp.result;
    })
  }

  private getUsers() {
    this.http.get<UserCollection>('https://stock-analysis.azurewebsites.net/api/users').subscribe((resp: UserCollection) => {
      this.users = resp.users;
    })
  }
}
