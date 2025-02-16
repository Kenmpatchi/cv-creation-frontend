import { Component, inject } from '@angular/core';
import {  NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CrudService } from '../server/crud.service';
import { Cv } from '../models/creation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-creation',
  imports: [NgSwitch, NgSwitchCase, FormsModule, NgIf],
  templateUrl: './creation.component.html',
  styleUrl: './creation.component.css',
  providers:[CrudService,CrudService]
})
export class CreationComponent {
  router=inject(Router)
  date_1?:string
  date_2?:string
  types:string='europeinne'
  cv:Cv=new Cv()
  bnext:boolean=false
  constructor(private crud: CrudService,private route:ActivatedRoute) {}
  next(){
    const back=document.querySelector('.back') as HTMLElement
    const next=document.querySelector('.next') as HTMLElement
    back.className='btn back'
    next.className='btn hidden next'
    this.bnext=true

  }
  back(){
    const back=document.querySelector('.back') as HTMLElement
    const next=document.querySelector('.next') as HTMLElement
    back.className='btn hidden back'
    next.className='btn next'
    this.bnext=false
  }
  save(cv:Cv,myid:any){
    cv.types=this.types
    const id:Object=Object(this.route.snapshot.paramMap.get('id'))
    this.crud.addCv(cv,id).subscribe(
      res=>{
        if(this.types=='canadian'){
        cv.date_1=this.date_1
        cv.date_2=this.date_2
        this.crud.update(cv,cv._id).subscribe()
        this.router.navigate(["/canadian/",res._id])
      }
      else{
        console.log(res._id,typeof(res._id))
        cv.date_1=this.date_1
        cv.date_2=this.date_2
        this.crud.update(cv,res._id).subscribe()
        this.router.navigate(['/europienne/',res._id])
      }
      },
      err=>{
        console.log(err)
      }
    
    )

  }

 

}
