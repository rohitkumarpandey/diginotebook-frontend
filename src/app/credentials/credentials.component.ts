import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CredentialsService } from 'src/app/credentials/credentials.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material';
declare var $ : any;

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit {
  addCrdenetialForm : FormGroup;
  credentials : [] = null;
  isLoaded : boolean = false;
  credentialForm : FormGroup;
  readonly : boolean =false;
  hideKey : boolean = true;

  constructor(private fb : FormBuilder, private service : CredentialsService, private authService : AuthService,
  private snackbar : MatSnackBar ) {
    this.addCrdenetialForm = this.fb.group({
      name : ['', [Validators.required]],
      key : ['', [Validators.required]]

    });

    this.credentialForm = this.fb.group({
      name : ['',[Validators.required]],
      key : ['', [Validators.required]]
    }); 
    
    
   }

  ngOnInit() {
    $(document).ready(function(){ 
     

      $('.editName').on('click',function(){
        console.log('name clcked');
      });
      
        $('.editCredential').on('click',function(){
          console.log('edit pressed');
          console.log($('.editCredential').index(this));
         // $('#name').contentEditable = true;
         // $(this).contentEditable   = true;
        });
    });

    this.getAllCredentials();
  }

  //addCredentials
  addCredential(){
    this.service.addCredential(this.authService.getUserId(), this.addCrdenetialForm.value)
    .then((res)=>{
    this.snackbar.open(res,'',{
      duration : 2000
    });
    })
    .then(()=>{
      this.addCrdenetialForm.reset();
      this.getAllCredentials();
    })

  }

  //get All Credentials
  getAllCredentials(){
    this.isLoaded = false;
    this.credentials = null;
    this.service.getAllCrerdentials(this.authService.getUserId())
    .then((res)=>{
      this.credentials = res;
      })
      .then(()=> this.isLoaded = true);
  }

  //delete Credential
  deleteCredential(cid, cname){
    let snackbarRef = this.snackbar.open('Delete : '+cname+' ?','Delete', {
      duration : 2000
    });
    snackbarRef.onAction().subscribe(()=>{

    this.service.deleteCredential(this.authService.getUserId(), cid)
    .then((res)=>{
      this.snackbar.open(res,'',{
        duration : 2000
      });
    })
    .catch((err)=>{
      this.snackbar.open(err,'',{
        duration : 2000
      });
    })
    .finally(()=>this.getAllCredentials());
    
    });
  }

  showKey(event){
    var li = event.target.closest('li');
    var nodes = Array.from( li.closest('ul').children );
    var index = nodes.indexOf(li);
    $('.editKey').attr('type', 'password');
    $('.keyHideBtn mat-icon').text('visibility_off');
    $('.editKey').eq(index).attr('type', 'text');
    $('.keyHideBtn mat-icon').eq(index).text('visibility');
  }

  editCredential(event){
    var li = event.target.closest('li');
    var nodes = Array.from( li.closest('ul').children );
    var index = nodes.indexOf(li);    
    $('li label').css('background-color', 'whitesmoke');
    $('li label').eq(3 * index).css('background-color', 'white');
    $('li label').eq((3 * index) +1).css('background-color', 'white');
    $('li label').eq((3 * index) +2).css('background-color', 'white');
    $('.editName').attr('readonly', true);
    $('.editKey').attr('readonly', true);
    $('.editCredential').css("color", "blue");
    $('.saveCredential').css("color", "blue");
    $('.editName').eq(index).attr('readonly', false);
    $('.editKey').eq(index).attr('readonly', false);
    $('.editCredential').eq(index).css("color", "grey");
    $('.saveCredential').eq(index).css("color", "red");
  }

  saveCredential(event, cid){
    var li = event.target.closest('li');
    var nodes = Array.from( li.closest('ul').children );
    var index = nodes.indexOf(li);
    this.credentialForm.value.name = $('.editName').eq(index).val();
    this.credentialForm.value.key = $('.editKey').eq(index).val();
    if(!(this.credentialForm.value.name) || !(this.credentialForm.value.key)){
        this.snackbar.open('[Error] : Empty values cannot be stored','', {
          duration : 2000
        });
    }else{
          this.service.updateCredential(this.authService.getUserId(), cid, this.credentialForm.value)
          .then((res)=>{
            this.snackbar.open(res,'', {
              duration : 2000
            });
            $('.editName').attr('readonly', true);
            $('.editKey').attr('readonly', true);
            $('.editCredential').css("color", "blue");
            $('.saveCredential').css("color", "blue");
            this.getAllCredentials();
          });
        }
}

}
