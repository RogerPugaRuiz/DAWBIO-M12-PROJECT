import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  private signIn: EventEmitter<boolean> = new EventEmitter();

  public getSignIn(){
    return this.signIn;
  }

  public setSignIn(signIn: boolean){
    this.signIn.emit(signIn);
  }
  
  constructor() { }
}
