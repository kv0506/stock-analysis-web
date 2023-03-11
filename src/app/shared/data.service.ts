import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IndexCollection} from "./models";
import {UserCollection} from "./models/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {
  }

  public getIndexes(): Observable<IndexCollection> {
    return this.http.get<IndexCollection>('https://stock-analysis.azurewebsites.net/api/live-market');
  }

  public getUsers(): Observable<UserCollection> {
    return this.http.get<UserCollection>('https://stock-analysis.azurewebsites.net/api/users');
  }

  public saveUsers(data: string): Observable<UserCollection> {
    return this.http.post<UserCollection>('https://stock-analysis.azurewebsites.net/api/users', data);
  }
}
