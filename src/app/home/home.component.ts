import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { HomeService } from './home.service';
import { filter } from 'rxjs/operators';
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
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {
      $('.scrollmenu .btn').removeClass('active');
      if(event.url.split('/').pop().includes('goals') || event.url.split('/').pop().includes('home')) $('.scrollmenu .btn').eq(0).addClass('active');      
      else if(event.url.split('/').pop().includes('credentials')) $('.scrollmenu .btn').eq(1).addClass('active');
      else if(event.url.split('/').pop().includes('notes')) $('.scrollmenu .btn').eq(2).addClass('active');
     
     
    });
    
    
   }

  ngOnInit() {
    
    // $(document).ready(function(){
    //   $(this).scrollTop(0);
    //   $('.scrollmenu .btn').removeClass('active');
    //   $('.scrollmenu .btn').eq(localStorage.getItem('activeTabIndex')).addClass('active')
    //   $('.scrollmenu .btn').click(function() {
    //     $('.scrollmenu .btn').removeClass('active');
    //     $(this).addClass('active');
    //     localStorage.setItem('activeTabIndex', $('.scrollmenu .btn').index(this));
        
    //   });

    // });
    this.username = this.authService.getUsername();
    
  }

 logout(){
  if(this.authService.logout()){
    
    this.router.navigateByUrl('/login');
     
   }
 
   
 }

}
