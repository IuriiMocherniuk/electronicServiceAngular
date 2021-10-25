import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OwnerService } from './owner.service';
import { Owner } from './owner';
import { Router } from '@angular/router';


@Component({
  selector: 'owner-list2',
  templateUrl: './ownerList.component.html',
  styleUrls: ['./ownerList.component.css']
})
export class OwnerListComponent implements OnInit{
  owner = new Owner();
  //TODO check undefined is correct?
  statusMessage: string | undefined;
  owners: Owner[] | undefined;
  constructor(private _ownerService: OwnerService,
              private _router: Router){}

  ngOnInit(): void {
    console.log("calling ngOnInit()::::");
    this.getOwners();
  }

  getOwners(): void{
    console.log("Inside getOwners():::::")
    this._ownerService.getAllOwners()
      .subscribe((ownerData) => this.owners = ownerData,
        (error) =>{
          console.log(error);
          this.statusMessage = "Problem with service. Please try again later!";
        }
      );
    console.log("end of getOwners():::::");
  }
}
