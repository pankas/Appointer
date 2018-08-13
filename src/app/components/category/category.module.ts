import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { CategoryComponent } from "./category.component";
import { FormsModule } from "@angular/forms";
import { Urls } from "../../configs/urls";
import { CustomHttpService } from "../../providers/customHttp.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
  FormsModule,
  HttpClientModule,
    CommonModule,
    RouterModule.forChild([
    {
    	path:'',
    	component:CategoryComponent
    }
    ])
  ],
  providers : [ CustomHttpService, Urls ],
  declarations: [CategoryComponent]
})
export class CategoryModule { }
