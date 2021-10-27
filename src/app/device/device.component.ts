import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DeviceService} from './device.service';
import {Device} from './device';

@Component({
  selector: 'app-device',
  templateUrl: "./device.component.html",
  styleUrls: ['./device.component.css'],
  // template: `<h1>This is Test Device component!</h1>`

})
export class DeviceComponent implements OnInit{


  get statusMessage(): string {
    return this.statusMessage;
  }

  set statusMessage(value: string) {
    this.statusMessage = value;
  }
  get devices(): Device[] {
    return this.devices;
  }

  set devices(value: Device[]) {
    this.devices = value;
  }

  selectedDevices?: Device;
  onSelect(device: Device): void {
    this.selectedDevices = device;
  }

  device = new Device();

  constructor(private _deviceService: DeviceService,
              private _router: Router
  ){}

  ngOnInit(): void {
    console.log("DeviceComponents")
    // this.getOwners();
  }

  getDevices(): void{
    this._deviceService.getAllDevices()
      .subscribe((deviceData) => this.devices = deviceData,
        (error) =>{
          console.log(error);
          this.statusMessage = "Problem with service. Please try again later!";
        }
      );

  }

  addDevice(device: Device): void {
    console.log("DeviceComponent. create device "+JSON.stringify(device));
    if (!device) { return; }
    this._deviceService.addDevice(device)
      .subscribe(device => {
        this.devices.push(device);
      });
  }

  private reset(){
    this.device.id = "";
    this.device.type = "";
    this.device.name = "";
    this.device.code = "";
    this.device.ownerId = "";
    this.device.status = "";
  }

  deleteDevice(deviceId: string){
    console.log("Inside the delete Device()::::Device id::::"+deviceId);
    this._deviceService.deleteDevice(deviceId)
      .subscribe((response) => {console.log(response); this.getDevices();},
        (error:String) =>{
          console.log(error);
          this.statusMessage = "Problem with service. Please try again later!";
        });
    this.reset();
    console.log("end of deleteDevice():::::::");
  }

  getDevice(deviceId: string){
    this._deviceService.getDeviceById(deviceId)
      .subscribe((deviceData) => {this.device = deviceData; this.getDevices(); }),
      (error:String) => {
        console.log(error);
        this.statusMessage = "Problem with service. Please try again later!";
      }
    this.reset();
  }
}
