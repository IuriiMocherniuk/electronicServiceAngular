import {Device} from "../device/device";

export class Owner{

  id: string | undefined;
  firstName?: string;
  lastName?: string;
  password?:string;
  devices?:Device[];

  constructor(){
  }
}
