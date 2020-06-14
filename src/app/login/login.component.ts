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
    this.service.loginService(this.loginForm.value)
    .then((res)=>{
      if(res.success){
      //fetch userid from form and added to the local  storage
    this.authService.setUserId(this.loginForm.value.userid);
    //fetching password from form and added to the local  storage
    this.authService.setPassword(this.loginForm.value.password);
    //seting username from response
    this.authService.setUsername(res.username);
    //setting userid  from response
    this.authService.setUserId(res.userid);
    
    this.router.navigateByUrl('/home');
      }else{
        this._snackbar.open(res.errorMessage,'Ok',{ duration : 2000});
      }

    })

    


  }


}
