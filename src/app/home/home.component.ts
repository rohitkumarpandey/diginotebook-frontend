import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username = "";
  constructor(private authService : AuthService, private router : Router) {
    if(!this.authService.isLoggedIn()){
        this.router.navigateByUrl('/login'); 
    }
   }

  ngOnInit() {
    this.username = this.authService.getUsername();
  }

 logout(){
   if(this.authService.logout()){
     this.router.navigateByUrl('/login');
   }
 }

}
