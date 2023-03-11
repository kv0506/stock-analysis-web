import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {RouterModule} from "@angular/router";
import {WidgetsModule} from "./shared/widgets/widgets.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IsLoadingModule} from "@service-work/is-loading";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    WidgetsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'admin', component: UsersComponent},
    ]),
    ReactiveFormsModule,
    FormsModule,
    IsLoadingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
