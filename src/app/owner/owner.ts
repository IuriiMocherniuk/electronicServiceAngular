export class Owner{
  get lastName(): string {
    return this.lastName;
  }

  set lastName(value: string) {
    this.lastName = value;
  }
  get id(): string {
    return this.id;
  }

  set id(value: string) {
    this.id = value;
  }
  get firstName(): string {
    return this.firstName;
  }

  set firstName(value: string) {
    this.firstName = value;
  }

  //TODO check undefined is correct?  get - set
  //private _id: string ;
 // firstName: string ;
  //private _lastName: string ;
  constructor(){

  }
}
