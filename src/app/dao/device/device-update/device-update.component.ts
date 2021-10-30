import {Component, OnInit} from '@angular/core';
import {Device} from "../../../model/device";
import {Owner} from "../../../model/owner";
import {DeviceService} from "../../../service/device.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-device-update',
  templateUrl: './device-update.component.html',
  styleUrls: ['./device-update.component.css']
})
export class DeviceUpdateComponent implements OnInit {
  device?: Device;
  devices?: Device[];
  owner?: Owner;
  statuses: string[] = ["used", "damages", "lost", "stolen"];
  types: string[] = ["PC", "Phone", "Laptop", "Smartphone",];

  constructor(private _deviceService: DeviceService,
              private _router: Router,
              private route: ActivatedRoute,
              private _location: Location
  ) {
  }

  ngOnInit(): void {

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

  updateDevice(device: Device): void {
    console.log("UpdateDeviceComponent. create device " + JSON.stringify(device));
    if (!device) {
      return;
    }
    this._deviceService.updateDevice(device)
      .subscribe(device => {
        this.devices!.push(device);
      });
    this._location.back();
  }
}
