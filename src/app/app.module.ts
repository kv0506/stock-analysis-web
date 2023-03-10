import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {RouterModule} from "@angular/router";
import {WidgetsModule} from "./shared/widgets/widgets.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    UsersComponent,
  ],
    imports: [
        BrowserModule,
        WidgetsModule,
        HttpClientModule,
        RouterModule.forRoot([
            {path: '', component: HomeComponent},
            {path: 'users', component: UsersComponent},
        ]),
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
