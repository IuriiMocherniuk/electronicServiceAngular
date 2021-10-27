import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//----------------------------------------

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

//----------------------------------------

import { AppComponent } from './app.component';

//----------------------------------------

import { OwnerService } from './owner/owner.service';
import { OwnerComponent } from './owner/owner.component';
import { OwnerListComponent } from './owner/ownerList.component';
import { DeviceService } from './device/device.service';
import { DeviceComponent } from './device/device.component';
import { DeviceListComponent } from './device/deviceList.component';
import { PageNotFoundComponent } from './others/pageNotFound.component';
import { HomeComponent } from './others/home.component';
// import { OwnerDetailComponent } from './owner-detail/owner-detail.component';

//----------------------------------------
//TODO HomeComponentTwo test
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'owners', component: OwnerListComponent },
  { path: 'add-owner', component: OwnerComponent },
  { path: 'devices', component: DeviceListComponent },
  { path: 'add-device', component: DeviceComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent, OwnerComponent,OwnerListComponent,HomeComponent,PageNotFoundComponent, DeviceComponent, DeviceListComponent
    // AppChildComponent, OwnerDetailComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, RouterModule.forRoot(appRoutes)
    // BrowserModule, HttpClientModule, FormsModule,RouterModule
  ],
  providers: [OwnerService, DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
