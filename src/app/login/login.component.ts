import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm, FormGroupDirective } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
//Error when invalid control is dirty, touched, or submitted
export class MyErrorStateMatcher extends ErrorStateMatcher{
  isErrorState(control : FormControl | null, form : FormGroupDirective | NgForm | null) : boolean{
    const isSubmitted = form && form.submitted;

    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted))

  }

} 

@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide= true;
  //login = true;
  loginForm : FormGroup;
  errorMessage :string = null;
   matcher = new MyErrorStateMatcher();
   showProgressBar : boolean = false;

  constructor(private fb : FormBuilder, private authService : AuthService, private router : Router, private service : LoginService
    , private _snackbar : MatSnackBar) {
    this.loginForm = this.fb.group({
      userid:['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]]
    });
     //if user is already logged in
     if(this.authService.isLoggedIn()){
      this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {
   
  }

  login(){
    this.showProgressBar = true;
    this.service.loginService(this.loginForm.value)
    .then((res)=>{
      if(res.success){
      //fetch userid from form and added to the local  storage
      this.authService.setUserId(res.userid);
      //seting username from response
      this.authService.setUsername(res.username);
      //setting userid  from response
      this.authService.setUserId(res.userid);
      //setting token from response
      this.authService.setToken(res.token);
      
  }else{
        if(res.errorMessage) this._snackbar.open(res.errorMessage,'',{ duration : 2000});
        else this._snackbar.open('Something went wrong','',{ duration : 2000});
        this.showProgressBar = false;
        throw new Error('Login Failed');
      }

    })
    .then(()=>{this.showProgressBar = false; window.location.reload();})
    .then(()=> setTimeout(()=>this.router.navigateByUrl('/home'), 1500))
    .catch((err)=>console.log(err));
  }


}
