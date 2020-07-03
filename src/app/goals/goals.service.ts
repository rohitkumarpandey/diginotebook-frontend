import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  header;
  constructor(private http : HttpClient, private authService : AuthService) {
    this.header = new HttpHeaders()
    .set('token', this.authService.getToken());
   }

  getPendingTasks(uid):Promise<any>{
    
    return this.http.get(environment.baseUrl+'/getPendingTasks/'+uid, {
      headers : this.header
    })
    .toPromise()
    .then((res : any)=>{
        return res;
    }).catch();
  }

  addGoal(uid,data):Promise<any>{
    return this.http.post(environment.baseUrl+'/addTask/'+uid, data,{
      headers : this.header
    })
    .toPromise()
    .then((res)=>{
      return res;
    })
    .catch();
  }

  //delete Task
  deleteTask(uid, tid):Promise<any>{
    return this.http.delete(environment.baseUrl+'/deleteTask/'+uid+'/'+tid, {
      headers : this.header
    })
    .toPromise()
    .then((res)=>{
      return res;

    }).catch()
  }

  //mark task completed
  taskCompleted(uid, tid, data): Promise<any>{
    return this.http.put(environment.baseUrl+'/taskCompleted/'+uid+'/'+tid, data, {
      headers : this.header
    }) 
    .toPromise()
    .then((taskCompleted)=>{
      if(taskCompleted){
        return taskCompleted;
      }
    }).catch(err=> {return err});

  }

  //get all completed tasks
  getAllCompletedTasks(uid){
    return this.http.get(environment.baseUrl+'/getCompletedTasks/'+uid, {
      headers : this.header
    })
    .toPromise()
    .then((res)=>{
      return res;
    }).catch(err=>{return err;});
  } 

 
}
