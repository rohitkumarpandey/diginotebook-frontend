import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  constructor(private http : HttpClient) { }

  getPendingTasks(uid):Promise<any>{
    
    return this.http.get(environment.baseUrl+'/getPendingTasks/'+uid)
    .toPromise()
    .then((res)=>{
        return res;
    }).catch();
  }

  addGoal(uid,data):Promise<any>{
    return this.http.post(environment.baseUrl+'/addTask/'+uid,data)
    .toPromise()
    .then((res)=>{
      return res;
    })
    .catch();
  }

  //delete Task
  deleteTask(uid, tid):Promise<any>{
    return this.http.delete(environment.baseUrl+'/deleteTask/'+uid+'/'+tid)
    .toPromise()
    .then((res)=>{
      return res;

    }).catch()
  }

  //mark task completed
  taskCompleted(tid, data): Promise<any>{
    return this.http.put(environment.baseUrl+'/taskCompleted/'+tid, data)
    .toPromise()
    .then((taskCompleted)=>{
      if(taskCompleted){
        return taskCompleted;
      }
    }).catch(err=> {return err});

  }

  //get all completed tasks
  getAllCompletedTasks(uid){
    return this.http.get(environment.baseUrl+'/getCompletedTasks/'+uid)
    .toPromise()
    .then((res)=>{
      return res;
    }).catch(err=>{return err;})
  } 

 
}
