import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
declare var $ : any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username = "";
  activeLink = null;
  constructor(private authService : AuthService, private router : Router, private service : HomeService) {
    if(!this.authService.isLoggedIn()){
        this.router.navigateByUrl('/login'); 
    }
    
    
   }

  ngOnInit() {
    $(document).ready(function(){
      $(this).scrollTop(0);
      $('.scrollmenu .btn').removeClass('active');
      $('.scrollmenu .btn').eq(localStorage.getItem('activeTabIndex')).addClass('active')
      $('.scrollmenu .btn').click(function() {
        $('.scrollmenu .btn').removeClass('active');
        $(this).addClass('active');
        localStorage.setItem('activeTabIndex', $('.scrollmenu .btn').index(this));
        
      });

    });
    this.username = this.authService.getUsername();
    
  }

 logout(){
  if(this.authService.logout()){
    
    this.router.navigateByUrl('/login');
     
   }
 
   
 }

}
