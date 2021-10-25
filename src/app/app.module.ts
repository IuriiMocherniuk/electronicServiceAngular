import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//----------------------------------------

import { HttpClientModule } from '@angular/common/http'; // HttpModule --> HttpClientModule | @angular/http --> @angular/common/http

import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

//----------------------------------------

import { AppComponent } from './app.component';

//----------------------------------------

import { OwnerService } from './owner/owner.service';
import { OwnerComponent } from './owner/owner.component';
//import { AppChildComponent } from './appchild.component';
import { OwnerListComponent } from './owner/ownerList.component';
import { PageNotFoundComponent } from './others/pageNotFound.component';
import { HomeComponent } from './owner/home.component';

//----------------------------------------

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'owners', component: OwnerListComponent },
  { path: 'add-owner', component: OwnerComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent, OwnerComponent,OwnerListComponent,HomeComponent,PageNotFoundComponent
    // AppComponent, OwnerComponent,AppChildComponent,OwnerListComponent,HomeComponent,PageNotFoundComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule,RouterModule.forRoot(appRoutes)
  ],
  providers: [OwnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
