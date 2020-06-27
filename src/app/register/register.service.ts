import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http : HttpClient) { }


  registerService(data):Promise<any>{
    return this.http.post(environment.baseUrl+'/register', data)
    .toPromise()
    .then((res : any)=>{
        return res;
    })
    .catch()

  }
}
