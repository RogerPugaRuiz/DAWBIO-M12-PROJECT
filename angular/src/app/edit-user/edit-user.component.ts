import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { NameAndEmailExistsService } from '../services/name-and-email-exists.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {


  id: string | null = "";
  accents = "àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ";
  user: any;
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
  passwordControl: FormControl = new FormControl('', [
    Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z' + this.accents + '0-9]{8,}$')]);
  
  confirmPasswordControl: FormControl = new FormControl('', [
    Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z' + this.accents + '0-9]{8,}$')]);

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

  nameAlreadyExistsMessage: string = "";
  emailAlreadyExistsMessage: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private settingsService: SettingsService,
    private nameAndEmail: NameAndEmailExistsService,
    private http: HttpClient,
    private router: Router,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.adminService.getUserById(this.id, (obj: any) => {
      this.user = obj;
      console.log("user", this.user);
      this.user = this.user;
      this.usernameControl.setValue(this.user.username);
      this.emailControl.setValue(this.user.email);
      this.firstnameControl.setValue(this.user.firstname);
      this.lastnameControl.setValue(this.user.lastname);
      this.descriptionControl.setValue(this.user.description);
    

      if (this.darkmode) {
        this.green = "rgb( 255, 123, 85)";
        this.red = "rgb( 108, 255, 85 )";
      } else {
        this.green = "rgb(220, 0, 0)";
        this.red = "rgb( 0, 220, 0)";
      }
    });
    this.darkmode = this.settingsService.darkmode;
  }


  updateAccount() {
    if (this.myAccountFormGroup.valid && this.formChange()) {


      this.user.username = this.usernameControl.value;
      this.user.email = this.emailControl.value;
      this.user.firstname = this.firstnameControl.value;
      this.user.lastname = this.lastnameControl.value;
      this.user.description = this.descriptionControl.value;
      this.user.password = this.passwordControl.value;

      this.http.post("http://localhost:8081/api/admin/update-user", this.user)
        .subscribe(
          {
            next: (data: any) => {
              this.setUpdateMessage();
            }
          }
        );
      this.passwordControl.setValue("");
      this.confirmPasswordControl.setValue("");
    }
  }

  setUpdateMessage() {
    this.nameExists();
    this.emailExists();
    if (this.formChange()) {
      this.updateMessage = "Your account needs to be updated";
      this.needUpdate = true;
    } else {
      this.updateMessage = "Your account does not need to be updated";
      this.needUpdate = false;
    }
  }

  private formChange(): boolean {
    return this.user.username != this.usernameControl.value ||
      this.user.email != this.emailControl.value ||
      this.user.firstname != this.firstnameControl.value ||
      this.user.lastname != this.lastnameControl.value ||
      this.user.description != this.descriptionControl.value ||
      this.passwordControl.value != "";
  }

  nameExists() {
    const oldUsername = this.user.username;
    if (this.usernameControl.value != oldUsername) {
      this.nameAndEmail.userNameExists(this.usernameControl);
    }
  }

  emailExists() {
    const oldEmail = this.user.email;
    if (this.emailControl.value != oldEmail) {
      this.nameAndEmail.emailExists(this.emailControl);
    }
  }

  cancelUpdate() {
    this.usernameControl.setValue(this.user.username);
    this.emailControl.setValue(this.user.email);
    this.firstnameControl.setValue(this.user.firstname);
    this.lastnameControl.setValue(this.user.lastname);
    this.descriptionControl.setValue(this.user.description);
    this.setUpdateMessage();
    this.router.navigate(['/admin']);
  }

  updatePassword(e: Event){

  }


}
