import { Component, OnInit} from '@angular/core';
import { OwnerService } from './owner.service';
import { Owner } from './owner';
import { Router } from '@angular/router';


@Component({
  selector: 'owner-list',
  templateUrl: './ownerList.component.html',
  styleUrls: ['./ownerList.component.css']
})
export class OwnerListComponent implements OnInit{

  selectedOwner?: Owner;
  onSelect(owner: Owner): void {
    this.selectedOwner = owner;
  }

  owner = new Owner();
  statusMessage?: string;
  owners?: Owner[];
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

  deleteOwner(ownerId: string){
    console.log("Inside the deleteBook()::::Book id::::"+ownerId);
    this._ownerService.deleteOwner(ownerId)
      .subscribe((response) => {console.log(response); this.getOwners();},
        (error:String) =>{
          console.log(error);
          this.statusMessage = "Problem with service. Please try again later!";
        });
    console.log("end of deleteOwner():::::::");
  }

  getOwner(ownerId: string){
    // this._ownerService.getOwnerById(ownerId)
    //   .subscribe((ownerData) => {this.owner = ownerData; this.getOwners(); }),
    //   (error:String) => {
    //     console.log(error);
    //     this.statusMessage = "Problem with service. Please try again later!";
    //   }
    console.log("Owner list get owner " + ownerId);
    this._router.navigate(['owner-detail/'+ownerId])
   }

}
