import {Component, OnInit} from '@angular/core';
import {DeviceService} from './device.service';
import {Device} from './device';
import {Router} from '@angular/router';


@Component({
  selector: 'device-list',
  templateUrl: './deviceList.component.html',
  styleUrls: ['./deviceList.component.css']
})
export class DeviceListComponent implements OnInit {
  device = new Device();
  statusMessage?: string;
  devices?: Device[];

  constructor(private _deviceService: DeviceService,
              private _router: Router) {
  }

  ngOnInit(): void {
    console.log("calling ngOnInit()::::");
    this.getDevices();
  }

  getDevices(): void {
    console.log("Inside getDevices():::::");
    this._deviceService.getAllDevices()
      .subscribe((deviceData) => this.devices = deviceData,
        (error) => {
          console.log(error);
          this.statusMessage = "Problem with service. Please try again later!";
        }
      );
    console.log("end of getDevices():::::");
  }

  deleteDevice(deviceId: string) {
    console.log("Inside the deleteOwner()::::Owner id::::" + deviceId);
    this._deviceService.deleteDevice(deviceId)
      .subscribe((response) => {
          console.log(response);
          this.getDevices();
        },
        (error: String) => {
          console.log(error);
          this.statusMessage = "Problem with service. Please try again later!";
        });
    console.log("end of deleteDevice():::::::");
  }

  getDevice(deviceId: string) {
    this._deviceService.getDeviceById(deviceId)
      .subscribe((deviceData) => {
        this.device = deviceData;
        this.getDevices();
      }),
      (error: String) => {
        console.log(error);
        this.statusMessage = "Problem with service. Please try again later!";
      }
  }

  redirect(path: string) {
    console.log("redirect to " + path);
    this._router.navigate([path]);

  }

}
