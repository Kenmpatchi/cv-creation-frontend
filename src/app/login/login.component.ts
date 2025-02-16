import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { login } from '../models/login';
import { Router } from '@angular/router';
import { authService } from '../server/auth.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [RouterLink,FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  router=inject(Router)
  email?:string
  pass?:string
  isSubmitted:boolean=false
  user:login=new login()
  constructor(private login: authService) {}
  
  save(){
    this.user.email=this.email
    this.user.pass=this.pass
    
    this.login.check(this.user).subscribe(
    res=>{

      localStorage.setItem("token",res.mytoken)
      this.router.navigate(["/crud/",res.id])
    },
    err=>{
      this.isSubmitted=true
    }
  )
  }
}
