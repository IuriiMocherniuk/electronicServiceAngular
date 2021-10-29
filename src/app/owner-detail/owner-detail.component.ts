import {Component, OnInit} from '@angular/core';
import {Owner} from "../owner/owner";
import {OwnerService} from "../owner/owner.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DeviceService} from "../device/device.service";


@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.css']
})
export class OwnerDetailComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private _ownerService: OwnerService,
    private _deviceService: DeviceService,
    private _router: Router
  ) {
  }

  owner?: Owner;

  ngOnInit(): void {
    this.owner;
    var idOwner = this.route.snapshot.paramMap.get('id');
    console.log("OwnerdetailComponent.  onInit, id = " + this.route.snapshot.paramMap.get('id'));
    this._ownerService.getOwnerById(idOwner!)
      .subscribe((ownerData) => {
          this.owner = ownerData;
          console.log("OwnerData.  onInit, owner = " + JSON.stringify(ownerData))
        }
      ),
      (error: String) => {
        console.log(error);
      }
    console.log("OwnerdetailComponent.  onInit, owner = " + JSON.stringify(this.owner));

  }

  deleteDevice(deviceId: string) {
    console.log("Inside the deleteOwner()::::Owner id::::" + deviceId);
    this._deviceService.deleteDevice(deviceId)
      .subscribe((response) => {
        },
        (error: String) => {
          console.log(error);
          // this.statusMessage = "Problem with service. Please try again later!";
        });
    console.log("end of deleteDevice():::::::");
    window.location.reload();
  }

  redirect(path: string) {
    console.log("redirect to " + path);
    this._router.navigate([path]);

  }

}
