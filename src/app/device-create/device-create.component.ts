import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OwnerService} from "../owner/owner.service";
import {DeviceService} from "../device/device.service";
import {Owner} from "../owner/owner";
import {Device} from "../device/device";
import { Router } from '@angular/router';
// import {statuses} from "../others/constants"

@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html',
  styleUrls: ['./device-create.component.css']
})

export class DeviceCreateComponent implements OnInit {




  constructor(
    private route: ActivatedRoute,
    private _ownerService: OwnerService,
    private _deviceService: DeviceService,
    private _router: Router

  ) {
  }

  get devices(): Device[] {
    return this.devices;
  }

  set devices(value: Device[]) {
    this.devices = value;
  }
  @Input()
  owner?: Owner;

  statuses:string[] =["used","damages","lost","stolen"];
  types:string[] =["PC","Phone","Laptop","Smartphone",];

  device = new Device();

  ngOnInit(): void {

   this.statuses;
    this.owner;
    // this.owners;
    //
    var idOwner = this.route.snapshot.paramMap.get('id');
    console.log("DeviceCreateComponent.  onInit, id = "+this.route.snapshot.paramMap.get('id'));

    this._ownerService.getOwnerById(idOwner!)
      .subscribe((ownerData) => {this.owner = ownerData;
        console.log("OwnerData.  onInit, owner = "+ JSON.stringify(ownerData))}
      ),
      (error:String) => {
        console.log(error);
        // this.statusMessage = "Problem with service. Please try again later!";
      }
    console.log("deviceCreateComponent.  onInit, owner = "+ JSON.stringify(this.owner));
  }

  addDevice(device: Device): void {
    console.log("DeviceComponent. create device before "+JSON.stringify(device));
    if (!device) { return; }

    device.owner = this.owner;
    console.log("DeviceComponent. create device after "+JSON.stringify(device));
    this._deviceService.addDevice(device)
      .subscribe(device => {
        this.devices.push(device);
      });

    this._router.navigate(['owner-detail/'+ this.owner!.id]);


      // window.location.reload();
  }



}
