import {Component, OnInit} from '@angular/core';
import {Device} from "../device/device";
import {Owner} from "../owner/owner";
import {DeviceService} from "../device/device.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';
import {OwnerService} from "../owner/owner.service";

@Component({
  selector: 'app-device-update',
  templateUrl: './device-update.component.html',
  styleUrls: ['./device-update.component.css']
})
export class DeviceUpdateComponent implements OnInit {
  device?: Device;
  owners?: Owner[] ;
  devices?: Device[] ;
  owner?: Owner;
  statuses: string[] = ["used", "damages", "lost", "stolen"];
  types: string[] = ["PC", "Phone", "Laptop", "Smartphone",];

  constructor(private _deviceService: DeviceService,
              private _router: Router,
              private route: ActivatedRoute,
              private _location: Location,
              private _ownerService:OwnerService
  ) {
  }

  ngOnInit(): void {

    this.getOwners();

    var idDevice = this.route.snapshot.paramMap.get('id');
    console.log("OwnerdetailComponent.  onInit, id = " + this.route.snapshot.paramMap.get('id'));

    this._deviceService.getDeviceById(idDevice!)

      .subscribe((deviceData) => {
          this.device = deviceData;
          console.log("DeviceCreateComponent.  onInit, device = " + JSON.stringify(deviceData))
        }
      ),
      (error: String) => {
        console.log(error);
      }
    console.log("DeviceCreateComponent.  onInit, device = " + JSON.stringify(this.owner));
  }

  getOwners(): void{
    console.log("Inside getOwners():::::")
    this._ownerService.getAllOwners()
      .subscribe((ownerData) => this.owners = ownerData,
        (error) =>{
          console.log(error);
          // this.statusMessage = "Problem with service. Please try again later!";
        }
      );
    console.log("end of getOwners():::::");
  }

  updateDevice(device: Device): void {
    console.log("UpdateDeviceComponent. create device " + JSON.stringify(device));
    if (!device) {
      return;
    }
    let deviseNew:Device = { id: this.device?.id, type: this.device?.type, name:this.device?.name,
      code:this.device?.code, status:this.device?.status, ownerId:this.device?.ownerId,  owner:this.owners!.find(h=> h.id === device.owner?.id) as Device}


   // let owner:this.owners!.find(h=> h.id === device.owner) as Owner
   //  console.log("UpdateDeviceComponent. create device " + JSON.stringify(owner));
    this._deviceService.updateDevice(deviseNew)
      .subscribe(device => {
        this.devices!.push(device);
      });
    this._location.back();
  }
}
