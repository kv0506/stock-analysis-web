import {Component, OnInit} from '@angular/core';
import {Index, IndexCollection} from "../shared/models";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public indexes: Array<Index>;

  constructor(private http: HttpClient) {
  }

  public ngOnInit() {
    this.getIndexes();
  }

  private getIndexes() {
    this.http.get<IndexCollection>('https://stock-analysis.azurewebsites.net/api/live-market').subscribe((resp: IndexCollection) => {
      this.indexes = resp.result;
    })
  }

  private getUsers(){
    
  }
}
