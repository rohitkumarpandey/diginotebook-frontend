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
 tasks : [] = null;
 completedTasksArray : [] = null;
 message : string = "You do not set any task yet fe";

 isTasksLoaded : boolean =false;
 addGoalForm : FormGroup;
 todayDate =new Date();
 taskCompletedForm : FormGroup;

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
      $('.menu .btn').removeClass('active');
      $('.menu .btn').eq(localStorage.getItem('activeMenuIndex')).addClass('active')
      $('.menu .btn').click(function() {
        $('.menu .btn').removeClass('active');
        $(this).addClass('active');
        localStorage.setItem('activeMenuIndex', $('.menu .btn').index(this));
        
      });

    });
    this.loadAllPendingTasks();
  }
  //load all tasks
  loadAllPendingTasks(){
    if(this.authService.isLoggedIn()) this.router.navigateByUrl('/home');
    
    this.tasks = null;
    this.isTasksLoaded = false;
    this.service.getPendingTasks(this.authService.getUserId())
    .then((res)=>{
        if(res.length !=0) {
          this.tasks = res;
          this.message = null;
        }

        //this.message = res.toString();
    
    }).then(()=>{
      this.isTasksLoaded = true;
    })
  }

  //add goal
  addGoal(){
    if(this.authService.isLoggedIn()) this.router.navigateByUrl('/home');
    this.service.addGoal(this.authService.getUserId(), this.addGoalForm.value)
    .then((res)=>{
        this.snackbar.open(res,'Ok', {
          duration : 3000
        })
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

        this.loadAllPendingTasks();
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
        this.service.taskCompleted(tid, this.taskCompletedForm.value)
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
      // console.log('after dismissed');
      // snackbarref.afterDismissed().subscribe(()=>{
        
      //   if(!this.taskCompletedForm.value.taskCompleted){
         
      //     //this.taskCompletedForm.value.taskCompleted = false;
      //   }
      // });
      }
   
  }

  //load all completed tasks
  getAllCompletedTasks(){
    this.message = null;
    this.completedTasksArray = null;
    this.service.getAllCompletedTasks(this.authService.getUserId())
    .then((res)=>{
      if(res.length !=0 ){
      this.completedTasksArray = res;
      console.log(this.completedTasksArray);
      }else{
        this.message = 'You have not completed any task yet fe';
      }
    }).catch(err=>{this.message = err});

  }

}
