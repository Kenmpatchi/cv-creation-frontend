import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cv } from '../models/creation';

@Injectable({
    providedIn: 'root'
})
export class CrudService {
    constructor(private http: HttpClient) { }
    private url="http://localhost:3000/Cv/"
      addCv(cv:Cv,id:object):Observable<Cv>{
        return this.http.post<Cv>(this.url+'Posts/'+id, cv); 
      }
      getall(id:object): Observable<any> {
        return this.http.get<Cv>(this.url+'getall/'+id)
      }
      get(id:object):Observable<any>{
        return this.http.get(this.url+'get/'+id)
      }
      delete(id:object){
        return this.http.delete(this.url+'delete/'+id)
      }
      update(cv:any,id:any):Observable<any>{
        return this.http.put(this.url+'update/'+id,cv)
      }

}