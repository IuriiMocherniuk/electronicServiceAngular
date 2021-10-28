import { Component, OnInit } from '@angular/core';
import {Owner} from "../owner/owner";
import {OwnerService} from "../owner/owner.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-owner-update',
  templateUrl: './owner-update.component.html',
  styleUrls: ['./owner-update.component.css']
})
export class OwnerUpdateComponent implements OnInit {

  owner?:Owner;
  changePassword:boolean = false;



  constructor(
    private _ownerService:OwnerService,
  private route: ActivatedRoute,
  private _router: Router
  ) { }

  ngOnInit(): void {
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

  updateOwner( ownerUpdate: Owner): void {
    console.log("OwnerComponent. update ownerUpdate "+JSON.stringify(ownerUpdate));
    if (!ownerUpdate) { return; }
    this._ownerService.updateOwner(ownerUpdate)
      .subscribe();
    this._router.navigate(['owner-detail/'+ownerUpdate.id]);
  }

}
