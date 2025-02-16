import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Cv } from '../models/creation';
import { NgForOf, NgIf } from '@angular/common';
import { CrudService } from '../server/crud.service';
import { ActivatedRoute,Router } from '@angular/router';
import { authService } from '../server/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud',
  imports: [NgForOf,NgIf,FormsModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent implements OnInit{
  
  bnext:boolean=false
  router=inject(Router)
  cvs:Array<Cv>=[]
  isSubmitted:boolean=false
  constructor(private crud:CrudService,private route:ActivatedRoute,private out:authService){}
  ngOnInit(): void {
    const id:Object=Object(this.route.snapshot.paramMap.get('id'))
    this.crud.getall(id).subscribe(
      data=>{
        this.cvs=data
      }
    )
  }
  addNewCV() {
    const id:Object=Object(this.route.snapshot.paramMap.get('id'))
    this.router.navigate(["/creation/"+id])
  }
  veiw(id:any,types:any){
    if(types=='canadian'){
      this.router.navigate(['/canadian/'+id])
  }
  else{
    this.router.navigate(['/europienne/'+id])
  }
}
  editCV(id: any ) {
    const forms=Array.from(document.querySelectorAll('form'))
    forms.forEach((form,i)=>{
      if(this.cvs[i]._id==id){
        form.className='model';
      }
    })
    const div=document.querySelector('.overlay') as HTMLElement
    div.className="overlay"
  }
  edit(id:any,cv:Cv){
    console.log(typeof(cv.date_1))
    this.crud.update(cv,id).subscribe()
    const form=document.querySelector('form') as HTMLElement
    form.className='model hidden';
    const div=document.querySelector('.overlay') as HTMLElement
    div.className="overlay hidden"
  }
  
  next(){
    this.bnext=true
    const back=document.querySelector('.back') as HTMLElement
    const next=document.querySelector('.next') as HTMLElement
    back.className='btn back'
    next.className='btn hidden next'
  }
  back(){
    this.bnext=false
    const back=document.querySelector('.back') as HTMLElement
    const next=document.querySelector('.next') as HTMLElement
    back.className='btn hidden back'
    next.className='btn next'
  }

  deleteCV(id: any) {
    this.crud.delete(id).subscribe()
    this.cvs = this.cvs.filter(item=> item._id !== id);
  }

  logout() {
    this.out.logout()
  }
  close(){
    const div=document.querySelector('.overlay') as HTMLElement
    div.className="overlay hidden"
    const form=document.querySelector('form') as HTMLElement
    form.className='model hidden';
  }
}
