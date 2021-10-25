import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OwnerService} from './owner.service';
import {Owner} from './owner';

@Component({
  selector: 'app-owner',
  // TODO app-owner is it name of project?
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit{

  //TODO check undefined is correct?
  owners: Owner[] | undefined;
  statusMessage: string | undefined;
  owner = new Owner();

  constructor(private _ownerService: OwnerService,
              private _router: Router){}

  ngOnInit(): void {
    console.log("OwnerComponents")
    this.getOwners();
  }

  getOwners(): void{
    this._ownerService.getAllOwners()
      .subscribe((ownerData) => this.owners = ownerData,
        (error) =>{
          console.log(error);
          this.statusMessage = "Problem with service. Please try again later!";
        }
      );

  }

  addOwner(): void{
  // addOwner(): void{
    this._ownerService.addOwner(this.owner)
      .subscribe((response) => {console.log(response); this.getOwners();this.reset();},
        (error:string) =>{
          console.log(error);
          this.statusMessage = "Problem with service. Please try again later!";
        }
      );
  }

  private reset(){
    this.owner.id == null;
    this.owner.firstName == null;
    this.owner.lastName == null;
  }

  deleteOwner(ownerId: string){
    console.log("Inside the deleteBook()::::Book id::::"+ownerId);
    this._ownerService.deleteOwner(ownerId)
      .subscribe((response) => {console.log(response); this.getOwners();},
        (error:String) =>{
          console.log(error);
          this.statusMessage = "Problem with service. Please try again later!";
        });
    this.reset();
    console.log("end of deleteOwner():::::::");
  }

  getOwner(ownerId: string){
    this._ownerService.getOwnerById(ownerId)
      .subscribe((ownerData) => {this.owner = ownerData; this.getOwners(); }),
      (error:String) => {
        console.log(error);
        this.statusMessage = "Problem with service. Please try again later!";
      }
    this.reset();
  }
}
