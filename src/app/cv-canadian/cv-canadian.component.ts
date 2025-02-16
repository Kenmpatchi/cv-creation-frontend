import { Component, inject, OnInit } from '@angular/core';
import { Cv } from '../models/creation';
import { CrudService } from '../server/crud.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cv-canadian',
  imports: [],
  templateUrl: './cv-canadian.component.html',
  styleUrl: './cv-canadian.component.css',
  providers:[CrudService,Cv]
})
export class CvCanadianComponent implements OnInit{
  router=inject(Router)
  cv:Cv= new Cv()
  constructor(private crud :CrudService,private route:ActivatedRoute){}
  ngOnInit(): void {
    const id:Object=Object(this.route.snapshot.paramMap.get('id'))
    this.crud.get(id).subscribe(
      data=>this.cv=data
    )
  }
  home(){
    this.router.navigate(["/crud/"+this.cv.user_id])
  }
}

