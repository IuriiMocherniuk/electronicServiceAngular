import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OwnerService} from './owner.service';
import {Owner} from './owner';

@Component({
  selector: 'app-owner',
 templateUrl: "./owner.component.html",
  styleUrls: ['./owner.component.css'],
 // template: `<h1>This is Test component New!</h1>`

})
export class OwnerComponent implements OnInit{


  get statusMessage(): string {
    return this.statusMessage;
  }

  set statusMessage(value: string) {
    this.statusMessage = value;
  }
  get owners(): Owner[] {
    return this.owners;
  }

  set owners(value: Owner[]) {
    this.owners = value;
  }

  selectedOwner?: Owner;
  onSelect(owner: Owner): void {
    this.selectedOwner = owner;
  }

 owner = new Owner();

  constructor(private _ownerService: OwnerService,
              private _router: Router
              ){}

  ngOnInit(): void {
    console.log("OwnerComponents")
    // this.getOwners();
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

  addOwner(owner: Owner): void {
    console.log("OwnerComponent. create owner "+JSON.stringify(owner));
    if (!owner) { return; }
    this._ownerService.addOwner(owner)
      .subscribe(owner => {
         this.owners.push(owner);
      });
  }

  private reset(){
   // this.owner.id = "";
    this.owner.firstName = "";
    this.owner.lastName = "";
    this.owner.password = "";
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
