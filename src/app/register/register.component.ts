import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm, FormGroupDirective } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

import {ErrorStateMatcher} from '@angular/material/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';
declare var $ : any;

//Error when invalid control is dirty, touched, or submitted
export class MyErrorStateMatcher extends ErrorStateMatcher{
  isErrorState(control : FormControl | null, form : FormGroupDirective | NgForm | null) : boolean{
    const isSubmitted = form && form.submitted;

    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted))

  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide= true;
  registerationForm : FormGroup;
  emailVerificationForm : FormGroup;
  errorMessage : string = null;
  matcher = new MyErrorStateMatcher();
  isLoaded : boolean = true;
  isEmailVerified : boolean  = false;
  emailId : String = 'abc@gmail.com';
  message :string;

  constructor(private fb : FormBuilder, private service : RegisterService, private router : Router
  , private authService : AuthService, private snackbar : MatSnackBar) {

    if(this.authService.isLoggedIn()) this.router.navigateByUrl('/home');


    this.registerationForm = this.fb.group({
      userid:['', [Validators.required, Validators.email]],
      username:['', [Validators.required]],
      password : ['', [Validators.required, Validators.minLength(6)]]
    });

    this.emailVerificationForm = this.fb.group({
      userid : ['', [Validators.required]],
      verificationCode :['', [Validators.required, Validators.pattern('^[0-9]{6}')]]
    });
  }
  ngOnInit() {
  }

  sendVerificationCode(){
    
    this.service.sendVerificationCode(this.registerationForm.value)
    .then((res)=>{
      if(res.success){
          this.emailId = this.registerationForm.value.userid;
          this.message = res.message;
          $('#myModal').modal('show');
      }else throw new Error(res.errorMessage);
    }).catch(err=>{
      this.message = err;
    })
    .finally(()=>{
        this.snackbar.open(this.message,'',{
          duration : 2000
        });
    });
  }

  verifyEmail(){
    this.emailVerificationForm.value.userid = this.emailId;
    this.emailVerificationForm.value.verificationCode = $('#verificationCode').val();
    this.service.verifyEmail(this.emailVerificationForm.value)
    .then((res)=>{
      if(res.success){
        this.message = res.message;
        $('#myModal').modal('hide');
        this.isEmailVerified = true;
      }else { 
        throw new Error(res.errorMessage);
      }
    })
    .catch((err)=> this.message = err)
    .finally(()=>{
      this.snackbar.open(this.message, '', {
        duration : 2000
      });
    });


  }

  register(){
    this.isLoaded = false;
    if(this.authService.isLoggedIn()) this.router.navigateByUrl('/home');
    else{
    this.service.registerService(this.registerationForm.value)
    .then((res)=>{
       if(res.success && res.token){
      //fetch userid from form and added to the local  storage
    this.authService.setUserId(this.registerationForm.value.userid);
    //fetching password from form and added to the local  storage
    //this.authService.setPassword(this.registerationForm.value.password);
    //seting username from response
    this.authService.setUsername(res.username);
    //setting userid  from response
    this.authService.setUserId(res.userid);
    //setting token from response
    this.authService.setToken(res.token);
      }else{
        this.errorMessage = "";
        this.errorMessage = res.errorMessage;
        throw new Error('Error occured');
      }
    })
    .then(()=>{      
      this.isLoaded = true;
      window.location.reload();
    })
    .then(()=> setTimeout(()=>this.router.navigateByUrl('/home'), 1500))
    .catch((err)=>console.log(err));
  }
}

}
