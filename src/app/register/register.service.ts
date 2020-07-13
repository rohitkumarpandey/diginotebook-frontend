import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http : HttpClient) { }

  //send verification code
  sendVerificationCode(data) : Promise<any>{
    return this.http.post(environment.baseUrl+'/sendVerificationCode',data)
    .toPromise()
    .then(res=> {return res});
  }

  //verify Email
  verifyEmail(data) : Promise<any>{
    return this.http.post(environment.baseUrl+'/verifyEmail',data)
    .toPromise()
    .then(res=> {return res});
  }
  registerService(data):Promise<any>{
    return this.http.post(environment.baseUrl+'/register', data)
    .toPromise()
    .then((res : any)=>{
        return res;
    })
    .catch()

  }
}
