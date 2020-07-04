import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http :HttpClient) { }


  loginService(data):Promise<any>{
    return this.http.post(environment.baseUrl+'/login', data)
    .toPromise()
    .then((user : any)=>{
        return user;
       
    }).catch(err=>{
      console.log(err);
    })

  }
}
