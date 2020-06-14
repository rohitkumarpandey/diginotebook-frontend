import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide= true;
  registerationForm : FormGroup;
  errorMessage : string = null;

  constructor(private fb : FormBuilder, private service : RegisterService, private router : Router
  , private authService : AuthService) {

    if(this.authService.isLoggedIn()) this.router.navigateByUrl('/home');


    this.registerationForm = this.fb.group({
      userid:['', [Validators.required]],
      username:['', [Validators.required]],
      password : ['', [Validators.required]]
    });
  }
  ngOnInit() {
  }

  register(){
    if(this.authService.isLoggedIn()) this.router.navigateByUrl('/home');
    else{
    this.service.registerService(this.registerationForm.value)
    .then((res)=>{
       if(res.success){
      //fetch userid from form and added to the local  storage
    this.authService.setUserId(this.registerationForm.value.userid);
    //fetching password from form and added to the local  storage
    this.authService.setPassword(this.registerationForm.value.password);
    //seting username from response
    this.authService.setUsername(res.username);
    //setting userid  from response
    this.authService.setUserId(res.userid);
    
    this.router.navigateByUrl('/home');
      }else{
        this.errorMessage = "";
        this.errorMessage = res.errorMessage;
      }
    })
  }
}

}
