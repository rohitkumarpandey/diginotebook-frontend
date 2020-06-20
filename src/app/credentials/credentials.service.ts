import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  constructor(private http : HttpClient) { }

  addCredential(uid, data): Promise<any>{
    return this.http.post(environment.baseUrl+'/addCredential/'+uid, data)
    .toPromise()
    .then((result:any) => {
      return result;
      
    }).catch((err) => {
      return err;
      
    });
  }

  //get all credentials
  getAllCrerdentials(uid) : Promise<any>{
    return this.http.get(environment.baseUrl+'/getAllCredentials/'+uid)
    .toPromise()
    .then((result:any) => {
      return result;
      
    }).catch((err) => {
      return err;
      
    });

  }
}
