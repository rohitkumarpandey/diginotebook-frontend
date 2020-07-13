import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  header;
  constructor(private http : HttpClient, private authService : AuthService) { 
    this.header = new HttpHeaders()
    .set('token', this.authService.getToken());
  }

  addCredential(uid, data): Promise<any>{
    return this.http.post(environment.baseUrl+'/addCredential/'+uid, data, {
      headers : this.header
    })
    .toPromise()
    .then((result:any) => {
      return result;
      
    }).catch((err) => {
      return err;
      
    });
  }

  //get all credentials
  getAllCrerdentials(uid) : Promise<any>{
    return this.http.get(environment.baseUrl+'/getAllCredentials/'+uid, {
      headers : this.header
    })
    .toPromise()
    .then((result:any) => {
      return result;
      
    }).catch((err) => {
      return err;
      
    });

  }

  //delete Credential
  deleteCredential(uid, cid):Promise<any>{
    return this.http.delete(environment.baseUrl+'/deleteCredential/'+uid+'/'+cid, {
      headers : this.header
    })
    .toPromise()
    .then((result:any) => {
      return result;
      
    }).catch((err) => {
      return err;
      
    });

  }

   //update Credential
   updateCredential(uid, cid, data):Promise<any>{
    return this.http.put(environment.baseUrl+'/updateCrdential/'+uid+'/'+cid, data, {
      headers : this.header
    })
    .toPromise()
    .then((result:any) => {
      return result;
      
    }).catch((err) => {
      return err;
      
    });

  }
}
