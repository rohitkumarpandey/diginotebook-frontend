import { Component, OnInit } from '@angular/core';
import { NotesService } from './notes.service';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
declare var $ : any;

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes : [];
  isLoaded : Boolean = true;
  message : String = null;
  noteForm : FormGroup;
  noteTitle = "";
  noteDescription = "";
  noteid = null;
  responseMessage = null;
  emptyValue : Boolean = false;

  constructor(private service : NotesService, private authService : AuthService, private fb : FormBuilder,
    private snackbar : MatSnackBar) {
    this.noteForm = this.fb.group({
      title : ['', [Validators.required]],
      note : ['', [Validators.required]]
    });
   }

  ngOnInit() {
    var self = this;
    
      $('#myModal').on('hidden.bs.modal', function() {
       
            $('#noteTitleModal').val("");
            $('.modal-body textarea').val("");
            self.getNotes();
      });
    

  this.getNotes();
  }

  getNotes(){
    this.isLoaded = false;
    this.notes = [];
    this.message = null;
    this.service.getNotes(this.authService.getUserId())
    .then((result) => {
      if(result.success) this.notes = result.notes; 
      else throw new Error('No notes added'); 
      
    })
    .catch((err) => {
      this.message = err.message;
      
    })
    .finally(()=> this.isLoaded = true);
  }

  openNote(noteid){
    
    $('#saved').removeClass('savedNote');
    $('#saved').addClass('unsavedNote');
    this.noteTitle= "";
    this.noteDescription = "";
    var arr : any = this.notes.filter(function(note : any){
      return note._id == noteid;
    });
    this.noteid = noteid;
    this.noteTitle = arr[0].title;
    this.noteDescription = arr[0].note;
    $('#myModal .modal-title').val(this.noteTitle);
    $('#myModal .modal-body textarea').val(this.noteDescription);
    $('#myModal').modal('show');
  }

  updateNote(newTitle, ṇewNote){
        this.emptyValue = false;
        $('#saved').removeClass('savedNote');
        $('#saved').addClass('unsavedNote');
        if(newTitle == "" || ṇewNote == ""){
          this.emptyValue = true;
        }
        else{
        this.noteForm.value.title = newTitle;
        this.noteForm.value.note = ṇewNote;
        this.service.updateNote(this.authService.getUserId(), this.noteid, this.noteForm.value)
        .then((result) => {
        if(result.success){
          $('#saved').removeClass('unsavedNote');
          $('#saved').addClass('savedNote');
      }      
      }).catch((err) => {
        
      }).finally(()=>{ this.noteForm.reset()});
    }    
    
  }

  deleteNote(){
   
    this.service.deleteNote(this.authService.getUserId(), this.noteid)
    .then((res)=>{
      if(res.success){
      this.snackbar.open(res.message,'',{
        duration : 2000
      });
    }else throw new Error(res.errorMessage);
    })
    .catch((err)=>{
      this.snackbar.open(err,'',{
        duration : 2000
      });
    })
    .finally(()=>{
      $('#deleteModal').modal('hide');
      $('#myModal').modal('hide');
      this.getNotes();}); 
}


addNote(){  
  this.service.addNote(this.authService.getUserId(), this.noteForm.value)
  .then((res)=>{
    if(res.success) this.responseMessage = res.message;
    else throw new Error(res.errorMessage);
  }).catch(err => this.responseMessage = err)
  .finally(()=>{
    $('#addModal').modal('hide');
    this.snackbar.open(this.responseMessage,'',{
      duration : 2000
    });
    this.getNotes();
  })
}
}
