import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler, HttpResponse, HttpRequest, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';

import { Owner } from '../model/owner';


import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class OwnerService{
  private log(message: string) {
    this.messageService.add(`OwnerService: ${message}`);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

 url = 'http://localhost:8080/Gradle___com_softserve_academy___electronicService_1_0_SNAPSHOT_war/owner';

  constructor(private _httpService: HttpClient,
              private messageService: MessageService){}

  getAllOwners(): Observable<Owner[]>{
    return this._httpService.get<Owner[]>(this.url).pipe(
      tap(_ => this.log('fetched owners')),
      catchError(this.handleError<Owner[]>('getOwners',[]))
    );
  }

  getOwnerById(ownerId: string): Observable<Owner>{
    return this._httpService.get<Owner>(this.url +'/'+ownerId).pipe(
      tap(_ => this.log(`fetched owner id=${ownerId}`)),
      catchError(this.handleError<Owner>(`getOwner id=${ownerId}`))
    );
  }
  addOwner(owner: Owner): Observable<Owner> {
    let body = JSON.stringify(owner);
    console.log("OwnerService. create owner " + body);
    return this._httpService.post<Owner>(this.url+'/add', body , this.httpOptions).pipe(
      tap((newOwner: Owner) => this.log(`added owner w/ id=${newOwner.id}`)),
      catchError(this.handleError<Owner>('addOwner'))
    );
  }

  deleteOwner(ownerId: string){
    return this._httpService.delete(this.url+'/' + ownerId).pipe(
      tap(_ => this.log(`deleted owner id=${ownerId}`)),
      catchError(this.handleError<Owner>('delete Owner'))
    );
  }

  updateOwner(owner: Owner): Observable<any> {
    return this._httpService.put(this.url + `/${owner.id}`, owner, this.httpOptions).pipe(
      tap(_ => this.log(`updated owner id=${owner.id}`)),
      catchError(this.handleError<any>('updateOwner'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
