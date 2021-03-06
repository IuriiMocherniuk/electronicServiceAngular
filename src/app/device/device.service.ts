import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Device} from './device';
import {MessageService} from '../others/message.service';

@Injectable()
export class DeviceService {
  private log(message: string) {
    this.messageService.add(`DeviceService: ${message}`);
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  url = 'http://localhost:8080/Gradle___com_softserve_academy___electronicService_1_0_SNAPSHOT_war/device';

  constructor(private _httpService: HttpClient,
              private messageService: MessageService) {
  }

  getAllDevices(): Observable<Device[]> {
    return this._httpService.get<Device[]>(this.url).pipe(
      tap(_ => this.log('fetched devices')),
      catchError(this.handleError<Device[]>('getDevices', []))
    );
  }

  getDeviceById(deviceId: string): Observable<Device> {
    return this._httpService.get<Device>(this.url + '/' + deviceId).pipe(
      tap(_ => this.log(`fetched device id=${deviceId}`)),
      catchError(this.handleError<Device>(`getDevice id=${deviceId}`))
    );
  }

  addDevice(device: Device): Observable<Device> {
    let body = JSON.stringify(device)
    console.log("DeviceService. create device " + body);
    return this._httpService.post<Device>(this.url + '/add', body, this.httpOptions).pipe(
      tap((newDevice: Device) => this.log(`added device w/ id=${newDevice.id}`)),
      catchError(this.handleError<Device>('addDevice'))
    );
  }

  deleteDevice(deviceId: string) {
    return this._httpService.delete(this.url + '/' + deviceId).pipe(
      tap(_ => this.log(`deleted device id=${deviceId}`)),
      catchError(this.handleError<Device>('delete Device'))
    );
  }

  updateDevice(device: Device): Observable<any> {
    return this._httpService.put(this.url + `/${device.id}`, device, this.httpOptions).pipe(
      tap(_ => this.log(`updated device id=${device.id}`)),
      catchError(this.handleError<any>('updateDevice'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
