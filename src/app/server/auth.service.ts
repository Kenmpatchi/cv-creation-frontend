import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/register';
import { Observable } from 'rxjs';
import { access } from '../models/access';
import { login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class authService {
  constructor(private http: HttpClient) { }
  private url="http://localhost:3000/account/"
  adduser(user:User):Observable<access>{
    return this.http.post<access> (this.url+'register', user); 
  }
  check(user:login):Observable<access>{
    return this.http.post<access>( this.url+ 'login', user);
  }
  logout():void{
    localStorage.removeItem('token');
    window.location.href = '/home';
  }
}
