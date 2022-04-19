import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private signUp: EventEmitter<boolean> = new EventEmitter();
  
  public getSignUp(){
    return this.signUp;
  }

  public setSignUp(signUp: boolean){
    this.signUp.emit(signUp);
  }
  constructor() { }
}
