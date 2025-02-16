import { Component, inject} from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Cv } from '../models/creation';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../server/crud.service';


@Component({
  selector: 'app-cv-europienne',
  imports: [FormsModule],
  templateUrl: './cv-europienne.component.html',
  styleUrl: './cv-europienne.component.css',
  providers:[]
})
export class CvEuropienneComponent {
  router=inject(Router)
  cv:Cv=new Cv()
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
