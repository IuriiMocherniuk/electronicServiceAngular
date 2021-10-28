import {Component, Input, OnInit} from '@angular/core';
import {Owner} from "../owner/owner";
// import {OwnerComponent} from "../owner/owner.component";
import {OwnerService} from "../owner/owner.service";
// import {OwnerListComponent} from "../owner/ownerList.component";
import {ActivatedRoute} from "@angular/router";
import {DeviceService} from "../device/device.service";


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
    // private location: Location,
  ) {
  }

  //
  @Input()
  owner?: Owner;
  //
  // @Input()
  // owners?: Owner[];
  //

  // @Input()
  // ownerComponent?: OwnerComponent;
  //
  // @Input()
  // ownerListComponent?: OwnerListComponent;
  //
  // selectedOwner?: Owner;

  // onSelect(owner: Owner): void {
  //   this.selectedOwner = owner;
  // }

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

  // update(owner: Owner) {
  //   console.log("OwnerComponent. update owner " + JSON.stringify(owner));
  //   if (!owner) {
  //     return;
  //   }
  //   this._ownerService!.updateOwner(owner)
  //     .subscribe(owner => {
  //       this.owners!.push(owner);
  //     });
  //   // this._router.navigate(['/owners'])
  //
  // }
  deleteDevice(deviceId: string){
    console.log("Inside the deleteOwner()::::Owner id::::"+deviceId);
    this._deviceService.deleteDevice(deviceId)
      .subscribe((response) => {console.log(response)},
        (error:String) =>{
          console.log(error);
          // this.statusMessage = "Problem with service. Please try again later!";
        });
    console.log("end of deleteDevice():::::::");
  }
}
