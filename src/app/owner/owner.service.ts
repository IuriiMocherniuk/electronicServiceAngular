import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler, HttpResponse, HttpRequest, HttpHeaders} from '@angular/common/http';
//Http, Response, Headers, RequestOptions
import { Observable, throwError } from 'rxjs';

import { Owner } from './owner';


@Injectable()
export class OwnerService{

url:string = "http://localhost:8080/Gradle___com_softserve_academy___electronicService_1_0_SNAPSHOT_war/owner";

  constructor(private _httpService: HttpClient){}

  getAllOwners(): Observable<Owner[]>{
    return this._httpService.get<Owner[]>(this.url);
      // .map((owners:Owner[]) => response.json())
      // .catch(this.handleError);
  }

  getOwnerById(ownerId: string): Observable<Owner>{
    return this._httpService.get<Owner>(this.url +"/"+ownerId);
      // .map((response: Response) => response.json())
      // .catchError(this.handleError);
  }

  addOwner(owner: Owner){
    let body = JSON.parse(JSON.stringify(owner));
    let headers = new HttpHeaders();
    headers = headers.set( 'Content-Type', 'application/json; charset=utf-8');

    let options = new HttpResponse({headers:headers});

    //TODO CHECK let options = new HttpResponse({ headers: headers })
    // let options = new HttpResponse({ headers: headers });
    if(owner.id){
      return this._httpService.put(this.url +"/"+owner.id, body, options);
    }else{
      return this._httpService.post(this.url +"/add" , body, options);
    }
  }

  deleteOwner(ownerId: string){
    return this._httpService.delete(this.url+"/" + ownerId);
  }

  private static handleError(error: Response){
    return Observable.throw (error);
  }
}
