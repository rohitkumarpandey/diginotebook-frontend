import { Component, OnInit } from '@angular/core';
import { GoalsService } from './goals.service';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
declare var $ : any;

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {
 tasks : [];
 completedTasksArray : [];
 message : string = null;;

 isTasksLoaded : boolean = false;
 addGoalForm : FormGroup;
 todayDate =new Date();
 taskCompletedForm : FormGroup;
 showCompletedTasks : boolean = false;

  constructor(private service : GoalsService, private authService : AuthService, private fb : FormBuilder,
     private snackbar : MatSnackBar, private router : Router) { 

    this.addGoalForm = this.fb.group({
      taskname : ['',[Validators.required]],
      deadline : ['', [Validators.required]],
      priority : ['', [Validators.required]]
    });

    this.taskCompletedForm = this.fb.group({
      taskCompleted : [false]
    });

    
  }

  ngOnInit() {
    $(document).ready(function(){
      $(this).scrollTop(0);
      $('.menu .btn').click(function() {
        $('.menu .btn').removeClass('active');
        $(this).addClass('active');        
      });
    });
    this.loadAllPendingTasks();
    
  }
  //load all tasks
  loadAllPendingTasks(){
    
    if(this.authService.isLoggedIn()) this.router.navigateByUrl('/home');
    this.taskCompletedForm.reset();
    this.tasks = [];
    this.isTasksLoaded = false;
    this.showCompletedTasks = false;
    this.message = null;
    this.service.getPendingTasks(this.authService.getUserId())
    .then((res)=>{
        if(res.length != 0) this.tasks = res;    
    })
    .then(()=>{
      this.isTasksLoaded = true;
      if(this.tasks.length == 0) this.message = 'You do not have any task';
    });
  
  
  }

  //add goal
  addGoal(){
    if(this.authService.isLoggedIn()) this.router.navigateByUrl('/home');
    this.service.addGoal(this.authService.getUserId(), this.addGoalForm.value)
    .then((res)=>{
        this.snackbar.open(res,'Ok', {
          duration : 3000
        });
        
    })
    .then(()=>{
      this.addGoalForm.reset();
      this.loadAllPendingTasks();
    })
    .catch();
  }


  //delete goal
  deleteTask(taskid, taskname){
    if(!this.authService.isLoggedIn()) this.router.navigateByUrl('/login');
    else{
   let snackbarref =  this.snackbar.open('Delete Task: '+taskname.charAt(0).toUpperCase()+ taskname.slice(1)+' ?', 'Delete', {
     duration :2000
   });
    snackbarref.onAction().subscribe(() => {
      this.service.deleteTask(this.authService.getUserId(), taskid)
      .then((res)=>{
        this.snackbar.open(res,'',{
          duration : 1500
        });

        this.showCompletedTasks ? this.getAllCompletedTasks() : this.loadAllPendingTasks();
      })
    });}
  }

  //mark Task Completed
  completedTask(event, tid){
    
    if(event.checked){
      let snackbarref = this.snackbar.open('Task Completed ?','Yes', {
        duration : 2000
      });
      snackbarref.onAction().subscribe(()=>{
        this.taskCompletedForm.value.taskCompleted = true;
        this.service.taskCompleted(this.authService.getUserId(), tid, this.taskCompletedForm.value)
        .then((res)=>{
          this.snackbar.open(res,'',{
            duration : 2000});
            this.loadAllPendingTasks();
        }).catch((err)=>{
          this.snackbar.open(err,'',{
            duration : 2000});
            this.loadAllPendingTasks();
        })
      });
      }
   
  }

  //load all completed tasks
  getAllCompletedTasks(){
   
          this.isTasksLoaded  = false;
          this.tasks = [];
          this.completedTasksArray = [];
          this.message = null;
          this.service.getAllCompletedTasks(this.authService.getUserId())
          .then((res)=>{
            if(res.length !=0 ){
            this.completedTasksArray = res;
            }
          })
          .then(()=>{
            if(this.completedTasksArray.length == 0) this.message = 'You have not completed any task';
            this.showCompletedTasks = true;
            this.isTasksLoaded = true;
            
          })
          .catch(err=>{this.message = err});
    
  }


}
