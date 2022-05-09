import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { SignInService } from '../services/sign-in.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SettingsComponent } from '../settings/settings.component';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  accents = "àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ";
  myAccount: any;
  usernameControl: FormControl = new FormControl('', [
    Validators.pattern('[' + this.accents + 'a-zA-Z0-9]{3,20}')
  ]);
  emailControl: FormControl = new FormControl('', [
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
  ]);
  firstnameControl: FormControl = new FormControl('', [
    Validators.pattern('[' + this.accents + 'a-zA-Z ]{3,20}')
  ]);
  lastnameControl: FormControl = new FormControl('', [
    Validators.pattern('[' + this.accents + 'a-zA-Z ]{3,20}')
  ]);
  descriptionControl: FormControl = new FormControl();
  myAccountFormGroup: FormGroup = new FormGroup({
    username: this.usernameControl,
    email: this.emailControl,
    firstname: this.firstnameControl,
    lastname: this.lastnameControl,
    description: this.descriptionControl
  });

  updateMessage: string = "Your account does not need to be updated";
  needUpdate: boolean = false;
  darkmode?: boolean;

  green: string = '';
  red: string = '';

  constructor(
    private http: HttpClient,
    private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.http.get("http://localhost:8081/api/users/myaccount").subscribe(
      {
        next: (data: any) => {
          this.myAccount = data.data.myAccount;
          this.usernameControl.setValue(this.myAccount.username);
          this.emailControl.setValue(this.myAccount.email);
          this.firstnameControl.setValue(this.myAccount.firstname);
          this.lastnameControl.setValue(this.myAccount.lastname);
          this.descriptionControl.setValue(this.myAccount.description);

        }
      }
    );

    this.darkmode = this.settingsService.darkmode;
    this.settingsService.getDarkMode().subscribe(
      darkmode => {
        this.darkmode = darkmode;
      }
    );

    if (this.darkmode) {
      this.green = "rgb( 255, 123, 85)";
      this.red = "rgb( 108, 255, 85 )";
    } else {
      this.green = "rgb(220, 0, 0)";
      this.red = "rgb( 0, 220, 0)";
    }
  }

  updateAccount() {

    if (this.myAccountFormGroup.valid && this.formChange()) {


      this.myAccount.username = this.usernameControl.value;
      this.myAccount.email = this.emailControl.value;
      this.myAccount.firstname = this.firstnameControl.value;
      this.myAccount.lastname = this.lastnameControl.value;
      this.myAccount.description = this.descriptionControl.value;

      this.http.post("http://localhost:8081/api/users/myaccount", this.myAccount)
        .subscribe(
          {
            next: (data: any) => {
              this.setUpdateMessage();
            }
          }
        )

    }
  }

  setUpdateMessage() {
    if (this.formChange()) {
      this.updateMessage = "Your account needs to be updated";
      this.needUpdate = true;
    } else {
      this.updateMessage = "Your account does not need to be updated";
      this.needUpdate = false;
    }
  }

  private formChange(): boolean {
    return this.myAccount.username != this.usernameControl.value ||
      this.myAccount.email != this.emailControl.value ||
      this.myAccount.firstname != this.firstnameControl.value ||
      this.myAccount.lastname != this.lastnameControl.value ||
      this.myAccount.description != this.descriptionControl.value;
  }
}
