import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CredentialsService } from 'src/app/credentials/credentials.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit {
  addCrdenetialForm : FormGroup;
  credentials : [] = null;
  isLoaded : Boolean = false;

  constructor(private fb : FormBuilder, private service : CredentialsService, private authService : AuthService,
  private snackbar : MatSnackBar ) {
    this.addCrdenetialForm = this.fb.group({
      name : ['', [Validators.required]],
      key : ['', [Validators.required]]

    });

    this.getAllCredentials();
   }

  ngOnInit() {
  }

  //addCredentials
  addCredential(){
    console.log(this.authService.getUserId());
    this.service.addCredential(this.authService.getUserId(), this.addCrdenetialForm.value)
    .then((res)=>{
    this.snackbar.open(res,'',{
      duration : 2000
    });
    })
    .then(()=>{
      this.getAllCredentials();
    })

  }

  //get All Credentials
  getAllCredentials(){
    this.isLoaded = false;
    this.credentials = null;
    this.service.getAllCrerdentials(this.authService.getUserId())
    .then((res)=>{
      this.credentials = res;
      })
      .then(()=> this.isLoaded = true);
  }

}
