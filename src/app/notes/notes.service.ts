import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
    header;
  constructor(private http : HttpClient, private authService : AuthService) {
    this.header = new HttpHeaders()
    .set('token', this.authService.getToken());
   }

  getNotes(uid : any) : Promise<any>{
    return this.http.get(environment.baseUrl+'/getnotes/'+uid, {
        headers : this.header
    })
    .toPromise()
    .then((res)=>{
        return res;
    });

  }

  updateNote(uid, nid, data) : Promise<any>{
    return this.http.put(environment.baseUrl+'/updatenote/'+uid+'/'+nid,  data, {
      headers : this.header
    })
    .toPromise()
    .then((res)=>{
      return res;
    })

  }

  deleteNote(uid, nid) : Promise<any>{
    return this.http.delete(environment.baseUrl+'/deletenote/'+uid+'/'+nid,{
      headers : this.header
    })
    .toPromise()
    .then((res)=>{
      return res;
    })
    .catch(err=>{
      console.log(err);
    })
  }
  addNote(uid, data) : Promise<any>{
    return this.http.post(environment.baseUrl+'/addnote/'+uid, data, {
      headers : this.header
    })
    .toPromise()
    .then((res)=>{
      return res;
    })
    .catch(err=>{
      console.log(err);
    })
  }
}
