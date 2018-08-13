import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FeedbackComponent } from "./feedback.component";
import { FormsModule } from "@angular/forms";


@NgModule({
  imports: [
  FormsModule,
    CommonModule,
    RouterModule.forChild([
    {
    	path:'',
    	component:FeedbackComponent
    }
    ])
  ],
  declarations: [FeedbackComponent]
})
export class FeedbackModule { }
