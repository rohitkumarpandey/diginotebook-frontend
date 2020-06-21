import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { GoalsComponent } from './goals/goals.component';
import { CredentialsComponent } from './credentials/credentials.component';
import { NotesComponent } from 'src/app/notes/notes.component';



const routes: Routes = [
  {path : '', component : LoginComponent},
  {path : 'login', component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'home', component : HomeComponent,
children:[
  {path :'', redirectTo : 'goals', pathMatch : 'full'},
  {path : 'goals', component : GoalsComponent},
  {path : 'credentials', component : CredentialsComponent},
  {path : 'notes', component : NotesComponent}    
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
