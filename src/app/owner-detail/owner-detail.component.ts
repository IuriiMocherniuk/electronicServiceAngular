import {Component, Input, OnInit} from '@angular/core';
import {Owner} from "../owner/owner";
import {OwnerService} from "../owner/owner.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DeviceService} from "../device/device.service";
import {Device} from "../device/device";
import {Observable} from "rxjs";
import {catchError, tap} from "rxjs/operators";


@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.css']
  // template: `<h1>This is Test owner-detail Page!</h1>`
})
export class OwnerDetailComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private _ownerService: OwnerService,
    private _deviceService: DeviceService,
    private _router: Router

  ) {
  }

  //
  @Input()
  owner?: Owner;

  ngOnInit(): void {
    this.owner;
    // this.owners;
    //
    var idOwner = this.route.snapshot.paramMap.get('id');
    console.log("OwnerdetailComponent.  onInit, id = "+this.route.snapshot.paramMap.get('id'));

    this._ownerService.getOwnerById(idOwner!)
      .subscribe((ownerData) => {this.owner = ownerData;
        console.log("OwnerData.  onInit, owner = "+ JSON.stringify(ownerData))}
      ),
      (error:String) => {
        console.log(error);


        // this.statusMessage = "Problem with service. Please try again later!";
      }
    console.log("OwnerdetailComponent.  onInit, owner = "+ JSON.stringify(this.owner));

  }

  deleteDevice(deviceId: string){
    console.log("Inside the deleteOwner()::::Owner id::::"+deviceId);
    this._deviceService.deleteDevice(deviceId)
      .subscribe((response) => {  },
        (error:String) =>{
          console.log(error);
          // this.statusMessage = "Problem with service. Please try again later!";
        });
    console.log("end of deleteDevice():::::::");

    // this._router.navigate(['owner-detail/'+ this.owner!.id]);
    window.location.reload();
  }


  getOwner(ownerId: string){
    // this._ownerService.getOwnerById(ownerId)
    //   .subscribe((ownerData) => {this.owner = ownerData; this.getOwners(); }),
    //   (error:String) => {
    //     console.log(error);
    //     this.statusMessage = "Problem with service. Please try again later!";
    //   }
    console.log("Owner list get owner " + ownerId);
    this._router.navigate(['add-device/'+ownerId]);
  }
}
