import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../models/register';
import {  NgIf } from '@angular/common';
import { authService } from '../server/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [RouterLink,FormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [authService],
})
export class RegisterComponent {
  router=inject(Router);
  name?:string
  lastname?:string
  email:string=''
  pass:string=''
  valpass?:string
  id?:Object
  isSubmitted:boolean=false
  user:User=new User()
  constructor(private User: authService) {} 
  data={}
  save(){
    this.isSubmitted=true
    console.log(this.isSubmitted)
    if(this.pass===this.valpass && this.pass.length>4 && this.email.includes('.com')){
      this.user.email=this.email
      this.user.name=this.name
      this.user.lastname=this.lastname
      this.user.pass=this.pass
      this.User.adduser(this.user).subscribe(
        res=>{
          localStorage.setItem("token",res.mytoken)
          this.router.navigate(["/crud/",res.id])
        },
        err=>{
          console.log(err)
        }
      )}
    else{
      console.log('invalid')
    }
  }
  
  }

