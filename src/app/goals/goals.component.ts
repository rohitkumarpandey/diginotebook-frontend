import { Component, OnInit } from '@angular/core';
import { GoalsService } from './goals.service';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {
 tasks : [] = null;
 message : string = null;
 isCompleted :boolean= true;
 isTasksLoaded : boolean =false;
 addGoalForm : FormGroup;

  constructor(private service : GoalsService, private authService : AuthService, private fb : FormBuilder,
     private snackbar : MatSnackBar, private router : Router) { 

    this.addGoalForm = this.fb.group({
      taskname : ['',[Validators.required]],
      deadline : ['', [Validators.required]],
      priority : ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.loadAllTasks();
  }
  //load all tasks
  loadAllTasks(){
    if(this.authService.isLoggedIn()) this.router.navigateByUrl('/home');
    this.message = null;
    this.tasks = null;
    this.isTasksLoaded = false;
    this.service.getTasks(this.authService.getUserId())
    .then((res)=>{
        if(res.length !=0){
          this.tasks = res;
        }else{
          this.message = "You do not set any task yet";
          
        }
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
        this.loadAllTasks();
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

        this.loadAllTasks();
      })
    });
    
    

  }
}

}
