import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  constructor(private http : HttpClient) { }

  getTasks(uid):Promise<any>{
    return this.http.get(environment.baseUrl+'/getTasks/'+uid)
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

 
}
