import {Component, OnInit} from '@angular/core';
import {UserCollection} from "../shared/models/user";
import {DataService} from "../shared/data.service";
import {IsLoadingService} from "@service-work/is-loading";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: string;
  public saveSuccess: boolean;

  constructor(private dataService: DataService, private loadingService: IsLoadingService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  public dismissAlert() {
    this.saveSuccess = false;
  }

  public save() {
    this.loadingService.add();
    this.dismissAlert();
    this.dataService.saveUsers(this.users).subscribe((resp: UserCollection) => {
      this.users = JSON.stringify(resp);
      this.saveSuccess = true;
      this.loadingService.remove();
    });
  }

  private getUsers() {
    this.dataService.getUsers().subscribe((resp: UserCollection) => {
      this.users = JSON.stringify(resp);
    });
  }
}
