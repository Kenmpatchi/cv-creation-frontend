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
  username?:string
  email:string=''
  password:string=''
  valpass?:string
  phone?:Number
  id?:Object
  isSubmitted:boolean=false
  user:User=new User()
  constructor(private User: authService) {} 
  data={}
  save(){
    this.isSubmitted=true
    console.log(this.isSubmitted)
    if(this.password===this.valpass && this.password.length>4 && this.email.includes('.com')){
      this.user.email=this.email
      this.user.username=this.username
      this.user.password=this.password
      this.user.phone=this.phone
      this.User.adduser(this.user).subscribe(
        res=>{
        this.User.check(this.user).subscribe(
          res=>{
          localStorage.setItem("token",res.mytoken)
          this.router.navigate(["/crud/",res.id])}
        )}
      )
        
      }
    }
}

