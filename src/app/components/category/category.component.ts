import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ServicesService } from "../../providers/services.service";
import { LoaderService } from "../../providers/loader.service";

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [ServicesService]
})
export class CategoryComponent implements OnInit {

  type: string;
  serviceProviders;
  stars = ["","","","",""];
  isLoader = true;
  constructor(private ac: ActivatedRoute, private router : Router, public ls : LoaderService, private ss: ServicesService) {

  }

  ngOnInit() {
    this.ac.params.subscribe((params) => {
      this.serviceProviders = [];
      this.type = params.type;
      
      this.getUsers();
    })
  }

  getUsers() {
    this.ss.getUsers(this.type).subscribe((res: any) => {
      this.ls.Loader = false;
      this.serviceProviders = res.data;
      this.serviceProviders = this.serviceProviders.map((sp) => {
        // console.log(sp);
        if (sp.services[0].ratings.length > 0) {
          sp.rating = sp.services[0].ratings.reduce((sum, value) => {
            return  sum + +value;
          },0);
        }
        console.log(sp);
        return sp;
      })
      console.log(this.serviceProviders);
    }, (err: any) => {
      this.ls.Loader = false;
    })
  }

  toProfile(sp){
    this.router.navigate(['profile',sp._id]);
  }

}
