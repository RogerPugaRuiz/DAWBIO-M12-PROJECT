import { Component, OnInit } from '@angular/core';
import { ConnectBackendApiService } from '../services/connect-backend-api.service';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-execute-script',
  templateUrl: './execute-script.component.html',
  styleUrls: ['./execute-script.component.css']
})
export class ExecuteScriptComponent implements OnInit {

  constructor(private service: ConnectBackendApiService, private SpinnerService: SpinnerService) { }
  //Variable for save subscription of script request
  scriptSub: any; 

  requestsCount: any = null;

  //Variable for check if user is Logged
  userLogged: any = null;

  ngOnInit(): void {
        //Check if user cookie exist
        if(this.service.getCookie('user')){
          //If exist, get cookie User
          this.userLogged = JSON.parse(this.service.getCookie('user'))
          //Check if user is in DataBase
          this.service.login(this.userLogged.username, this.userLogged.password).subscribe({
            //Wait for response
            next: (response: any) => {
              //If valid user is logged show content and display data
              if(response.length > 0){
                this.userLogged = response[0]
                //Get script execute count from backend
                this.service.getScriptCount().subscribe({
                  //Wait for response
                  next: (response: any) => {
                    //Set script execute count to variable
                    this.requestsCount = response[0];
                  },
                  error: (err: any) => {
                    console.log("Request Error - " + err.message);
                  },
                  complete: () => {}
                });
              }
              else {
                this.userLogged = null; 
              }
            },
            error: (err: any) => {
              console.log("Request Error - " + err.message);
            },
            complete: () => {}
        })
      }
  }

  /*

  callScript - Call to Script from backend to update map data

  */
  callScript(): void{
    //Call loading spinner
    this.SpinnerService.callSpinner()
    //Call to script from backend and then the script starts to execute in backend
    this.scriptSub = this.service.callScript().subscribe({
      //Wait for response
      next: (response: any) => {
        //If get response (script ended), stop loading spinner
        this.SpinnerService.stopSpinner();
        //Get script execute count from backend
        this.service.getScriptCount().subscribe({
          //Wait for response
          next: (response: any) => {
            //Set script execute count to variable
            this.requestsCount = response[0];
          },
          error: (err: any) => {
            console.log("Request Error - " + err.message);
          },
          complete: () => {}
        });
      },
      error: (err: any) => {
        console.log("Request Error - " + err.message);
      },
      complete: () => {}
    })
  }

  /*

  cancelScript - Cancel the Script from backend that updates map data

  */
  cancelScript(): void{
    //If subcription to scriptCall is active enter if
    if (this.scriptSub) {
      //Kill the script from backend
      this.service.killScript().subscribe({
        //Wait for response
        next: (response: any) => {
          //If get response(script task killed), stop loading spinner
          this.SpinnerService.stopSpinner();
          //Get script execute count from backend
          this.service.getScriptCount().subscribe({
            //Wait for response
            next: (response: any) => {
              //Set script execute count to variable
              this.requestsCount = response[0];
            },
            error: (err: any) => {
              console.log("Request Error - " + err.message);
            },
            complete: () => {}
          });
        },
        error: (err: any) => {
          console.log("Request Error - " + err.message);
        },
        complete: () => {}
      });
      //Unsubscribe to scriptCall
      this.scriptSub.unsubscribe();
    }
  }

}
