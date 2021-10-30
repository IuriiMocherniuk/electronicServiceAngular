import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

//----------------------------------------
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

//----------------------------------------
import {AppComponent} from './app.component';

//----------------------------------------
import {OwnerService} from './service/owner.service';
import {OwnerComponent} from './dao/owner/owner-create/owner.component';
import {OwnerListComponent} from './dao/owner/owner-getall/ownerList.component';
import {DeviceService} from './service/device.service';
import {DeviceListComponent} from './dao/device/device-getall/deviceList.component';
import {PageNotFoundComponent} from './others/pageNotFound.component';
import {HomeComponent} from './others/home.component';
import {OwnerDetailComponent} from './dao/owner/owner-details/owner-details.component';
import {DeviceCreateComponent} from './dao/device/device-create/device-create.component';
import {OwnerUpdateComponent} from './dao/owner/owner-update/owner-update.component';
import {DeviceUpdateComponent} from './dao/device/device-update/device-update.component';

//----------------------------------------

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'owners', component: OwnerListComponent},
  {path: 'add-owner', component: OwnerComponent},
  {path: 'devices', component: DeviceListComponent},
  {path: 'add-device/:id', component: DeviceCreateComponent},
  {path: 'update-owner/:id', component: OwnerUpdateComponent},
  {path: 'update-device/:id', component: DeviceUpdateComponent},
  {path: 'owner-detail/:id', component: OwnerDetailComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},

];

@NgModule({
  declarations: [
    AppComponent, OwnerComponent, OwnerListComponent, HomeComponent, PageNotFoundComponent, DeviceListComponent,
    OwnerDetailComponent, DeviceCreateComponent, OwnerUpdateComponent, DeviceUpdateComponent,

  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, RouterModule.forRoot(appRoutes)
  ],

  providers: [OwnerService, DeviceService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
