import {Owner} from "../owner/owner";

export class Device{

  id: string | undefined;
  type: string | undefined;
  name: string | undefined;
  code:string | undefined;
  ownerId:string | undefined;
  status:string | undefined;
  owner:Owner| undefined;

  constructor(){
  }
}
